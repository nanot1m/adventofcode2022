// @ts-check

import { $ } from "./itertools.js"
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
function part1(input) {
  const distinctN = 4

  const index = $(input)
    .windowed(distinctN)
    .map((window) => new Set(window).size)
    .indexOf(distinctN)

  return index + distinctN
}

/**
 * @param {string} input
 */
function part2(input) {
  const distinctN = 14

  const index = $(input)
    .windowed(distinctN)
    .map((window) => new Set(window).size)
    .indexOf(distinctN)

  return index + distinctN
}
