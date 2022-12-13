// @ts-check

import { it } from "./modules/itertools.js"
import { mul, readBlocks, readLines } from "./modules/lib.js"
import { PriorityQueue } from "./modules/priority-queue.js"
import { solution } from "./solution.js"

solution({
  solve(input) {
    return [() => part1(input), () => part2(input)]
  },
})

/**
 * @param {import("./modules/types.js").NestedArray<number>} left
 * @param {import("./modules/types.js").NestedArray<number>} right
 */
function compare(left, right, indent = 0) {
  if (left === undefined || right === undefined) {
    return 1
  }
  if (Array.isArray(left) && !Array.isArray(right)) {
    return compare(left, [right], indent + 1)
  }
  if (!Array.isArray(left) && Array.isArray(right)) {
    return compare([left], right, indent + 1)
  }
  if (!Array.isArray(left) && !Array.isArray(right)) {
    return left - right < 0 ? -1 : left - right > 0 ? 1 : 0
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    let i = 0
    let j = 0
    while (i < left.length && j < right.length) {
      const a = left[i++]
      const b = right[j++]

      const result = compare(a, b, indent + 1)
      if (result === 0) {
        continue
      }

      return result
    }

    return compare(left.length, right.length, indent + 1)
  }
}

/**
 * @param {string} input
 */
function part1(input) {
  const blocks = readBlocks(input.trim())

  const result = it(blocks)
    .map((block) => readLines(block).map((l) => JSON.parse(l)))
    .map(([left, right]) => compare(left, right))
    .indexed()
    .filter(([, result]) => result === -1)
    .map(([i]) => i + 1)
    .sum()

  return result
}

const LEFT_DIV = [[2]]
const RIGHT_DIV = [[6]]

/**
 * @param {string} input
 */
function part2(input) {
  const blocks = readBlocks(input.trim())

  /** @type {PriorityQueue<any>} */
  const pq = new PriorityQueue(compare)

  it(blocks)
    .flatMap((block) => readLines(block).map((l) => JSON.parse(l)))
    .forEach((x) => pq.push(x))

  pq.push(LEFT_DIV)
  pq.push(RIGHT_DIV)

  const result = it(pq)
    .skipAfter((x) => x === RIGHT_DIV)
    .indexed()
    .filter(([, x]) => x === LEFT_DIV || x === RIGHT_DIV)
    .map(([i]) => i + 1)
    .reduce(mul, 1)

  return result
}
