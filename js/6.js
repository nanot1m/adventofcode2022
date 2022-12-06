// @ts-check

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

  for (let i = 0; i < input.length - distinctN; i++) {
    const set = new Set(input.slice(i, i + distinctN))
    if (set.size === distinctN) {
      return i + distinctN
    }
  }

  return null
}

/**
 * @param {string} input
 */
function part2(input) {
  const distinctN = 14

  for (let i = 0; i < input.length - distinctN; i++) {
    const set = new Set(input.slice(i, i + distinctN))
    if (set.size === distinctN) {
      return i + distinctN
    }
  }

  return null
}
