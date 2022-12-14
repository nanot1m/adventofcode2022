// @ts-check

import { it } from "./modules/itertools.js"

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
function part1(input) {
  const distinctN = 4

  const index = it(input)
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

  const index = it(input)
    .windowed(distinctN)
    .map((window) => new Set(window).size)
    .indexOf(distinctN)

  return index + distinctN
}
