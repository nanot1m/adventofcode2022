// @ts-check
import { it } from "./modules/itertools.js"
import { readBlocks, readLines } from "./modules/lib.js"
import { PriorityQueue } from "./modules/priority-queue.js"

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
  return it(readBlocks(input))
    .map((block) => it(readLines(block)).map(Number).sum())
    .max()
}

/**
 * @param {string} input
 */
function part2(input) {
  /** @type {PriorityQueue<number>} */
  const pq = new PriorityQueue((a, b) => b - a)

  it(readBlocks(input))
    .map((block) => it(readLines(block)).map(Number).sum())
    .forEach((x) => pq.push(x))

  return it(pq).take(3).sum()
}
