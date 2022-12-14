// @ts-check

import { readLines } from "../modules/lib.js"

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
function part1(input) {
  const games = readLines(input.trim()).map((x) => x.split(" "))

  /** @type {Record<string, Record<string, number>>} */
  const scores = {
    A: { X: 3, Y: 6, Z: 0 },
    B: { X: 0, Y: 3, Z: 6 },
    C: { X: 6, Y: 0, Z: 3 },
  }

  /** @type {Record<string, number>} */
  const values = { X: 1, Y: 2, Z: 3 }

  let score = 0
  for (const [a, b] of games) {
    score += scores[a][b] + values[b]
  }

  return score
}

/**
 * @param {string} input
 */
function part2(input) {
  const games = readLines(input.trim()).map((x) => x.split(" "))

  /** @type {Record<string, number>} */
  const scores = { X: 0, Y: 3, Z: 6 }

  /** @type {Record<string, Record<string, number>>} */
  const values = {
    A: { X: 3, Y: 1, Z: 2 },
    B: { X: 1, Y: 2, Z: 3 },
    C: { X: 2, Y: 3, Z: 1 },
  }

  let score = 0
  for (const [a, b] of games) {
    score += scores[b] + values[a][b]
  }

  return score
}
