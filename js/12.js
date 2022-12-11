// @ts-check

import { readLines } from "./lib.js"
import { solution } from "./solution.js"

solution({
  solve(input) {
    return [() => part1(input), () => part2(input)]
  },
})

/**
 * @param {string} input
 */
function part1(input) {
  const lines = readLines(input.trimEnd())
  return null
}

/**
 * @param {string} input
 */
function part2(input) {
  return null
}
