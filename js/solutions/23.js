// @ts-check

import { V } from "../modules/index.js"
import { it, iterate } from "../modules/itertools.js"
import { cycle } from "../modules/lib.js"
import { Map2d, parseMap2d } from "../modules/map2d.js"

export const useExample = false

export const exampleInput = `\
....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`

/** @typedef {ReturnType<typeof parseInput>} InputType */

/**
 * @param {string} input
 * @returns {Map2d<string>}
 */
export const parseInput = (input) => {
  const resultMap = new Map2d()
  for (const p of parseMap2d(input)) {
    if (p.value === "#") resultMap.set(p.pos, "#")
  }
  return resultMap
}

/** @type {Array<[V.Vec2[], V.Vec2]>} */
const initRules = [
  [[V.vec(-1, -1), V.vec(0, -1), V.vec(1, -1)], V.vec(0, -1)],
  [[V.vec(-1, 1), V.vec(0, 1), V.vec(1, 1)], V.vec(0, 1)],
  [[V.vec(-1, -1), V.vec(-1, 0), V.vec(-1, 1)], V.vec(-1, 0)],
  [[V.vec(1, -1), V.vec(1, 0), V.vec(1, 1)], V.vec(1, 0)],
]

/**
 * @param {Map2d<string>} map
 * @param {Array<[V.Vec2[], V.Vec2]>} rules
 */
function simulate(map, rules) {
  let toVisit = new Map2d()
  let targets = new Map2d()

  for (const p of map) {
    if (V.DIRS_8.every((d) => !map.hasPos(V.add(p.pos, d)))) {
      continue
    }
    const rule = rules.find(([neighbors]) =>
      neighbors.every((n) => !map.hasPos(V.add(p.pos, n))),
    )
    if (rule) {
      const target = V.add(p.pos, rule[1])
      targets.set(p.pos, target)
      toVisit.set(target, (toVisit.get(target) ?? 0) + 1)
    }
  }

  /** @type {Map2d<string>} */
  let nextMap = new Map2d()
  let isFinal = true

  for (const p of map) {
    const target = targets.get(p.pos)
    if (target && toVisit.get(target) === 1) {
      nextMap.set(target, "#")
      isFinal = false
    } else {
      nextMap.set(p.pos, "#")
    }
  }

  return { map2d: nextMap, rules: cycle(rules, 1), isFinal }
}

/**
 * @param {Map2d<string>} input
 */
export function part1(input) {
  const iter = iterate(
    { map2d: input, rules: initRules, isFinal: false },
    (x) => simulate(x.map2d, x.rules),
  )
  return it(iter)
    .skip(10)
    .take(1)
    .flatMap((x) => x.map2d.toString())
    .count((x) => x === ".")
}

/**
 * @param {Map2d<string>} input
 */
export function part2(input) {
  const iter = iterate(
    { map2d: input, rules: initRules, isFinal: false },
    (x) => simulate(x.map2d, x.rules),
  )
  return it(iter)
    .takeUntil((x) => x.isFinal)
    .count()
}
