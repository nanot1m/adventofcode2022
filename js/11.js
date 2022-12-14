// @ts-check

import { range } from "./modules/itertools.js"
import { add, compareDesc, mul, readBlocks, tpl } from "./modules/lib.js"

/**
 * @param {string} input
 *
 * @returns {Array<() => any>}
 */
export function solve(input) {
  return [() => part1(input), () => part2(input)]
}

const ops = { "+": add, "*": mul }

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
  op: (/** @type {number} */ old) =>
    ops[/** @type {"+" | "*"} */ (op)](old, isNaN(arg) ? old : arg),
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
function process(monkeys, rounds, worry) {
  const stats = Array(monkeys.length).fill(0)

  const d = monkeys.reduce((a, b) => a * b.divisibleBy, 1)

  for (const _ of range(rounds)) {
    for (const m of monkeys) {
      while (m.items.length > 0) {
        const item = m.op(/** @type {number} */ (m.items.shift()))
        const next = worry ? Math.floor(item / 3) : item % d
        const target = m.target(next % m.divisibleBy === 0)
        monkeys[target].items.push(next)
        stats[m.index]++
      }
    }
  }

  return stats.sort(compareDesc).slice(0, 2).reduce(mul)
}

/**
 * @param {string} input
 */
function part1(input) {
  return process(parseInput(input), 20, true)
}

/**
 * @param {string} input
 */
function part2(input) {
  return process(parseInput(input), 10_000, false)
}
