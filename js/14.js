// @ts-check

import { V } from "./modules/index.js"
import { it } from "./modules/itertools.js"
import { readLines, tuple, typed } from "./modules/lib.js"
import { Map2d } from "./modules/map2d.js"

/**
 * @param {string} input
 * @returns
 */
export function solve(input) {
  return [() => part1(input), () => part2(input)]
}

const start = V.vec(500, 0)

/**
 * @param {string} input
 * @returns
 */
function parseMap(input) {
  const lines = readLines(input.trimEnd()).map(typed("vec[]"))

  const points = it(lines)
    .flatMap((line) =>
      it(line)
        .windowed(2)
        .flatMap(([a, b]) => V.segment(a, b)),
    )
    .map((pos) => tuple(pos, "#"))

  return new Map2d(points).set(start, "+")
}

/**
 * @param {Map2d<string>} map2d
 * @param {V.Vec2} sandPos
 */
function* simulateSand(map2d, sandPos, maxY = map2d.bounds.maxY) {
  const bot = V.vec(0, 1)
  const leftBot = V.vec(-1, 1)
  const rightBot = V.vec(1, 1)

  /**
   *
   * @param {V.Vec2} startFrom
   * @returns
   */
  function drop(startFrom) {
    let pos = startFrom
    while (true) {
      if (V.y(pos) >= maxY) {
        return null
      }

      const bottom = V.add(pos, bot)
      if (map2d.hasPos(bottom) === false) {
        pos = bottom
        continue
      }

      const lb = V.add(pos, leftBot)
      if (map2d.hasPos(lb) === false) {
        pos = lb
        continue
      }

      const rb = V.add(pos, rightBot)
      if (map2d.hasPos(rb) === false) {
        pos = rb
        continue
      }

      return pos
    }
  }

  while (true) {
    const pos = drop(sandPos)
    if (pos === null || V.eq(pos, sandPos)) {
      return
    }
    map2d.set(pos, "o")
    yield pos
  }
}

/**
 * @param {string} input
 */
function part1(input) {
  const map2d = parseMap(input)

  return it(simulateSand(map2d, V.vec(500, 0))).count()
}

/**
 * @param {string} input
 */
function part2(input) {
  const map = parseMap(input)

  const bfs = map
    .setGetNeighbors((pos) => V.DIRS_3_TOP.map((d) => V.add(pos, d)))
    .bfs((_, b) => !map.hasPos(b.pos) && b.pos[1] < map.height + 2, start)

  return it(bfs).count()
}
