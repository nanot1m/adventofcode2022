// @ts-check

import { V } from "../modules/index.js"
import { mod, readLines } from "../modules/lib.js"
import { Map2d, parseMap2d } from "../modules/map2d.js"

export const useExample = false

export const exampleInput = `\
#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = (/** @type {string} */ input) => {
  /** @type {Map2d<string>} */
  const resultMap = new Map2d()
  const lines = readLines(input)
  for (let y = 1; y < lines.length - 1; y++) {
    for (let x = 1; x < lines[y].length - 1; x++) {
      resultMap.set(V.vec(x - 1, y - 1), lines[y][x])
    }
  }
  return resultMap
}

/**
 *
 * @param {Map2d<string>} map
 * @param {V.Vec2} pos
 * @param {number} time
 * @returns
 */
function isBlizzard(map, pos, time) {
  return (
    checks.u(map, pos, time) ||
    checks.d(map, pos, time) ||
    checks.l(map, pos, time) ||
    checks.r(map, pos, time)
  )
}

/** @type {Record<"u" | "d" | "l" |"r", (map: Map2d<string>, pos: V.Vec2, time: number) => boolean>} */
export const checks = {
  u: (map, [x, y], time) => map.get([x, mod(y + time, map.height)]) === "^",
  d: (map, [x, y], time) => map.get([x, mod(y - time, map.height)]) === "v",
  l: (map, [x, y], time) => map.get([mod(x + time, map.width), y]) === "<",
  r: (map, [x, y], time) => map.get([mod(x - time, map.width), y]) === ">",
}

/**
 *
 * @param {Map2d<string>} map
 * @param {V.Vec2 | null} me
 * @param {number} time
 */
export function prepareMapForDraw(map, me, time) {
  const drawMap = new Map2d()

  for (const { pos } of map) {
    const blizzards = []
    if (checks.u(map, pos, time)) blizzards.push("^")
    if (checks.d(map, pos, time)) blizzards.push("v")
    if (checks.l(map, pos, time)) blizzards.push("<")
    if (checks.r(map, pos, time)) blizzards.push(">")
    if (blizzards.length > 0) {
      drawMap.set(pos, blizzards.length === 1 ? blizzards[0] : blizzards.length)
    }
  }
  for (let i = -1; i <= map.width; i++) {
    drawMap.set([i, -1], "#")
    drawMap.set([i, map.height], "#")
  }
  for (let i = 0; i < map.height; i++) {
    drawMap.set([-1, i], "#")
    drawMap.set([map.width, i], "#")
  }
  drawMap.set([0, -1], ".")
  drawMap.set([map.width - 1, map.height], ".")
  if (me) drawMap.set(me, "E")
  return parseMap2d(drawMap.toString())
}

/** @typedef {[V.Vec2, number, BfsStep | null]} BfsStep */

/**
 * @param {BfsStep} step
 */
export function toArray(step) {
  const result = []
  while (step) {
    result.push(step)
    step = step[2]
  }
  return result.reverse()
}

/**
 * @param {Map2d<string>} map
 * @param {V.Vec2} start
 * @param {V.Vec2} end
 * @param {V.Vec2} pos
 * @param {number} t
 * @returns {V.Vec2[]}
 */
export function getAvailablePositions(map, start, end, pos, t) {
  return [...V.DIRS_4, V.ZERO]
    .map((d) => V.add(pos, d))
    .filter((n) => {
      return (
        !isBlizzard(map, n, t + 1) &&
        (V.eq(n, start) || V.eq(n, end) || map.has(n))
      )
    })
}

/**
 *
 * @param {InputType} map
 * @param {V.Vec2} start
 * @param {V.Vec2} end
 * @param {number} startTime
 * @returns
 */
export function getShortestPath(map, start, end, startTime) {
  while (isBlizzard(map, start, startTime)) startTime++

  /**
   * @param {V.Vec2} start
   * @param {V.Vec2} end
   * @param {number} startTime
   *
   * @returns {BfsStep | null}
   */
  function bfs(start, end, startTime) {
    /** @type {Array<BfsStep>} */
    const queue = [[start, startTime, null]]
    const visited = new Set()

    while (queue.length > 0) {
      const cur = queue.shift()
      const [pos, t] = cur
      if (V.eq(pos, end)) return cur

      const key = pos.toString() + ":" + t
      if (visited.has(key)) continue
      else visited.add(key)

      for (const next of getAvailablePositions(map, start, end, pos, t)) {
        queue.push([next, t + 1, cur])
      }
    }

    throw new Error("No path found")
  }

  const result = bfs(start, end, startTime)
  // toArray(result).forEach((pos, i) => {
  //   drawMap(map, pos[0], i + startTime)
  // })
  return result
}

/**
 * @param {InputType} input
 */
export function part1(input) {
  const start = V.vec(0, -1)
  const end = V.vec(input.width - 1, input.height)
  return getShortestPath(input, start, end, 0)[1]
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  const start = V.vec(0, -1)
  const end = V.vec(input.width - 1, input.height)
  const first = getShortestPath(input, start, end, 0)
  const second = getShortestPath(input, end, start, first[1])
  const third = getShortestPath(input, start, end, second[1])
  return third
}
