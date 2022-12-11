// @ts-check

export const t = {
  str: () => /** @type {const} */ ({ type: "str" }),
  num: () => /** @type {const} */ ({ type: "num" }),
  bool: () => /** @type {const} */ ({ type: "bool" }),
  /**
   * @param {T} item
   * @param {string} separator
   * @template {ParserType} T
   */
  arr: (item, separator = " ") =>
    /** @type {const} */ ({ type: "arr", item, separator }),

  /**
   * @param {T} items
   * @template {ParserType[]} T
   */
  tuple: (...items) => /** @type {const} */ ({ type: "tuple", items }),

  parser,
}

/**
 * @typedef {ReturnType<(typeof t)[keyof typeof t]>} Type
 */

/**
 * @param {T} type
 * @returns {(value: string) => ParserTypeValue<T>}
 *
 * @template {ParserType} T
 */
function parser(type) {
  // @ts-ignore
  return (/** @type {string} */ value) => {
    switch (type.type) {
      case "str":
        return value
      case "num":
        return Number(value)
      case "bool":
        return value === "true"
      case "arr": {
        const { item, separator } = type
        return value.split(separator).map(parser(item))
      }
      case "tuple": {
        const { items, separator } = type
        return value.split(separator).map((x, i) => parser(items[i])(x))
      }
      default:
        /** @type {never} */ type
        throw new Error("Unknown type")
    }
  }
}
