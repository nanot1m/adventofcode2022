// @ts-check

import { V } from "./index.js"
import { it } from "./itertools.js"
import { vec3 } from "./vec3.js"

/**
 * @param {T} x
 * @returns {T}
 * @template T
 */
export function id(x) {
  return x
}

/**
 * @param {T[]} xs
 * @param {(arg: T) => string | number} fn
 *
 * @template T
 */
export function minBy(xs, fn) {
  return xs.reduce((a, b) => (fn(a) < fn(b) ? a : b))
}

/**
 * @param {T[]} xs
 * @param {(arg: T) => string | number} fn
 *
 * @template T
 */
export function maxBy(xs, fn) {
  return xs.reduce((a, b) => (fn(a) > fn(b) ? a : b))
}

/**
 * @param {number[]} xs
 */
export function min(xs) {
  return minBy(xs, id)
}

/**
 * @param {number[]} xs
 */
export function max(xs) {
  return maxBy(xs, id)
}

/**
 *
 * @param {T[]} xs
 * @param {T[][]} yss
 * @returns {T[][]}
 *
 * @template T
 */
export function zip(xs, ...yss) {
  const minLength = minBy(yss, (ys) => ys.length).length
  return xs.slice(0, minLength).map((val, i) =>
    yss.reduce(
      (a, arr) => {
        a.push(arr[i])
        return a
      },
      [val],
    ),
  )
}

/**
 * @param {string} input
 */
export function readLines(input) {
  return input.split("\n")
}

/**
 * @param {string} input
 */
export function readBlocks(input) {
  return input.split("\n\n")
}

/**
 * @param {string} input
 * @returns
 */
export function readIntLines(input) {
  return readLines(input).map(Number)
}

/**
 * @param {string} input
 * @param {string} [separator]
 */
export function readIntArr(input, separator = ",") {
  return input.split(separator).map(Number)
}

/**
 * @param {number} n
 * @param {number} m
 * @returns
 */
export const mod = (n, m) => ((n % m) + m) % m

/**
 *
 * @param {T} value
 * @template T
 */
export function functor(value) {
  return {
    /**
     *
     * @param {(arg: T) => R} fn
     * @template R
     */
    map(fn) {
      return functor(fn(value))
    },
    get() {
      return value
    },
  }
}

/**
 * @param {T[]} xs
 * @param {number} n
 * @template T
 */
export function cycle(xs, n) {
  return xs.slice(n).concat(xs.slice(0, n))
}

/**
 * @param {T[]} xs
 * @param {number} n
 * @template T
 */
export function at(xs, n) {
  if (n < 0) {
    n = xs.length + n
  }
  return xs[n]
}

/**
 * @param {number} a
 * @param {number} b
 * @returns
 */
export function add(a, b) {
  return a + b
}

/**
 * @param {number} a
 * @param {number} b
 * @returns
 */
export function mul(a, b) {
  return a * b
}

/**
 *
 * @param {number[][]} m1
 * @param {number[][]} m2
 */
export function mulMatrix(m1, m2) {
  /** @type {number[][]} */
  const result = []
  for (let i = 0; i < m1.length; i++) {
    result[i] = []
    for (let j = 0; j < m2[0].length; j++) {
      let sum = 0
      for (let k = 0; k < m1[0].length; k++) {
        sum += m1[i][k] * m2[k][j]
      }
      result[i][j] = sum
    }
  }
  return result
}

/**
 *  @param {number[][]} mat1
 * @param  {...number[][]} mats
 */
export function mulMatrices(mat1, ...mats) {
  return mats.reduce(mulMatrix, mat1)
}

/**
 * @param {number} a
 * @param {number} b
 * @returns
 */
export function compareAsc(a, b) {
  return a - b
}

/**
 * @param {number} a
 * @param {number} b
 * @returns
 */
export function compareDesc(a, b) {
  return b - a
}

/**
 *
 * @param {T[]} xs
 * @param {number} i
 * @param {(arg: T) => T} fn
 *
 * @template T
 */
export function update(xs, i, fn) {
  return xs
    .slice(0, i)
    .concat(fn(xs[i]))
    .concat(xs.slice(i + 1))
}

/**
 * @param {number} x
 */
export function inc(x) {
  return x + 1
}

/**
 * @param {T} xs
 * @param {number} n
 * @returns {[T, T]}
 *
 * @template {{slice(start: number, end?: number): T}} T
 */
export function splitAt(xs, n) {
  return [xs.slice(0, n), xs.slice(n)]
}

/**
 *
 * @param {T[][]} arr
 * @param {boolean} clockwise
 * @returns {T[][]}
 *
 * @template T
 */
