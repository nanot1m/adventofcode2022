// @ts-check
import { $ } from "./itertools.js"
import { readBlocks, readLines } from "./lib.js"
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
  return $(readBlocks(input))
    .map((block) => $(readLines(block)).map(Number).sum())
    .max()
}

/**
 * @param {string} input
 */
function part2(input) {
  /** @type {PriorityQueue<number>} */
  const pq = new PriorityQueue((a, b) => b - a)

  $(readBlocks(input))
    .map((block) => $(readLines(block)).map(Number).sum())
    .forEach((x) => pq.push(x))

  return $(pq).take(3).sum()
}
