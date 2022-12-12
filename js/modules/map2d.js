// @ts-check

import * as V from "./vec.js"

/**
 * @typedef {Object} BfsPos
 * @property {V.Vec2d} pos
 * @property {number} distance
 * @property {T} value
 * @property {BfsPos<T>} [parent]
 *
 * @template T
 */

/**
 *
 * @param {Map2d<T>} map2d
 * @param {(from: BfsPos<T>, to: BfsPos<T>) => boolean} canGoFromTo
 * @param {V.Vec2d | Iterable<V.Vec2d>} start
 *
 * @template T
 */
export function* bfs(map2d, canGoFromTo, start) {
  /** @type {BfsPos<T>[]} */
  const queue = []

  if (V.isVec(start)) {
    queue.push({
      distance: 0,
      pos: start,
      value: map2d.get(start),
      parent: null,
    })
  } else {
    for (const pos of start) {
      queue.push({
        distance: 0,
        pos: pos,
        value: map2d.get(pos),
        parent: null,
      })
    }
  }

  const visited = new Set()

  while (queue.length) {
    const current = queue.shift()
    const key = current.pos.join()
    if (visited.has(key)) continue
    visited.add(key)

    yield current

    for (const next of V.DIRS.map((dir) => V.add(current.pos, dir))) {
      if (
        next[0] < 0 ||
        next[1] < 0 ||
        next[0] >= map2d.width ||
        next[1] >= map2d.height
      ) {
        continue
      }

      const nextBfs = {
        distance: current.distance + 1,
        pos: next,
        value: map2d.get(next),
        parent: current,
      }

      if (canGoFromTo(current, nextBfs)) {
        queue.push(nextBfs)
      }
    }
  }
}

/**
 * @typedef {Iterable<{pos: V.Vec2d;value: T;}> & {
 *    readonly height: number,
 *    readonly width: number,
 *    get: (vec: V.Vec2d) => T,
 *    set: (vec: V.Vec2d, value: T) => Map2d<T>,
 *    map: <R>(mapFn: (arg0: T, arg1: V.Vec2d) => R) => Map2d<R>,
 *    bfs: (canGo: (from: BfsPos<T>, to: BfsPos<T>) => boolean, start: V.Vec2d | Iterable<V.Vec2d>) => Iterable<BfsPos<T>>,
 * }} Map2d
 *
 * @template T
 */

/**
 * @param {T[][]} raw
 * @returns {Map2d<T>}
 * @template T
 */
export function toMap2d(raw) {
  /** @type {Map2d<T>} */
  const map = {
    get height() {
      return raw.length
    },
    get width() {
      return raw[0].length
    },
    get(vec) {
      return raw[vec[1]][vec[0]]
    },
    set(vec, value) {
      raw[vec[1]][vec[0]] = value
      return map
    },
    map(mapFn) {
      const next = raw.map((row, y) =>
        row.map((value, x) => mapFn(value, V.vec(x, y))),
      )
      return toMap2d(next)
    },
    bfs(canGo, start) {
      return bfs(map, canGo, start)
    },
    [Symbol.iterator]() {
      return toIterable(raw)
    },
  }
  return map
}

/**
 * @param {string} input
 * @returns
 */
export function parseMap2d(input) {
  const raw = input.split("\n").map((line) => line.split(""))
  return toMap2d(raw)
}

/**
 * @param {T[][]} map2d
 *
 * @template T
 */
export function* toIterable(map2d) {
  for (let y = 0; y < map2d.length; y++) {
    for (let x = 0; x < map2d[y].length; x++) {
      yield { pos: V.vec(x, y), value: map2d[y][x] }
    }
  }
}
