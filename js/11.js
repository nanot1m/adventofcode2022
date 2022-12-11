// @ts-check

import { range } from "./itertools.js"
import { readBlocks, tpl } from "./lib.js"
import { solution } from "./solution.js"

solution({
  solve(input) {
    return [() => part1(input), () => part2(input)]
  },
})

const monkeyTpl = tpl`Monkey ${"index"}:
  Starting items: ${"items"}
  Operation: new = ${"lOp"} ${"op"} ${"rOp"}
  Test: divisible by ${"divisibleBy"}
    If true: throw to monkey ${"ifTrue"}
    If false: throw to monkey ${"ifFalse"}`

/**
 * @param {string} input
 * @returns
 */
function parseInput(input) {
  return readBlocks(input.trimEnd())
    .map(monkeyTpl)
    .map((m) => ({
      index: Number(m.index),
      items: m.items.split(", ").map(Number),
      divisibleBy: Number(m.divisibleBy),
      targets: { true: Number(m.ifTrue), false: Number(m.ifFalse) },
      op(/** @type {number} */ old) {
        const left = m.lOp === "old" ? old : Number(m.lOp)
        const right = m.rOp === "old" ? old : Number(m.rOp)
        if (m.op === "+") return left + right
        return left * right
      },
    }))
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
        const old = m.items.shift()
        const next = worry ? Math.floor(m.op(old) / 3) : m.op(old) % d
        const target = m.targets[next % m.divisibleBy === 0]
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
