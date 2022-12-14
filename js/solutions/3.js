// @ts-check

import { find, it } from "../modules/itertools.js"
import { readLines, splitAt } from "../modules/lib.js"

/**
 * @param {string} input
 *
 * @returns {Array<() => any>}
 */
export function solve(input) {
  return [() => part1(input), () => part2(input)]
}

/**
 *
 * @param {string} ch
 */
function getPriorities(ch) {
  return ch.charCodeAt(0) - (ch === ch.toLowerCase() ? 96 : 38)
}

/**
 * @param {string} input
 */
function part1(input) {
  const lines = readLines(input.trim())

  return it(lines)
    .map((line) => splitAt(line, line.length / 2))
    .map(([left, right]) => find(left, (ch) => right.includes(ch)))
    .map(getPriorities)
    .sum()
}

/**
 * @param {string} input
 */
function part2(input) {
  const lines = readLines(input.trim())

  return it(lines)
    .groupsOf(3)
    .map(([a, b, c]) => find(a, (ch) => b.includes(ch) && c.includes(ch)))
    .map(getPriorities)
    .sum()
}
