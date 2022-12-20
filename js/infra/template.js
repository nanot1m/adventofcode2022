// @ts-check

import { readBlocks, readLines, tpl, typed } from "../modules/lib.js"

export const useExample = false

export const exampleInput = `\
`

/** @typedef {ReturnType<typeof parseInput>} InputType */

// const lineTpl = tpl`a=${"a|int"}`
// const lineTpl = typed("vec[]")

export const parseInput = (/** @type {string} */ input) => {
  // const blocks = readBlocks(input.trim()).map(lineTpl)
  // const lines = readLines(input.trim()).map(lineTpl)
  return input
}

/**
 * @param {InputType} input
 */
export function part1(input) {
  return 0
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  return 0
}
