// @ts-check

import { first, $ } from "./itertools.js"
import { readBlocks, readLines, rotate, tpl } from "./lib.js"
import { solution } from "./solution.js"

solution({
  solve(input) {
    return [() => part1(input), () => part2(input)]
  },
  submit: { 1: false, 2: false },
})

const commandTpl = tpl`move ${"count"} from ${"from"} to ${"to"}`.map((m) => ({
  count: Number(m.count),
  from: Number(m.from) - 1,
  to: Number(m.to) - 1,
}))

/**
 * @param {string} input
 */
function parseInput(input) {
  const [stacksStr, commandsStr] = readBlocks(input.trimEnd())

  const stacks = $(rotate(readLines(stacksStr)))
    .takeEvery(4, 1)
    .map((x) => x.slice(1).split("").reverse())
    .toArray()

  const commands = $(readLines(commandsStr)).map(commandTpl)

  return { stacks, commands }
}

/**
 * @param {string} input
 */
function part1(input) {
  const { stacks, commands } = parseInput(input)

  return commands
    .reduce((xs, { count, from, to }) => {
      xs[to].unshift(...xs[from].splice(0, count).reverse())
      return xs
    }, stacks)
    .map(first)
    .join("")
}

/**
 * @param {string} input
 */
function part2(input) {
  const { stacks, commands } = parseInput(input)

  return commands
    .reduce((xs, { count, from, to }) => {
      xs[to].unshift(...xs[from].splice(0, count))
      return xs
    }, stacks)
    .map(first)
    .join("")
}
