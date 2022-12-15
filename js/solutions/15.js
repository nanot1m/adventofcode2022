// @ts-check

import { V } from "../modules/index.js"
import { range } from "../modules/itertools.js"
import { at, readLines, tpl } from "../modules/lib.js"

/**
 * @param {string} input
 *
 * @returns {Array<() => any>}
 */
export function solve(input) {
  // input = example
  return [() => part1(input), () => part2(input)]
}

const lineTpl = tpl`Sensor at x=${"sx|int"}, y=${"sy|int"}: closest beacon is at x=${"bx|int"}, y=${"by|int"}`

/**
 *
 * @param {Array<ReturnType<typeof lineTpl>>} lines
 * @param {number} lineIdx
 * @returns
 */
function processLine(lines, lineIdx) {
  const ranges = []

  for (const { sx, sy, bx, by } of lines) {
    const dist = V.mLen(V.vec(sx, sy), V.vec(bx, by))

    if (lineIdx >= sy - dist && lineIdx <= sy + dist) {
      const dx = dist - Math.abs(lineIdx - sy)
      ranges.push([sx - dx, sx + dx])
    }
  }

  ranges.sort((a, b) => a[0] - b[0])

  const merged = [ranges.shift()]
  for (let i = 0; i < ranges.length; i++) {
    const prev = at(merged, -1)
    if (prev[1] >= ranges[i][0]) {
      prev[1] = Math.max(prev[1], ranges[i][1])
    } else {
      merged.push(ranges[i])
    }
  }

  return merged
}

/**
 * @param {string} input
 */
function part1(input) {
  const lines = readLines(input.trimEnd()).map(lineTpl)
  return processLine(lines, 2000000).reduce((acc, [l, r]) => acc + r - l, 0)
}

/**
 * @param {string} input
 */
function part2(input) {
  const lines = readLines(input.trimEnd()).map(lineTpl)

  for (const i of range(0, 4_000_000)) {
    const res = processLine(lines, i)
    if (res.length > 1) {
      return (res[0][1] + 1) * 4_000_000 + i
    }
  }

  return 0
}
