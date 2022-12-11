// @ts-check

import { range } from "./itertools.js"
import { readBlocks, tpl } from "./lib.js"
import { solution } from "./solution.js"

solution({
  solve(input) {
    return [() => part1(input), () => part2(input)]
  },
})

const ops = {
  "+": (/** @type {number} */ a, /** @type {number} */ b) => a + b,
  "*": (/** @type {number} */ a, /** @type {number} */ b) => a * b,
}

const monkeyTpl = tpl`\
Monkey ${"index|int"}:
  Starting items: ${"items|int[]"}
  Operation: new = old ${"op"} ${"arg|int"}
  Test: divisible by ${"divisibleBy|int"}
    If true: throw to monkey ${"ifTrue|int"}
    If false: throw to monkey ${"ifFalse|int"}\
`.map(({ ifFalse, ifTrue, arg, op, ...rest }) => ({
  ...rest,
  target: (/** @type {boolean} */ result) => (result ? ifTrue : ifFalse),
  op: (/** @type {number} */ old) => ops[op](old, isNaN(arg) ? old : arg),
}))

/**
 * @param {string} input
 * @returns
 */
function parseInput(input) {
  return readBlocks(input.trimEnd()).map(monkeyTpl)
}

/**
 *
 * @param {ReturnType<typeof parseInput>} monkeys
 * @param {number} rounds
 * @param {boolean} worry
 */
function solve(monkeys, rounds, worry) {
  const stats = Array(monkeys.length).fill(0)

  const d = monkeys.reduce((a, b) => a * b.divisibleBy, 1)

  for (const _ of range(rounds)) {
    for (const m of monkeys) {
      while (m.items.length > 0) {
        const item = m.op(m.items.shift())
        const next = worry ? Math.floor(item / 3) : item % d
        const target = m.target(next % m.divisibleBy === 0)
        monkeys[target].items.push(next)
        stats[m.index]++
      }
    }
  }

  return stats
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b)
}

/**
 * @param {string} input
 */
function part1(input) {
  return solve(parseInput(input), 20, true)
}

/**
 * @param {string} input
 */
function part2(input) {
  return solve(parseInput(input), 10_000, false)
}
