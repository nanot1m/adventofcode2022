// @ts-check

import { it } from "../modules/itertools.js"
import { t } from "../modules/parser.js"

export const useExample = false

export const exampleInput = `\
1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = t.arr(t.str()).parse

/**
 * @param {InputType} input
 */
export function part1(input) {
  /** @type {Record<string, number>} */
  const charToNum = {
    "-": -1,
    "=": -2,
  }

  /** @param {string} strNum */
  function count(strNum) {
    return strNum
      .split("")
      .map((c) => charToNum[c] || Number(c))
      .reverse()
      .reduce((acc, n, i) => acc + n * 5 ** i, 0)
  }

  /** @param {number} num */
  const toSnafu = (num) => {
    let result = ""
    while (num != 0) {
      /** @type {number | string} */
      let reminder = num % 5
      if (reminder == 3) {
        reminder = "="
        num += 2
      }
      if (reminder == 4) {
        reminder = "-"
        num += 1
      }
      result = reminder + result
      num = Math.floor(num / 5)
    }

    return result
  }

  const sum = it(input).map(count).sum()
  return toSnafu(sum)
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  return "Admire your Advent calendar!"
}
