// @ts-check

import { V3 } from "../modules/index.js"
import { readLines, typed } from "../modules/lib.js"

/**
 * @param {string} input
 *
 * @returns {Array<() => any>}
 */
export function solve(input) {
  return [() => part1(input), () => part2(input)]
}

const lineTpl = typed("vec3")

const deltas = [
  V3.vec3(1, 0, 0),
  V3.vec3(-1, 0, 0),
  V3.vec3(0, 1, 0),
  V3.vec3(0, -1, 0),
  V3.vec3(0, 0, 1),
  V3.vec3(0, 0, -1),
]

/**
 * @param {string} input
 */
function part1(input) {
  const lines = readLines(input.trimEnd()).map(lineTpl)
  const map3d = new Set(lines.map((x) => x.join(",")))

  let sides = 0

  for (const line of lines) {
    const touchingSides = deltas
      .map((d) => V3.add(line, d).join(","))
      .filter((d) => map3d.has(d))
    sides += 6 - touchingSides.length
  }

  return sides
}

/**
 * @param {string} input
 */
function part2(input) {
  const lines = readLines(input.trimEnd()).map(lineTpl)
  const lava = new Set(lines.map((x) => x.join(",")))

  let minX = Infinity
  let minY = Infinity
  let minZ = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  let maxZ = -Infinity

  for (const line of lines) {
    minX = Math.min(minX, line[0])
    minY = Math.min(minY, line[1])
    minZ = Math.min(minZ, line[2])
    maxX = Math.max(maxX, line[0])
    maxY = Math.max(maxY, line[1])
    maxZ = Math.max(maxZ, line[2])
  }

  /**
   *
   * @param {V3.Vec3} param0
   * @returns
   */
  const inBounds = ([x, y, z]) =>
    x >= minX - 1 &&
    x <= maxX + 1 &&
    y >= minY - 1 &&
    y <= maxY + 1 &&
    z >= minZ - 1 &&
    z <= maxZ + 1

  const queue = [V3.vec3(minX - 1, minY - 1, minZ - 1)]
  const visited = new Set()
  while (queue.length) {
    const pos = queue.shift()
    const key = pos.join(",")
    if (visited.has(key)) continue
    visited.add(key)
    if (lava.has(key) || !inBounds(pos)) continue
    queue.push(...deltas.map((d) => V3.add(pos, d)))
  }

  let sides = 0

  for (const line of lines) {
    sides += deltas
      .map((d) => V3.add(line, d).join(","))
      .filter((key) => visited.has(key) && !lava.has(key)).length
  }

  return sides
}
