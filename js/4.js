// @ts-check

import { it } from "./modules/itertools.js"
import { readLines, typed } from "./modules/lib.js"

/**
 * @param {string} input
 *
 * @returns {Array<() => any>}
 */
export function solve(input) {
  return [() => part1(input), () => part2(input)]
}

/**
 * @param {string} input
 */
function parseInput(input) {
  return readLines(input.trim()).map(typed("int[][]"))
}

/**
 * @param {string} input
 */
function part1(input) {
  const lines = parseInput(input)

  return it(lines).count(
    ([[x1, x2], [y1, y2]]) => (x1 <= y1 && y2 <= x2) || (y1 <= x1 && x2 <= y2),
  )
}

/**
 * @param {string} input
 */
function part2(input) {
  const lines = parseInput(input)

  return it(lines)
    .map((ranges) => ranges.sort((a, b) => a[0] - b[0]))
    .count(([[, x2], [y1]]) => y1 <= x2)
}
