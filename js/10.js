// @ts-check

import { $ } from "./itertools.js"
import { readLines } from "./lib.js"
import { solution } from "./solution.js"

solution({
  solve(input) {
    return [() => part1(input), () => part2(input)]
  },
})

/**
 * @param {string[]} lines
 */
function* prepareProgram(lines) {
  let x = 1
  let cycles = 0

  for (const line of lines) {
    const tokens = line.split(" ")
    if (tokens[0] === "noop") {
      yield { cycle: cycles++, x }
    }
    if (tokens[0] === "addx") {
      yield { cycle: cycles++, x }
      yield { cycle: cycles++, x }
      x += Number(tokens[1])
    }
  }
}

/**
 * @param {string} input
 */
function part1(input) {
  const p = prepareProgram(readLines(input.trimEnd()))

  return $(p)
    .takeEvery(40, 19)
    .map((c) => c.x * c.cycle)
    .sum()
}

/**
 * @param {string} input
 */
function part2(input) {
  const p = prepareProgram(readLines(input.trimEnd()))

  const image = $(p)
    .map((c) => [c.cycle, c.x + 40 * Math.floor(c.cycle / 40)])
    .map(([cycle, x]) => (cycle >= x - 1 && cycle <= x + 1 ? "█" : "◻️"))
    .groupsOf(40)
    .map((row) => row.join(""))
    .toArray()
    .join("\n")

  setTimeout(() => console.log(image))

  return "Answer is in the console."
}
