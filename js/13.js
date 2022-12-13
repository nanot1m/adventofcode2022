// @ts-check

import { mul, readBlocks, readLines, zip } from "./modules/lib.js"
import { solution } from "./solution.js"

solution({
  solve(input) {
    return [() => part1(input), () => part2(input)]
  },
})

/**
 * @typedef {import("./modules/types.js").NestedArray<number>} NestedNumArray
 */

/**
 * @param {NestedNumArray} left
 * @param {NestedNumArray} right
 *
 * @returns {number}
 */
function compare(left, right) {
  if (typeof left === "number" && typeof right === "number") {
    return Math.sign(left - right)
  }

  left = Array.isArray(left) ? left : [left]
  right = Array.isArray(right) ? right : [right]

  const result = zip(left, right)
    .map(([l, r]) => compare(l, r))
    .find((result) => result !== 0)

  return result ?? Math.sign(left.length - right.length)
}

/**
 * @param {string} block
 * @returns {NestedNumArray[]}
 */
function parseBlock(block) {
  return readLines(block).map((l) => JSON.parse(l))
}

/**
 * @param {string} input
 */
function part1(input) {
  return readBlocks(input.trim())
    .map(parseBlock)
    .map(([l, r]) => compare(l, r))
    .reduce((acc, x, i) => acc + (x === -1 ? i + 1 : 0), 0)
}

/**
 * @param {string} input
 */
function part2(input) {
  const div = [[[2]], [[6]]]

  const sorted = readBlocks(input.trim())
    .flatMap(parseBlock)
    .concat(div)
    .sort(compare)

  return div.map((div) => sorted.indexOf(div) + 1).reduce(mul)
}
