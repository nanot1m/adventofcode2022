// @ts-check

/**
 * @typedef {[x: number, y: number]} Vec2
 */

/**
 * @typedef {"U" | "R"| "D" | "L" | "UR" | "UL"} Dir
 */

/**
 * @param {number} x
 * @param {number} y
 * @returns {Vec2}
 */
export const vec = (x, y) => [x, y]

/** @type {Record<Dir, Vec2>} */
export const DIR_TO_VEC = {
  U: [0, 1],
  R: [1, 0],
  D: [0, -1],
  L: [-1, 0],
  UR: [1, 1],
  UL: [-1, 1],
}

export const DIRS_4 = [DIR_TO_VEC.U, DIR_TO_VEC.R, DIR_TO_VEC.D, DIR_TO_VEC.L]
export const DIRS_3_TOP = [DIR_TO_VEC.UL, DIR_TO_VEC.U, DIR_TO_VEC.UR]
export const DIRS_8 = [
  vec(-1, -1),
  vec(0, -1),
  vec(1, -1),
  vec(-1, 0),
  vec(1, 0),
  vec(-1, 1),
  vec(0, 1),
  vec(1, 1),
]

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
 * @param {Vec2} vec
 * @returns {Vec2}
 */
export const signed = ([x, y]) => [Math.sign(x), Math.sign(y)]

/**
 *
 * @param {Vec2} vecA
 * @param {Vec2} vecB
 * @returns {Vec2}
 */
export const add = ([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2]

/**
 *
 * @param {Vec2} vecA
 * @param {Vec2} vecB
 * @returns {Vec2}
 */
export const sub = ([x1, y1], [x2, y2]) => [x1 - x2, y1 - y2]

/**
 * @param {Dir} dir
 * @returns {Vec2}
 */
export const fromDir = (dir) => DIR_TO_VEC[dir]

/**
 * @returns {Vec2}
 */
export const zero = () => [0, 0]

/**
 * @param {Vec2} vec
 */
export const x = (vec) => vec[0]

/**
 * @param {Vec2} vec
 */
export const y = (vec) => vec[1]

/**
 * @param {unknown} arg
 * @returns {arg is Vec2}
 */
export const isVec = (arg) =>
  Array.isArray(arg) &&
  arg.length === 2 &&
  typeof arg[0] === "number" &&
  typeof arg[1] === "number"

/**
 * @param {Vec2} vecA
 * @param {Vec2} vecB
 * @returns {boolean}
 */
export const eq = (vecA, vecB) => vecA[0] === vecB[0] && vecA[1] === vecB[1]

/**
 * @param {Vec2} vecA
 * @param {Vec2} vecB
 * @returns {Vec2}
 */
export const min = (vecA, vecB) => [
  Math.min(vecA[0], vecB[0]),
  Math.min(vecA[1], vecB[1]),
]

/**
 * @param {Vec2} vecA
 * @param {Vec2} vecB
 * @returns {Vec2}
 */
export const max = (vecA, vecB) => [
  Math.max(vecA[0], vecB[0]),
  Math.max(vecA[1], vecB[1]),
]

/**
 * @param {Vec2} start
 * @param {Vec2} end
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
 * @type {Vec2}
 */
export const ZERO = zero()

/**
 *
 * @param {Vec2} vecA
 * @param {Vec2} vecB
 * @returns {number}
 */
export const cLen = (vecA, vecB = zero()) =>
  Math.max(Math.abs(vecA[0] - vecB[0]), Math.abs(vecA[1] - vecB[1]))

/**
 * @param {Vec2} vecA
 * @param {Vec2} vecB
 * @returns {number}
 */
export const mLen = (vecA, vecB = zero()) =>
  Math.abs(vecA[0] - vecB[0]) + Math.abs(vecA[1] - vecB[1])

/**
 *
 * @param {Vec2} vec
 * @param {Vec2} min
 * @param {Vec2} max
 * @returns
 */
export const inRange = (vec, min, max) =>
  vec[0] >= min[0] && vec[0] <= max[0] && vec[1] >= min[1] && vec[1] <= max[1]
