// @ts-check

import { first, it } from "../modules/itertools.js"
import { readLines, rotate } from "../modules/lib.js"
import { t } from "../modules/parser.js"

const stacksParser = {
  parse: (/** @type {string} */ stacksStr) =>
    it(rotate(readLines(stacksStr)))
      .takeEvery(4, 1)
      .map((x) => x.slice(1).split("").reverse())
      .toArray(),
}

const commandParser = t.tpl`move ${"count|int"} from ${"from|int"} to ${"to|int"}`

export const parseInput = t.tuple([stacksParser, t.arr(commandParser)]).parse

/**
 * @param {ReturnType<typeof parseInput>} input
 */
export function part1([stacks, commands]) {
  return commands
    .reduce((xs, { count, from, to }) => {
      xs[to - 1].unshift(...xs[from - 1].splice(0, count).reverse())
      return xs
    }, stacks)
    .map(first)
    .join("")
}

/**
 * @param {ReturnType<typeof parseInput>} input
 */
export function part2([stacks, commands]) {
  return commands
    .reduce((xs, { count, from, to }) => {
      xs[to - 1].unshift(...xs[from - 1].splice(0, count))
      return xs
    }, stacks)
    .map(first)
    .join("")
}
