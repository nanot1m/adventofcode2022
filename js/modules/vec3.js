// @ts-check

/**
 * @typedef {[x: number, y: number, z: number]} Vec3
 */

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {Vec3}
 */
export const vec3 = (x, y, z) => [x, y, z]

/**
 *
 * @returns {Vec3}
 */
export const zero3 = () => [0, 0, 0]

/**
 * @param {Vec3} vecA
 * @param {Vec3} vecB
 * @returns {Vec3}
 */
export const add = (vecA, vecB) => [
  vecA[0] + vecB[0],
  vecA[1] + vecB[1],
  vecA[2] + vecB[2],
]

/**
 * @param {Vec3} vecA
 * @param {Vec3} vecB
 * @returns {Vec3}
 */
export const min = (vecA, vecB) => [
  Math.min(vecA[0], vecB[0]),
  Math.min(vecA[1], vecB[1]),
  Math.min(vecA[2], vecB[2]),
]

/**
 * @param {Vec3} vecA
 * @param {Vec3} vecB
 * @returns {Vec3}
 */
export const max = (vecA, vecB) => [
  Math.max(vecA[0], vecB[0]),
  Math.max(vecA[1], vecB[1]),
  Math.max(vecA[2], vecB[2]),
]

/**
 *
 * @param {Vec3} vecA
 * @param {Vec3} vecB
 * @returns
 */
export const mLen = (vecA, vecB = zero3()) =>
  Math.abs(vecA[0] - vecB[0]) +
  Math.abs(vecA[1] - vecB[1]) +
  Math.abs(vecA[2] - vecB[2])
