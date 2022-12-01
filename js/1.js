// @ts-check
import { max, readBlocks, readLines, sum } from "./lib.js"
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
  const minVal = max(
    readBlocks(input)
      .map((x) => readLines(x).map(Number))
      .map(sum),
  )
  return minVal
}

/**
 * @param {string} input
 */
function part2(input) {
  const top3 = readBlocks(input)
    .map((x) => readLines(x).map(Number))
    .map(sum)
    .sort((a, b) => a - b)
    .slice(-3)
  return sum(top3)
}
