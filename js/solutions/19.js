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
 Each ore robot costs ${"oreBotOre|int"} ore.\
 Each clay robot costs ${"clayBotOre|int"} ore.\
 Each obsidian robot costs ${"obsBotOre|int"} ore and ${"obsBotClay|int"} clay.\
 Each geode robot costs ${"geoBotOre|int"} ore and ${"geoBotObs|int"} obsidian.\
`

/**
 *
 * @param {ReturnType<typeof lineTpl>} blueprint
 * @param {number} timeLeft
 */
function countGeodes(blueprint, timeLeft) {
  const maxOreRobots = Math.max(
    blueprint.oreBotOre,
    blueprint.clayBotOre,
    blueprint.obsBotOre,
    blueprint.geoBotOre,
  )
  const maxClayRobots = blueprint.obsBotClay
  const maxObsidianRobots = blueprint.geoBotObs

  /**
   * @param {number} oreBots - ore robots
   * @param {number} clayBots - clay robots
   * @param {number} obsBots - obsidian robots
   * @param {number} geoBots - geode robots
   * @param {number} ore - ore
   * @param {number} clay - clay
   * @param {number} obs - obsidian
   * @param {number} geode - geode
   * @param {number} timePassed - time passed
   * @param {number} timeTotal - time total
   */
  function dfs(
    oreBots,
    clayBots,
    obsBots,
    geoBots,
    ore,
    clay,
    obs,
    geode,
    timePassed,
    timeTotal,
  ) {
    let isOreRobotBuilt = false
    let isClayBotBuilt = false
    let isObsBotBuilt = false
    let isGeodeBotBuilt = false

    let max = geode

    for (let i = timePassed; i < timeTotal; i++) {
      const canBuildOreBot = blueprint.oreBotOre <= ore
      const canBuildClayBot = blueprint.clayBotOre <= ore
      const canBuildObsBot =
        blueprint.obsBotOre <= ore && blueprint.obsBotClay <= clay
      const canBuildGeoBot =
        blueprint.geoBotOre <= ore && blueprint.geoBotObs <= obs

      ore += oreBots
      clay += clayBots
      obs += obsBots
      geode += geoBots

      if (canBuildGeoBot && !isGeodeBotBuilt) {
        const r = dfs(
          oreBots,
          clayBots,
          obsBots,
          geoBots + 1,
          ore - blueprint.geoBotOre,
          clay,
          obs - blueprint.geoBotObs,
          geode,
          i + 1,
          timeTotal,
        )
        max = Math.max(max, r)
        isGeodeBotBuilt = true
        continue
      }
      if (canBuildObsBot && !isObsBotBuilt && obsBots < maxObsidianRobots) {
        const r = dfs(
          oreBots,
          clayBots,
          obsBots + 1,
          geoBots,
          ore - blueprint.obsBotOre,
          clay - blueprint.obsBotClay,
          obs,
          geode,
          i + 1,
          timeTotal,
        )
        max = Math.max(max, r)
        isObsBotBuilt = true
        continue
      }
      if (canBuildClayBot && !isClayBotBuilt && clayBots < maxClayRobots) {
        const r = dfs(
          oreBots,
          clayBots + 1,
          obsBots,
          geoBots,
          ore - blueprint.clayBotOre,
          clay,
          obs,
          geode,
          i + 1,
          timeTotal,
        )
        max = Math.max(max, r)
        isClayBotBuilt = true
      }
      if (canBuildOreBot && !isOreRobotBuilt && oreBots < maxOreRobots) {
        const r = dfs(
          oreBots + 1,
          clayBots,
          obsBots,
          geoBots,
          ore - blueprint.oreBotOre,
          clay,
          obs,
          geode,
          i + 1,
          timeTotal,
        )
        max = Math.max(max, r)
        isOreRobotBuilt = true
      }

      max = Math.max(max, geode)
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
    .map((x) => x.index * countGeodes(x, 24))
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
