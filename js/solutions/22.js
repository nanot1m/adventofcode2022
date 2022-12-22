// @ts-check

import { V } from "../modules/index.js"
import { it, range } from "../modules/itertools.js"
import { readBlocks, readLines } from "../modules/lib.js"
import { Map2d } from "../modules/map2d.js"
import { asDir, DIR_TO_VEC } from "../modules/vec.js"

/** @type {import('../modules/types.js').SolutionModuleValid<typeof import('./22.js')>} */
const __MODULE_VALID__ = true

export const useExample = false

export const exampleInput = `\
        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = (/** @type {string} */ input) => {
  const [mapStr, movesStr] = readBlocks(input)
  const lines = readLines(mapStr)

  let sideSize = Infinity
  for (const line of lines) {
    const trimmed = line.trim()
    const width = line.length - trimmed.length
    if (width === 0) continue
    sideSize = Math.min(sideSize, width)
  }

  /** @type {Map2d<string>} */
  const map = new Map2d()
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] !== " ") {
        map.set(V.vec(x, y), lines[y][x])
      }
    }
  }

  const start = it(map)
    .filter((x) => x.value === ".")
    .toArray()
    .sort((a, b) => a.pos[1] - b.pos[1] || a.pos[0] - b.pos[0])[0].pos

  /** @type {string[]} */
  const moves = []
  let cur = ""
  for (let c of movesStr) {
    if (c === "L" || c === "R") {
      if (cur) moves.push(cur, c)
      cur = ""
    } else {
      cur += c
    }
  }
  moves.push(cur)

  return {
    map,
    start,
    moves,
    sideSize,
  }
}

/**
 *
 * @param {Map2d<string>} map
 */
function getConnectionsOnPlane(map) {
  /** @type {Map2d<Record<V.Dir, V.Vec2>>} */
  const connections = new Map2d()

  for (const { pos } of map) {
    const connection = /** @type {Record<V.Dir, V.Vec2>} */ ({})
    const up = map.get(V.add(pos, DIR_TO_VEC.U))

    if (up == null) {
      const nextPos = it(map)
        .filter((x) => V.x(x.pos) === V.x(pos))
        .toArray()
        .sort((a, b) => V.y(a.pos) - V.y(b.pos))[0]
      connection.U = nextPos.pos
    }

    const down = map.get(V.add(pos, DIR_TO_VEC.D))
    if (down == null) {
      const nextPos = it(map)
        .filter((x) => V.x(x.pos) === V.x(pos))
        .toArray()
        .sort((a, b) => V.y(b.pos) - V.y(a.pos))[0]
      connection.D = nextPos.pos
    }

    const left = map.get(V.add(pos, DIR_TO_VEC.L))
    if (left == null) {
      const nextPos = it(map)
        .filter((x) => V.y(x.pos) === V.y(pos))
        .toArray()
        .sort((a, b) => V.x(b.pos) - V.x(a.pos))[0]
      connection.L = nextPos.pos
    }

    const right = map.get(V.add(pos, DIR_TO_VEC.R))
    if (right == null) {
      const nextPos = it(map)
        .filter((x) => V.y(x.pos) === V.y(pos))
        .toArray()
        .sort((a, b) => V.x(a.pos) - V.x(b.pos))[0]
      connection.R = nextPos.pos
    }

    connections.set(pos, connection)
  }
  return connections
}

const DIRS = [asDir("D"), asDir("R"), asDir("U"), asDir("L")]

const scores = {
  [asDir("R")]: 0,
  [asDir("D")]: 1,
  [asDir("L")]: 2,
  [asDir("U")]: 3,
}

/**
 *
 * @param {Map2d<string>} map
 * @param {string[]} moves
 * @param {Map2d<Record<V.Dir, V.Vec2>>} connections
 * @param {V.Vec2} start
 * @param {number} sideSize
 */
export function* traverseMap(
  map,
  moves,
  connections,
  start,
  sideSize,
  onCube = false,
) {
  let pos = start
  let dirIdx = 1
  const visited = new Map2d()

  /**
   * @param {V.Vec2} pos
   * @param {V.Dir} dir
   */
  function stepFromPosInDir(pos, dir) {
    let nextPos = V.add(pos, DIR_TO_VEC[dir])
    const value = map.get(nextPos)
    if (value === ".") {
      pos = nextPos
      visited.set(pos, dir)
      return { pos, ok: true, dir }
    }
    if (value === "#") {
      return { pos, ok: false, dir }
    }
    const connection = connections.get(pos)
    if (connection == null) {
      throw new Error("no connection at pos " + pos.join(",") + " dir " + dir)
    }
    if (connection[dir] == null) {
      throw new Error(
        "Connection at pos " + pos.join(",") + " dir " + dir + " is null",
      )
    }
    if (map.get(connection[dir]) === "#") {
      return { pos, ok: false, dir }
    }
    nextPos = connection[dir]
    if (onCube) {
      dir = adjustDirectionAfterPlainSwitch(dir, pos, sideSize)
    }
    visited.set(pos, dir)
    return { pos: nextPos, ok: true, dir }
  }

  /**
   *
   * @param {V.Dir} prevDir
   * @param {V.Vec2} prevPos
   * @param {V.Dir} nextDir
   * @param {V.Vec2} nextPos
   */
  function assertPlaneSwitch(prevDir, prevPos, nextDir, nextPos) {
    /** @type {Partial<Record<V.Dir, V.Dir>>} */
    const counterDirs = { U: "D", D: "U", L: "R", R: "L" }
    const result = stepFromPosInDir(nextPos, counterDirs[nextDir])
    if (!result.ok) {
      throw new Error("Plane switch failed. Expected to go back to " + nextPos)
    }
    if (result.pos.join(",") !== prevPos.join(",")) {
      throw new Error(
        `Plane switch from ${prevDir} at ${prevPos.join(
          ",",
        )} to ${nextDir} at ${nextPos.join(
          ",",
        )} failed. Expected to go back to ${prevPos.join(
          ",",
        )} but got ${result.pos.join(",")}`,
      )
    }
  }

  for (const move of moves) {
    const num = Number(move)
    if (isNaN(num)) {
      dirIdx += move === "L" ? -1 : 1
      dirIdx = (dirIdx + 4) % 4
      yield {
        pos,
        dir: DIRS[dirIdx],
        visited,
        move,
      }
      continue
    }

    let dir = DIRS[dirIdx]
    for (let i = 0; i < num; i++) {
      const result = stepFromPosInDir(pos, dir)
      if (!result.ok) {
        break
      }
      assertPlaneSwitch(dir, pos, result.dir, result.pos)
      pos = result.pos
      dir = result.dir
      dirIdx = DIRS.indexOf(dir)
      yield {
        pos,
        dir,
        visited,
        move,
      }
    }
  }
}

/**
 * @param {V.Dir} dir
 * @param {V.Vec2} pos
 * @param {number} sideSize
 * @returns
 */
function adjustDirectionAfterPlainSwitch(dir, pos, sideSize) {
  switch (dir) {
    case "L": {
      if (V.x(pos) === sideSize && V.y(pos) < sideSize) {
        return "R" // from face 1 left to face 5, continue to move right
      } else if (V.x(pos) === sideSize) {
        return "U" // from face 3 left to face 5, continue to move up
      } else if (V.x(pos) === 0 && V.y(pos) < sideSize * 3) {
        return "R" // from face 5 left to face 1, continue to move right
      } else if (V.x(pos) === 0) {
        return "U" // from face 6 left to face 1, continue to move up
      }
    }

    case "U": {
      if (V.y(pos) === sideSize * 3 - 1) {
        return "L" // from face 4 up to face 6, continue to move left
      } else if (V.y(pos) === sideSize - 1) {
        return "L" // from face 2 up to face 3, continue to move left
      } else if (V.y(pos) === sideSize * 4 - 1) {
        return "U" // from face 6 up to face 2, continue to move up
      }
    }

    case "D": {
      if (V.y(pos) === 0 && V.x(pos) < sideSize * 2) {
        return "R" // from face 1 down to face 6, continue to move right
      } else if (V.y(pos) === 0) {
        return "D" // from face 2 down to face 6, continue to move down
      } else if (V.y(pos) === sideSize * 2) {
        return "R" // from face 5 down to face 3, continue to move right
      }
    }

    case "R": {
      if (V.x(pos) === sideSize * 3 - 1) {
        return "L" // from face 2 right to face 4, continue to move left
      } else if (V.x(pos) === sideSize * 2 - 1 && V.y(pos) < sideSize * 2) {
        return "D" // from face 3 right to face 2, continue to move down
      } else if (V.x(pos) === sideSize * 2 - 1) {
        return "L" // from face 4 right to face 2, continue to move left
      } else if (V.x(pos) === sideSize - 1) {
        return "D" // from face 6 right to face 4, continue to move down
      }
    }
  }

  return dir
}

/**
 * @param {InputType} input
 */
export function part1({ map, moves, start, sideSize }) {
  const connections = getConnectionsOnPlane(map)
  let { pos, dir } = it(
    traverseMap(map, moves, connections, start, sideSize),
  ).last()
  pos = V.add(pos, V.vec(1, 1))
  return V.y(pos) * 1000 + V.x(pos) * 4 + scores[dir]
}

/**
 * @param {number} sideSize
 */
export function getConnectionsOnCube(sideSize) {
  /** @type {Map2d<Record<V.Dir, V.Vec2>>} */
  const connections = new Map2d()

  // face 1 top
  // face 6 left
  for (const d of range(sideSize)) {
    const pos1 = V.vec(sideSize + d, 0)
    const connection1 =
      connections.get(pos1) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    const pos6 = V.vec(0, sideSize * 3 + d)
    const connection6 =
      connections.get(pos6) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    connection1.D = pos6
    connection6.L = pos1
    connections.set(pos1, connection1)
    connections.set(pos6, connection6)
  }

  // face 2 top
  // face 6 bottom
  for (const d of range(sideSize)) {
    const pos2 = V.vec(sideSize * 2 + d, 0)
    const connection2 =
      connections.get(pos2) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    const pos6 = V.vec(d, sideSize * 4 - 1)
    const connection6 =
      connections.get(pos6) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    connection2.D = pos6
    connection6.U = pos2
    connections.set(pos2, connection2)
    connections.set(pos6, connection6)
  }

  // face 2 right
  // face 4 right
  for (const d of range(sideSize)) {
    const pos2 = V.vec(sideSize * 3 - 1, d)
    const connection2 =
      connections.get(pos2) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    const pos4 = V.vec(sideSize * 2 - 1, sideSize * 3 - d - 1)
    const connection4 =
      connections.get(pos4) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    connection2.R = pos4
    connection4.R = pos2
    connections.set(pos2, connection2)
    connections.set(pos4, connection4)
  }

  // face 2 bottom
  // face 3 right
  for (const d of range(sideSize)) {
    const pos2 = V.vec(sideSize * 2 + d, sideSize - 1)
    const connection2 =
      connections.get(pos2) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    const pos3 = V.vec(sideSize * 2 - 1, sideSize + d)
    const connection3 =
      connections.get(pos3) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    connection2.U = pos3
    connection3.R = pos2
    connections.set(pos2, connection2)
    connections.set(pos3, connection3)
  }

  // face 4 bottom
  // face 6 right
  for (const d of range(sideSize)) {
    const pos4 = V.vec(sideSize + d, sideSize * 3 - 1)
    const pos6 = V.vec(sideSize - 1, sideSize * 3 + d)
    const connection4 =
      connections.get(pos4) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    const connection6 =
      connections.get(pos6) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    connection4.U = pos6
    connection6.R = pos4
    connections.set(pos4, connection4)
    connections.set(pos6, connection6)
  }

  // face 5 left
  // face 1 left
  for (const d of range(sideSize)) {
    const pos5 = V.vec(0, sideSize * 2 + d)
    const pos1 = V.vec(sideSize, sideSize - d - 1)
    const connection5 =
      connections.get(pos5) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    const connection1 =
      connections.get(pos1) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    connection5.L = pos1
    connection1.L = pos5
    connections.set(pos5, connection5)
    connections.set(pos1, connection1)
  }

  // face 5 top
  // face 3 left
  for (const d of range(sideSize)) {
    const pos5 = V.vec(d, sideSize * 2)
    const pos3 = V.vec(sideSize, sideSize + d)
    const connection5 =
      connections.get(pos5) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    const connection3 =
      connections.get(pos3) ?? /** @type {Record<V.Dir, V.Vec2>} */ ({})
    connection5.D = pos3
    connection3.L = pos5
    connections.set(pos5, connection5)
    connections.set(pos3, connection3)
  }

  return connections
}

/**
 * @param {InputType} input
 */
export function part2({ map, moves, start, sideSize }) {
  const connections = getConnectionsOnCube(sideSize)
  let { pos, dir } = it(
    traverseMap(map, moves, connections, start, sideSize, true),
  ).last()

  pos = V.add(pos, V.vec(1, 1))
  return V.y(pos) * 1000 + V.x(pos) * 4 + scores[dir]
}
