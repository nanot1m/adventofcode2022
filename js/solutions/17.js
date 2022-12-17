// @ts-check

import { V } from "../modules/index.js"
import { readLines, tpl } from "../modules/lib.js"
import { Map2d } from "../modules/map2d.js"

/**
 * @param {string} input
 *
 * @returns {Array<() => any>}
 */
export function solve(input) {
  return [() => part1(input), () => part2(input)]
}

const example = `\
>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>
`

const WIDTH = 7

const ROCKS = [
  {
    name: "-",
    pos: V.vec(0, 0),
    width: 4,
    height: 1,
    points: [V.vec(0, 0), V.vec(1, 0), V.vec(2, 0), V.vec(3, 0)],
  },
  {
    name: "+",
    pos: V.vec(0, 0),
    width: 3,
    height: 3,
    points: [
      V.vec(1, 0),
      V.vec(0, -1),
      V.vec(1, -1),
      V.vec(2, -1),
      V.vec(1, -2),
    ],
  },
  {
    name: "⌟",
    pos: V.vec(0, 0),
    width: 3,
    height: 3,
    points: [
      V.vec(2, 0),
      V.vec(2, -1),
      V.vec(0, -2),
      V.vec(1, -2),
      V.vec(2, -2),
    ],
  },
  {
    name: "|",
    pos: V.vec(0, 0),
    width: 1,
    height: 4,
    points: [V.vec(0, 0), V.vec(0, -1), V.vec(0, -2), V.vec(0, -3)],
  },
  {
    name: "o",
    pos: V.vec(0, 0),
    width: 2,
    height: 2,
    points: [V.vec(0, 0), V.vec(1, 0), V.vec(0, -1), V.vec(1, -1)],
  },
]

/**
 * @param {string} input
 */
function* mover(input) {
  while (true) {
    for (const char of input) {
      yield char
    }
  }
}

function* rocks() {
  while (true) {
    for (const rock of ROCKS) {
      yield rock
    }
  }
}

/**
 *
 * @param {Generator<T>} iter
 * @returns {T}
 * @template T
 */
function next(iter) {
  return iter.next().value
}

/**
 * @typedef {typeof ROCKS[number]} Rock
 */

/**
 *
 * @param {Rock} rock
 * @param {V.Vec2} delta
 */
function moveRock(rock, delta) {
  return {
    ...rock,
    pos: V.add(rock.pos, delta),
  }
}

/**
 * @param {Rock} rock
 * @param {string} dir
 * @param {Map2d<string>} map
 */
function pushRock(rock, dir, map) {
  let nextRock = rock
  switch (dir) {
    case ">": {
      const nextX = V.x(rock.pos) + 1
      if (nextX + rock.width > WIDTH) return rock
      nextRock = moveRock(rock, V.vec(1, 0))
      break
    }
    case "<": {
      const nextX = V.x(rock.pos) - 1
      if (nextX < 0) return rock
      nextRock = moveRock(rock, V.vec(-1, 0))
      break
    }
    default:
      throw new Error(`Unknown direction: ${dir}`)
  }

  if (nextRock.points.some((p) => map.hasPos(V.add(nextRock.pos, p)))) {
    return rock
  }
  return nextRock
}

/**
 *
 * @param {Rock} rock
 * @param {number} height
 */
function placeRock(rock, height) {
  const dy = height + 2 + rock.height
  const dx = 2
  return moveRock(rock, V.vec(dx, dy))
}

/**
 * @param {Rock} rock
 */
function fallRock(rock) {
  return moveRock(rock, V.vec(0, -1))
}

/**
 * @param {Rock} rock
 * @param {Map2d<string>} map
 * @param {number} height
 */
function rockPlaced(rock, map, height) {
  const bottom = V.y(rock.pos) - rock.height + 1
  if (bottom > height) return false
  if (bottom === 0) return true

  const nextRock = moveRock(rock, V.vec(0, -1))
  return nextRock.points.some((p) => map.hasPos(V.add(nextRock.pos, p)))
}

/**
 * @param {Rock} rock
 * @param {Map2d<string>} map
 * @param {number} curHeight
 * @returns next height
 */
function placeRockOnMap(rock, map, curHeight) {
  for (const p of rock.points) {
    map.set(V.add(rock.pos, p), "#")
  }
  return Math.max(curHeight, V.y(rock.pos) + 1)
}

/**
 * @param {Rock} rock
 * @param {Map2d<string>} map
 * @param {number} height
 */
function printRockOnMap(rock, map, height) {
  const newMap = new Map2d()
  for (const p of map) {
    newMap.set(p.pos, p.value)
  }
  for (const p of rock.points) {
    newMap.set(V.add(rock.pos, p), "@")
  }

  console.log("height", height)
  console.log(
    newMap
      .toString({
        botRightPos: V.vec(6, Math.max(height + 2, V.y(rock.pos))),
        topLeftPos: V.vec(0, 0),
        valToString: (v) => v ?? ".",
      })
      .split("\n")
      .reverse()
      .join("\n"),
  )
  console.log("\n")
}

/**
 * @param {string} input
 */
function part1(input) {
  // input = example
  const m = mover(input.trim())
  const r = rocks()

  /** @type {Map2d<string>} */
  const map = new Map2d()

  let height = 0
  let rocksStopped = 0
  let rock = placeRock(next(r), height)
  while (rocksStopped < 2022) {
    const move = next(m)
    rock = pushRock(rock, move, map)
    if (rockPlaced(rock, map, height)) {
      height = placeRockOnMap(rock, map, height)
      rocksStopped++
      rock = placeRock(next(r), height)
    } else {
      rock = fallRock(rock)
    }
  }

  return height
}

/**
 * @param {string} input
 */
function part2(input) {
  return 0
}
