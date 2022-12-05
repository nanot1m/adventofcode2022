// @ts-check

import { first, groupsOf, indexed, it } from "./itertools.js"
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
  const [stacksStr, commandsStr] = readBlocks(input)

  /** @type {string[][]} */
  const stacks = Array.from(Array(9), () => [])

  for (const line of readLines(stacksStr).slice(0, -1)) {
    for (const [i, [, crate]] of indexed(groupsOf(line, 4))) {
      if (crate !== " ") {
        stacks[i].push(crate)
      }
    }
  }

  const commands = readLines(commandsStr.trim()).map((command) => {
    const [, count, , from, , to] = command.split(" ").map(Number)
    return { count, from, to }
  })

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
