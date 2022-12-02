// @ts-check
import { first, take, toArray } from "./itertools.js"
import { readBlocks, readLines, sum } from "./lib.js"
import { PriorityQueue } from "./priority-queue.js"
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
  const pq = new PriorityQueue((a, b) => b - a)
  for (const block of readBlocks(input)) {
    pq.push(sum(readLines(block).map(Number)))
  }
  return first(pq)
}

/**
 * @param {string} input
 */
function part2(input) {
  const pq = new PriorityQueue((a, b) => b - a)
  for (const block of readBlocks(input)) {
    pq.push(sum(readLines(block).map(Number)))
  }
  return sum(toArray(take(pq, 3)))
}
