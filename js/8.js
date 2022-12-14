// @ts-check

import { it, range } from "./modules/itertools.js"
import { add, mul, readLines } from "./modules/lib.js"

/**
 * @param {string} input
 *
 * @returns {Array<() => any>}
 */
export function solve(input) {
  return [() => part1(input), () => part2(input)]
}

/**
 * @type {[number, number][]}
 */
const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
]

/**
 * @param {string} input
 */
function parseInput(input) {
  const lines = readLines(input.trimEnd())
  const treeMap = lines.map((line) => line.split("").map(Number))
  const height = treeMap.length
  const width = treeMap[0].length
  const perimeter = height * 2 + width * 2 - 4

  function* traverse() {
    for (const y of range(1, height - 1)) {
      for (const x of range(1, width - 1)) {
        yield /** @type {[number, number, number]} */ ([x, y, treeMap[y][x]])
      }
    }
  }

  /**
   * @param {number} dx
   * @param {number} dy
   * @param {number} x
   * @param {number} y
   * @returns {Iterable<number>}
   */
  function* ray(dx, dy, x, y) {
    for (
      let i = x + dx, j = y + dy;
      i >= 0 && i < width && j >= 0 && j < height;
      i += dx, j += dy
    ) {
      yield treeMap[j][i]
    }
  }

  return { traverse, ray, perimeter }
}

/**
 * @param {string} input
 */
function part1(input) {
  const { traverse, ray, perimeter } = parseInput(input)

  /**
   * @param {number} dx
   * @param {number} dy
   * @param {number} x
   * @param {number} y
   * @param {number} v
   */
  const vis = (dx, dy, x, y, v) => it(ray(dx, dy, x, y)).every((n) => n < v)

  return add(
    perimeter,
    it(traverse()).count((pos) =>
      directions.some((dir) => vis(...dir, ...pos)),
    ),
  )
}

/**
 * @param {string} input
 */
function part2(input) {
  const { traverse, ray } = parseInput(input)

  /**
   * @param {number} dx
   * @param {number} dy
   * @param {number} x
   * @param {number} y
   * @param {number} v
   */
  function score(dx, dy, x, y, v) {
    let result = 0
    for (const n of ray(dx, dy, x, y)) {
      result++
      if (n >= v) break
    }
    return result
  }

  return it(traverse())
    .map((pos) => directions.map((dir) => score(...dir, ...pos)))
    .map((scores) => scores.reduce(mul, 1))
    .max()
}
