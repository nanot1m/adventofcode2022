// @ts-check

import { first, i } from "./itertools.js"
import { readBlocks, readLines } from "./lib.js"
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
function parseInput(input) {
  const [stacksStr, commandsStr] = readBlocks(input.trimEnd())

  const stacks = i(readLines(stacksStr))
    .skipLast()
    .flatMap((line) => i(line).groupsOf(4).indexed())
    .filter(([, [, crate]]) => crate !== " ")
    .reduce((acc, [index, [, crate]]) => {
      acc[index] = acc[index] || []
      acc[index].push(crate)
      return acc
    }, /** @type {string[][]} */ ([]))
    .last()

  const commands = i(readLines(commandsStr))
    .map((line) => line.split(" "))
    .map(([, count, , from, , to]) => ({ count: +count, from: +from, to: +to }))

  return { stacks, commands }
}

/**
 * @param {string} input
 */
function part1(input) {
  const { stacks, commands } = parseInput(input)

  for (const { count, from, to } of commands) {
    const toMove = stacks[from - 1].splice(0, count).reverse()
    stacks[to - 1].unshift(...toMove)
  }

  return stacks.map(first).join("")
}

/**
 * @param {string} input
 */
function part2(input) {
  const { stacks, commands } = parseInput(input)

  for (const { count, from, to } of commands) {
    const toMove = stacks[from - 1].splice(0, count)
    stacks[to - 1].unshift(...toMove)
  }

  return stacks.map(first).join("")
}
