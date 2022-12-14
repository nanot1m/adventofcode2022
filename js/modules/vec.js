// @ts-check

/**
 * @typedef {[x: number, y: number]} Vec2d
 */

/**
 * @typedef {"U" | "R"| "D" | "L"} Dir
 */

/** @type {Record<Dir, Vec2d>} */
export const DIR_TO_VEC = { U: [0, 1], R: [1, 0], D: [0, -1], L: [-1, 0] }

export const DIRS = [DIR_TO_VEC.U, DIR_TO_VEC.R, DIR_TO_VEC.D, DIR_TO_VEC.L]

/**
 *
 * @param {string} dir
 * @returns {Dir}
 */
export const asDir = (dir) => {
  if (dir in DIR_TO_VEC) {
    return /** @type {Dir} */ (dir)
  }

  throw new Error(`Invalid direction: ${dir}`)
}

/**
 *
 * @param {Vec2d} vec
 * @returns {Vec2d}
 */
export const signed = ([x, y]) => [Math.sign(x), Math.sign(y)]

/**
 *
 * @param {Vec2d} vecA
 * @param {Vec2d} vecB
 * @returns {Vec2d}
 */
export const add = ([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2]

/**
 *
 * @param {Vec2d} vecA
 * @param {Vec2d} vecB
 * @returns {Vec2d}
 */
export const sub = ([x1, y1], [x2, y2]) => [x1 - x2, y1 - y2]

/**
 * @param {Dir} dir
 * @returns {Vec2d}
 */
export const fromDir = (dir) => DIR_TO_VEC[dir]

/**
 * @returns {Vec2d}
 */
export const zero = () => [0, 0]

/**
 * @param {number} x
 * @param {number} y
 * @returns {Vec2d}
 */
export const vec = (x, y) => [x, y]

/**
 * @param {Vec2d} vec
 */
export const x = (vec) => vec[0]

/**
 * @param {Vec2d} vec
 */
export const y = (vec) => vec[1]

/**
 * @param {unknown} arg
 * @returns {arg is Vec2d}
 */
export const isVec = (arg) =>
  Array.isArray(arg) &&
  arg.length === 2 &&
  typeof arg[0] === "number" &&
  typeof arg[1] === "number"

/**
 * @param {Vec2d} vecA
 * @param {Vec2d} vecB
 * @returns {boolean}
 */
export const eq = (vecA, vecB) => vecA[0] === vecB[0] && vecA[1] === vecB[1]

/**
 * @param {Vec2d} vecA
 * @param {Vec2d} vecB
 * @returns {Vec2d}
 */
export const min = (vecA, vecB) => [
  Math.min(vecA[0], vecB[0]),
  Math.min(vecA[1], vecB[1]),
]

/**
 * @param {Vec2d} vecA
 * @param {Vec2d} vecB
 * @returns {Vec2d}
 */
export const max = (vecA, vecB) => [
  Math.max(vecA[0], vecB[0]),
  Math.max(vecA[1], vecB[1]),
]

/**
 * @param {Vec2d} start
 * @param {Vec2d} end
 */
export function* segment(start, end) {
  const delta = sub(end, start)
  const dir = signed(delta)
  const steps = cLen(start, end)

  let pos = start
  yield pos
  for (let i = 0; i < steps; i++) {
    pos = add(pos, dir)
    yield pos
  }
}

/**
 * @type {Vec2d}
 */
export const ZERO = zero()

/**
 *
 * @param {Vec2d} vecA
 * @param {Vec2d} vecB
 * @returns {number}
 */
export const cLen = (vecA, vecB = zero()) =>
  Math.max(Math.abs(vecA[0] - vecB[0]), Math.abs(vecA[1] - vecB[1]))
