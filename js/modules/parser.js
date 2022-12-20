// @ts-check

import { V, V3 } from "./index.js"
import { tryGetSeparator } from "./lib.js"

/**
 * @typedef {Object} Parser
 * @property {string} name
 * @property {(input: string) => boolean} check
 * @property {(input: string, key?: string) => T} parse
 *
 * @template T
 */

/**
 * @typedef {T & {withSeparator: (separator: string) => T}} WithSeparator
 *
 * @template {Parser<unknown>} T
 */

/**
 * @param {T} parsers
 * @returns {T}
 *
 * @template {Record<string, Parser<unknown>>} T
 */
function registerParsers(parsers) {
  return parsers
}

const PARSERS = registerParsers({
  int: {
    name: "int",
    check: (key) => key === "int",
    parse: (strVal) => parseInt(strVal, 10),
  },
  str: {
    name: "str",
    check: (key) => key === "str",
    parse: (strVal) => strVal,
  },
  vec: {
    name: "vec",
    check: (key) => key === "vec",
    parse: (strVal) => {
      const separator = tryGetSeparator(strVal)
      if (!separator) {
        throw new Error(`Invalid vec: ${strVal}`)
      }
      const [x, y] = strVal.split(separator).map(Number)
      return V.vec(x, y)
    },
  },
  vec3: {
    name: "vec3",
    check: (key) => key === "vec3",
    parse: (strVal) => {
      const separator = tryGetSeparator(strVal)
      if (!separator) {
        throw new Error(`Invalid vec3: ${strVal}`)
      }
      const [x, y, z] = strVal.split(separator).map(Number)
      return V3.vec3(x, y, z)
    },
  },
  arr: {
    name: "arr",
    check: (key) => key.endsWith("[]"),
    parse: (strVal, key = "") => {
      const type = key.slice(0, -2)
      const parser = getParserByType(type)
      if (!parser) {
        throw new Error(`Invalid array type "${type}" in "${key}"`)
      }
      const separator = tryGetSeparator(strVal) ?? ","
      return strVal.split(separator).map((x) => parser.parse(x, type))
    },
  },
  tuple: {
    name: "tuple",
    check: (key) => key.startsWith("(") && key.endsWith(")"),
    parse: (strVal, key = "") => {
      const types = key.slice(1, -1).split(",")
      const separator = tryGetSeparator(strVal) ?? ","
      return strVal.split(separator).map((x, i) => {
        const parser = getParserByType(types[i])
        if (!parser) {
          throw new Error(`Invalid tuple type "${types[i]}" in "${key}"`)
        }
        return parser.parse(x, types[i])
      })
    },
  },
})

/**
 * @param {string} type
 * @returns {Parser<unknown> | null}
 */
function getParserByType(type) {
  for (const key in PARSERS) {
    if (PARSERS[/** @type {keyof typeof PARSERS} */ (key)].check(type)) {
      return PARSERS[/** @type {keyof typeof PARSERS} */ (key)]
    }
  }
  return null
}

/**
 * @param {string} strVal
 * @param {string} type
 * @returns {T}
 *
 * @template T
 */
function parse(strVal, type) {
  const parser = getParserByType(type)
  if (!parser) {
    throw new Error(`Invalid type "${type}"`)
  }
  return /** @type {T} */ (parser.parse(strVal, type))
}

/**
 *
 * @param {T} parserFactory
 * @returns {T}
 *
 * @template {Record<keyof typeof PARSERS, (...args: Parser<unknown>[]) => Parser<unknown>>} T
 */
function createParserFactory(parserFactory) {
  return parserFactory
}

const commonTypes = createParserFactory({
  int: () => PARSERS.int,

  str: () => PARSERS.str,

  vec: () => PARSERS.vec,

  vec3: () => PARSERS.vec3,

  /**
   *
   * @param {Parser<T>} type
   * @returns {Parser<T[]> & {withSeparator: (separator: string) => Parser<T[]>}}
   *
   * @template T
   */
  arr: (type) => {
    return {
      name: `${type.name}[]`,
      check: (key) => key === `${type.name}[]`,
      parse: (strVal) => {
        const separator = tryGetSeparator(strVal) ?? ","
        return strVal.split(separator).map((x) => type.parse(x, type.name))
      },
      /**
       * @param {string} separator
       */
      withSeparator: (separator) => {
        return {
          name: `${type.name}[]`,
          check: (key) => key === `${type.name}[]`,
          parse: (strVal) => {
            return strVal.split(separator).map((x) => type.parse(x, type.name))
          },
        }
      },
    }
  },

  /**
   *
   * @param  {T} types
   * @returns {WithSeparator<Parser<{[K in keyof T]: T[K] extends Parser<infer U> ? U : never}>>}
   *
   * @template {Parser<unknown>[]} T
   */
  tuple: (...types) => {
    const name = `(${types.map((x) => x.name).join(",")})`
    return {
      name: name,
      check: (key) => key.startsWith("(") && key.endsWith(")"),
      parse: (strVal) => {
        const separator = tryGetSeparator(strVal) ?? ","
        return /** @type {any} */ (
          strVal
            .split(separator)
            .map((x, i) => types[i].parse(x, types[i].name))
        )
      },
      withSeparator: (separator) => {
        return {
          name: name,
          check: (key) => key.startsWith("(") && key.endsWith(")"),
          parse: (strVal) => {
            return /** @type {any} */ (
              strVal
                .split(separator)
                .map((x, i) => types[i].parse(x, types[i].name))
            )
          },
        }
      },
    }
  },
})

/**
 * @param {TemplateStringsArray} strings
 * @param {T} keys
 * @template {string[]} T
 */
function tpl(strings, ...keys) {
  /**
   * @param {string} input
   * @returns {{[P in T[number] as import("./types.js").TemplateKey<P>]: import("./types.js").TemplateValue<P> }}
   */
  function parseInternal(input) {
    /** @type {Record<string, any>} */
    const model = {}
    let lastIndex = 0
    for (let i = 0; i < keys.length; i++) {
      const start = strings[i].length + lastIndex
      const end = strings[i + 1]
        ? input.indexOf(strings[i + 1], start)
        : input.length
      const strVal = input.slice(start, end)
      const [key, type] = keys[i].split("|")
      model[key] = parse(strVal, type)
      lastIndex = end
    }
    return /** @type {any} */ (model)
  }

  return {
    name: "tpl",
    check: () => true,
    parse: parseInternal,
  }
}

export const t = {
  ...commonTypes,
  tpl,
}
