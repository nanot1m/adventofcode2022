// @ts-check

import { i } from "./itertools.js"
import { readLines } from "./lib.js"
import { solution } from "./solution.js"

solution({
  solve(input) {
    return [() => part1(input), () => part2(input)]
  },
  submit: { 1: false, 2: false },
})

/**
 * @param {string} input
 */
function parseInput(input) {
  return readLines(input.trim()).map((x) =>
    x.split(",").map((x) => x.split("-").map(Number)),
  )
}

/**
 * @param {string} input
 */
function part1(input) {
  const lines = parseInput(input)

  return i(lines).count(
    ([lRange, rRange]) =>
      (lRange[0] <= rRange[0] && rRange[1] <= lRange[1]) ||
      (rRange[0] <= lRange[0] && lRange[1] <= rRange[1]),
  )
}

/**
 * @param {string} input
 */
function part2(input) {
  const lines = parseInput(input)

  return i(lines)
    .map((ranges) => ranges.sort((a, b) => a[0] - b[0]))
    .count(([lRange, rRange]) => rRange[0] <= lRange[1])
}
