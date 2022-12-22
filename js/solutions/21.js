// @ts-check

import { t } from "../modules/parser.js"

/** @type {import('../modules/types.js').SolutionModuleValid<typeof import('./21.js')>} */
const __MODULE_VALID__ = true

export const useExample = false

export const exampleInput = `\
root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`

/** @typedef {ReturnType<typeof parseInput>} InputType */

const valParser = t.tuple([t.str(), t.str(), t.str()], " ")
export const parseInput = t.arr(t.tuple([t.str(), valParser], ": ")).parse

/**
 *
 * @param {InputType} input
 * @returns
 */
function getTasks(input) {
  /** @type {Record<string, () => number>} */
  const tasks = {}

  for (const [id, [a, op, b]] of input) {
    const num = Number(a)
    if (num) {
      tasks[id] = () => num
      continue
    }
    tasks[id] = () => {
      switch (op) {
        case "+":
          return tasks[a]() + tasks[b]()
        case "-":
          return tasks[a]() - tasks[b]()
        case "*":
          return tasks[a]() * tasks[b]()
        case "/":
          return tasks[a]() / tasks[b]()
      }
    }
  }

  return tasks
}

/**
 * @param {InputType} input
 */
export function part1(input) {
  return getTasks(input).root()
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  const tasks = getTasks(input)

  const dict = new Map(input)

  const usedIn = /** @type {Record<string, string>} */ ({})
  for (const [id, [a, , b]] of input) {
    usedIn[a] = id
    usedIn[b] = id
  }

  /**
   * @param {string} id
   * @returns {number}
   */
  const solve = (id) => {
    const next = usedIn[id]
    const [left, op, right] = dict.get(next)

    const another = left === id ? right : left
    const anotherVal = tasks[another]()
    if (next === "root") {
      return anotherVal
    }

    const nextVal = solve(next)
    switch (op) {
      case "+":
        return nextVal - anotherVal
      case "*":
        return nextVal / anotherVal
      case "-":
        return left === id ? nextVal + anotherVal : anotherVal - nextVal
      case "/":
        return left === id ? nextVal * anotherVal : anotherVal / nextVal
    }
  }

  return solve("humn")
}
