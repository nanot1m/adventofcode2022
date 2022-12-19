// @ts-check

import { readBlocks, readLines, tpl, typed } from "../modules/lib.js"

/**
 * @param {string} input
 * @returns {Array<() => any>}
 */
export function solve(input) {
  return [() => part1(input), () => part2(input)]
}

const example = `\
`

// const lineTpl = tpl`a=${"a|int"}`
// const lineTpl = typed("vec2[]")

/**
 * @param {string} input
 */
function part1(input) {
  input = example
  // const blocks = readBlocks(input.trim()).map(lineTpl)
  // const lines = readLines(input.trim()).map(lineTpl)
  return 0
}

/**
 * @param {string} input
 */
function part2(input) {
  return 0
}
