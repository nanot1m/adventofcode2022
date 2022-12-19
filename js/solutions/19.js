// @ts-check

import { it } from "../modules/itertools.js"
import { readLines, tpl } from "../modules/lib.js"

/**
 * @param {string} input
 * @returns {Array<() => any>}
 */
export function solve(input) {
  return [() => part1(input), () => part2(input)]
}

const example = `\
Blueprint 1: Each ore robot costs 4 ore.\
 Each clay robot costs 2 ore.\
 Each obsidian robot costs 3 ore and 14 clay.\
 Each geode robot costs 2 ore and 7 obsidian.\

Blueprint 2: Each ore robot costs 2 ore.\
 Each clay robot costs 3 ore.\
 Each obsidian robot costs 3 ore and 8 clay.\
 Each geode robot costs 3 ore and 12 obsidian.
`

const lineTpl = tpl`\
Blueprint ${"index|int"}:\
 Each ore robot costs ${"ao|int"} ore.\
 Each clay robot costs ${"bo|int"} ore.\
 Each obsidian robot costs ${"co|int"} ore and ${"cc|int"} clay.\
 Each geode robot costs ${"do|int"} ore and ${"dg|int"} obsidian.\
`

/**
 *
 * @param {ReturnType<typeof lineTpl>} p
 * @param {number} timeLeft
 */
function countGeodes(p, timeLeft) {
  const maxOreRobots = Math.max(p.ao, p.bo, p.co, p.do)
  const maxClayRobots = p.cc
  const maxObsidianRobots = p.dg

  /**
   * @param {number} a - ore robots
   * @param {number} b - clay robots
   * @param {number} c - obsidian robots
   * @param {number} d - geode robots
   * @param {number} ar - ore
   * @param {number} br - clay
   * @param {number} or - obsidian
   * @param {number} gr - geode
   * @param {number} tp - time passed
   * @param {number} t - time total
   */
  function dfs(a, b, c, d, ar, br, or, gr, tp, t) {
    let isOreRobotBuilt = false
    let isClayBotBuilt = false
    let isObsBotBuilt = false
    let isGeodeBotBuilt = false

    let max = gr

    for (let i = tp; i < t; i++) {
      const canBuildOreBot = p.ao <= ar
      const canBuildClayBot = p.bo <= ar
      const canBuildObsBot = p.co <= ar && p.cc <= br
      const canBuildGeoBot = p.do <= ar && p.dg <= or

      ;(ar += a), (br += b), (or += c), (gr += d)

      if (canBuildGeoBot && !isGeodeBotBuilt) {
        const r = dfs(a, b, c, d + 1, ar - p.do, br, or - p.dg, gr, i + 1, t)
        max = Math.max(max, r)
        isGeodeBotBuilt = true
      }
      if (canBuildObsBot && !isObsBotBuilt && c < maxObsidianRobots) {
        const r = dfs(a, b, c + 1, d, ar - p.co, br - p.cc, or, gr, i + 1, t)
        max = Math.max(max, r)
        isObsBotBuilt = true
      }
      if (canBuildClayBot && !isClayBotBuilt && b < maxClayRobots) {
        const r = dfs(a, b + 1, c, d, ar - p.bo, br, or, gr, i + 1, t)
        max = Math.max(max, r)
        isClayBotBuilt = true
      }
      if (canBuildOreBot && !isOreRobotBuilt && a < maxOreRobots) {
        const r = dfs(a + 1, b, c, d, ar - p.ao, br, or, gr, i + 1, t)
        max = Math.max(max, r)
        isOreRobotBuilt = true
      }

      max = Math.max(max, gr)
    }
    return max
  }

  return dfs(1, 0, 0, 0, 0, 0, 0, 0, 0, timeLeft)
}

/**
 * @param {string} input
 */
function part1(input) {
  const blueprints = readLines(input.trim()).map(lineTpl)

  return it(blueprints)
    .map((x, index) => (index + 1) * countGeodes(x, 24))
    .sum()
}

/**
 * @param {string} input
 */
function part2(input) {
  const blueprints = readLines(input.trim()).map(lineTpl)

  return it(blueprints)
    .take(3)
    .map((x) => countGeodes(x, 32))
    .multiply()
}
