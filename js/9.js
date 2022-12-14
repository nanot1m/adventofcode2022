// @ts-check

import { readLines, tuple } from "./modules/lib.js"

import * as V from "./modules/vec.js"

/**
 * @param {string} input
 *
 * @returns {Array<() => any>}
 */
export function solve(input) {
  return [() => part1(input), () => part2(input)]
}

/**
 * @param {string} input
 */
function parseInput(input) {
  return readLines(input.trim())
    .map((x) => x.split(" "))
    .map((x) => tuple(V.asDir(x[0]), Number(x[1])))
}

/**
 * @param {ReturnType<typeof parseInput>} lines
 * @param {number} len
 */
function process(lines, len) {
  const visited = new Set()

  const rope = Array(len).fill(V.ZERO)

  for (const [dir, speed] of lines) {
    for (let i = 0; i < speed; i++) {
      rope[0] = V.add(rope[0], V.fromDir(dir))

      for (let j = 1; j < rope.length; j++) {
        const dist = V.sub(rope[j - 1], rope[j])
        if (V.cLen(dist) > 1) {
          rope[j] = V.add(rope[j], V.signed(dist))
        }
      }

      visited.add(rope.at(-1).join(","))
    }
  }

  return visited.size
}

/**
 * @param {string} input
 */
function part1(input) {
  return process(parseInput(input), 2)
}

/**
 * @param {string} input
 */
function part2(input) {
  return process(parseInput(input), 10)
}
