// @ts-check

import { find, groupsOf, map, sum } from "./itertools.js"
import { readLines, splitAt } from "./lib.js"
import { solution } from "./solution.js"

solution({
  solve(input) {
    return [() => part1(input), () => part2(input)]
  },
  submit: { 1: false, 2: false },
})

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

  const priorities = lines.map((line) => {
    const [left, right] = splitAt(line, line.length / 2)
    const ch = find(left, (ch) => right.includes(ch))
    return getPriorities(ch)
  })

  return sum(priorities)
}

/**
 * @param {string} input
 */
function part2(input) {
  const lines = readLines(input.trim())

  const priorities = map(groupsOf(lines, 3), ([a, b, c]) => {
    const ch = find(a, (ch) => b.includes(ch) && c.includes(ch))
    return getPriorities(ch)
  })

  return sum(priorities)
}
