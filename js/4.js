// @ts-check

import { $ } from "./itertools.js"
import { readLines, tpl } from "./lib.js"
import { solution } from "./solution.js"

solution({
  solve(input) {
    return [() => part1(input), () => part2(input)]
  },
  submit: { 1: false, 2: false },
})

const lineTpl = tpl`${"pair|int[][]"}`.map((m) => m.pair)

/**
 * @param {string} input
 */
function parseInput(input) {
  return readLines(input.trim()).map(lineTpl)
}

/**
 * @param {string} input
 */
function part1(input) {
  const lines = parseInput(input)

  return $(lines).count(
    ([[x1, x2], [y1, y2]]) => (x1 <= y1 && y2 <= x2) || (y1 <= x1 && x2 <= y2),
  )
}

/**
 * @param {string} input
 */
function part2(input) {
  const lines = parseInput(input)

  return $(lines)
    .map((ranges) => ranges.sort((a, b) => a[0] - b[0]))
    .count(([[, x2], [y1]]) => y1 <= x2)
}
