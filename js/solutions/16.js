// @ts-check

import { readLines, tpl, tuple } from "../modules/lib.js"

/**
 * @param {string} input
 *
 * @returns {Array<() => any>}
 */
export function solve(input) {
  return [() => part1(input), () => part2(input)]
}

const lineTpl = tpl`Valve ${"valve|str"} has flow rate=${"flowRate|int"};\
 ${"tunnelsToken"} to ${"valvesToken"} ${"tunnel|str[]"}`

/**
 * @param {string} input
 */
function parseInput(input) {
  const lines = readLines(input.trim()).map(lineTpl)
  /** @type {Record<string, ReturnType<typeof lineTpl>>} */
  const tree = {}
  for (const line of lines) {
    tree[line.valve] = line
  }

  /** @type {Record<string, Record<string, number>>} */
  const distances = {}
  for (const line of lines) {
    const queue = [line.valve]
    /** @type {Record<string, number>} */
    const lineDistances = { [line.valve]: 0 }
    const visited = new Set([line.valve])

    while (queue.length) {
      const current = queue.shift()
      const dist = lineDistances[current]
      for (const tunnel of tree[current].tunnel) {
        if (!visited.has(tunnel)) {
          visited.add(tunnel)
          queue.push(tunnel)
          lineDistances[tunnel] = dist + 1
        }
      }
    }

    distances[line.valve] = lineDistances
  }

  /** @type {Record<string, Number>} */
  const masks = {}
  let bit = 0
  for (const valve in tree) {
    if (tree[valve].flowRate) {
      masks[valve] = 1 << bit
      bit++
    }
  }

  return { masks, tree, distances }
}

/**
 * @param {string} input
 */
function part1(input) {
  const { distances, masks, tree } = parseInput(input)
  /** @type {Record<string, number>} */
  const cache = {}

  /**
   * @param {string} from
   * @param {number} opened
   * @param {number} timeLeft
   */
  function* paths(from, opened, timeLeft) {
    const dist = distances[from]
    for (const to in dist) {
      if (to in masks && !(opened & masks[to]) && dist[to] + 1 < timeLeft) {
        yield tuple(to, dist[to])
      }
    }
  }

  /**
   * @param {string} start
   * @param {number} timeLeft
   * @param {number} opened
   *
   * @returns {number}
   */
  function dfs(start, timeLeft = 30, opened = 0) {
    const key = `${start}-${timeLeft}-${opened}`
    if (cache[key] !== undefined) {
      return cache[key]
    }

    let max = 0
    for (const [to, dist] of paths(start, opened, timeLeft)) {
      const nOpened = opened | masks[to]
      const nTimeLeft = timeLeft - dist - 1
      const pressure = tree[to].flowRate * nTimeLeft
      const nMax = pressure + dfs(to, nTimeLeft, nOpened)
      max = Math.max(max, nMax)
    }

    return (cache[key] = max)
  }

  return dfs("AA")
}

/**
 * @param {string} input
 */
function part2(input) {
  const { masks, tree, distances } = parseInput(input)

  /**
   * @param {string} from
   * @param {number} opened
   * @param {number} timeLeft
   */
  function* paths(from, opened, timeLeft) {
    const dist = distances[from]
    for (const to in dist) {
      if (to in masks && !(opened & masks[to]) && dist[to] + 1 < timeLeft) {
        yield tuple(to, dist[to])
      }
    }
  }

  /** @type {Record<string, number>} */
  const cache = {}

  /**
   *
   * @param {string} meStart
   * @param {string} elStart
   * @param {number} meTime
   * @param {number} elTime
   * @param {number} opened
   */
  function dfs(meStart, elStart, meTime = 26, elTime = 26, opened = 0) {
    const key = `${meStart}-${elStart}-${meTime}-${elTime}-${opened}`
    if (cache[key] !== undefined) {
      return cache[key]
    }

    let chelMax = 0
    for (const [meTo, meSpent] of paths(meStart, opened, meTime)) {
      const meLeft = meTime - meSpent - 1

      let elMax = 0
      for (const [elTo, elSpent] of paths(elStart, opened, elTime)) {
        if (elTo === meTo) continue
        const elLeft = elTime - elSpent - 1
        const nOpened = opened | masks[meTo] | masks[elTo]
        const elPressure = tree[elTo].flowRate * elLeft
        const pressure = elPressure + dfs(meTo, elTo, meLeft, elLeft, nOpened)
        elMax = Math.max(elMax, pressure)
      }

      const mePressure = tree[meTo].flowRate * meLeft
      chelMax = Math.max(chelMax, elMax + mePressure)
    }

    return (cache[key] = chelMax)
  }

  return dfs("AA", "AA")
}