export function rotate2d(arr, clockwise = true) {
  const height = arr.length
  const width = it(arr)
    .map((line) => line.length)
    .max()

  const rotated = Array.from({ length: width }, () =>
    Array.from({ length: height }),
  )

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = arr[y]?.[x]
      const [i, j] = clockwise ? [x, height - y - 1] : [width - x - 1, y]
      rotated[i][j] = value
    }
  }

  return rotated
}

/**
 *
 * @param {string[]} strings
 * @param {boolean} clockwise
 */
export function rotateStrings2d(strings, clockwise = true) {
  const rotated = rotate2d(
    strings.map((str) => str.split("")),
    clockwise,
  )

  return rotated.map((line) =>
    line
      .map((x) => x ?? " ")
      .join("")
      .trimEnd(),
  )
}

/**
 *
 * @param {string} str
 * @param {boolean} [clockwise]
 *
 * @returns {string}
 */
export function rotateString2d(str, clockwise = true) {
  return rotateStrings2d(str.split("\n"), clockwise).join("\n")
}

/**
 *
 * @param  {T} args
 * @returns {T}
 *
 * @template {unknown[]} T
 */
export function tuple(...args) {
  return args
}

/**
 * @type {import("./types.js").RotateFn}
 *
 * @template T
 */
// @ts-ignore
export const rotate = (
  /** @type {string | string[] | T[][]} */ rotatable,
  clockwise = true,
) => {
  if (typeof rotatable === "string") {
    return rotateString2d(rotatable, clockwise)
  }
  if (typeof rotatable[0] === "string") {
    return rotateStrings2d(/** @type {string[]} */ (rotatable), clockwise)
  }
  return rotate2d(/** @type {T[][]} */ (rotatable), clockwise)
}

/**
 * @param {string} strVal
 */
export function tryGetSeparator(strVal) {
  const separators = ["\n\n", "\n", " -> ", ", ", ",", " - ", "-", " "]
  for (const separator of separators) {
    if (strVal.includes(separator)) {
      return separator
    }
  }
  return null
}

/** @type {Record<string, {check: (key: string) => boolean, parse: (strVal: string, key: string) => any}>} */
const converters = {
  vec: {
    check(/** @type {string} */ key) {
      return key === "vec"
    },
    parse(/** @type {string} */ strVal) {
      const separator = tryGetSeparator(strVal)
      const [x, y] = strVal.split(separator).map(Number)
      return V.vec(x, y)
    },
  },
  vec3: {
    check(/** @type {string} */ key) {
      return key === "vec3"
    },
    parse(/** @type {string} */ strVal) {
      const separator = tryGetSeparator(strVal)
      const [x, y, z] = strVal.split(separator).map(Number)
      return vec3(x, y, z)
    },
  },
  int: {
    check(/** @type {string} */ key) {
      return key === "int"
    },
    parse(/** @type {string} */ strVal) {
      return parseInt(strVal, 10)
    },
  },
  array: {
    check(/** @type {string} */ key) {
      return key.endsWith("[]")
    },
    parse(/** @type {string} */ strVal, /** @type {string} */ key) {
      const separator = tryGetSeparator(strVal)
      if (!separator) {
        return [strToType(strVal, key.slice(0, -2))]
      }
      const childType = key.slice(0, -2)
      return strVal.split(separator).map((x) => strToType(x, childType))
    },
  },
}

/**
 * @param {string} strVal
 * @param {string} type
 *
 * @returns {unknown}
 */
function strToType(strVal, type) {
  if (!type) {
    return strVal
  }
  for (const key in converters) {
    if (converters[key].check(type)) {
      return converters[key].parse(strVal, type)
    }
  }
  return strVal
}

/**
 * @param {T} type
 * @returns {(strVal: string) => import("./types.js").TemplateValueReturnType<T>}
 *
 * @template {string} T
 */
export function typed(type) {
  return (strVal) =>
    /** @type {import("./types.js").TemplateValueReturnType<T>} */ (
      strToType(strVal, type)
    )
}

/**
 * @param {TemplateStringsArray} strings
 * @param  {T} keys
 *
 * @template {string[]} T
 */
export function tpl(strings, ...keys) {
  /**
   * @param {string} input
   * @returns {{[P in T[number] as import("./types.js").TemplateKey<P>]: import("./types.js").TemplateValue<P> }}
   */
  function parse(input) {
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
      model[key] = strToType(strVal, type)
      lastIndex = end
    }
    return /** @type {any} */ (model)
  }

  /**
   * @param {(arg: ReturnType<typeof parse>) => R} fn
   * @template R
   */
  parse.map = (fn) => (/** @type {string} */ input) => fn(parse(input))

  return parse
}
