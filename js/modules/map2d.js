// @ts-check

import * as V from "./vec.js"

/**
 * @typedef {Object} BfsPos
 * @property {V.Vec2} pos
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
 * @param {V.Vec2 | Iterable<V.Vec2>} start
 * @param {(pos: V.Vec2) => Iterable<V.Vec2>} getNeighbors
 *
 * @template T
 */
export function* bfs(map2d, canGoFromTo, start, getNeighbors) {
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

    for (const next of getNeighbors(current.pos)) {
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
 * @implements {Iterable<{pos: V.Vec2;value: T;}>}
 * @template T
 */
export class Map2d {
  /**
   * @param {R[][]} raw
   * @template R
   */
  static fromArray(raw) {
    const map = new Map2d()
    raw.forEach((row, y) => {
      row.forEach((value, x) => {
        map.set(V.vec(x, y), value)
      })
    })
    return map
  }

  /**
   *
   * @param {V.Vec2} pos
   * @returns {Iterable<V.Vec2>}
   */
  #getNeighbors = (pos) =>
    V.DIRS_4.map((dir) => V.add(pos, dir)).filter((pos) => this.has(pos))

  /**
   * @type {Map<number, Map<number, T>>}
   */
  #data = new Map()

  #minX = Infinity
  #minY = Infinity
  #maxX = -Infinity
  #maxY = -Infinity

  #needRecalculateBounds = false

  get bounds() {
    if (this.#needRecalculateBounds) {
      this.#updateBounds()
    }
    return {
      minX: this.#minX,
      minY: this.#minY,
      maxX: this.#maxX,
      maxY: this.#maxY,
      botRight: V.vec(this.#maxX, this.#maxY),
      topLeft: V.vec(this.#minX, this.#minY),
    }
  }

  get height() {
    return this.#maxY - this.#minY + 1
  }

  get width() {
    return this.#maxX - this.#minX + 1
  }

  /**
   * @param {Iterable<[V.Vec2, T]>} [data]
   */
  constructor(data = []) {
    for (const [pos, value] of data) {
      this.set(pos, value)
    }
  }

  #updateBounds() {
    this.#data.forEach((row, y) => {
      row.forEach((_, x) => {
        this.#extendBounds(x, y)
      })
    })
    this.#needRecalculateBounds = false
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  #extendBounds(x, y) {
    this.#minX = Math.min(this.#minX, x)
    this.#minY = Math.min(this.#minY, y)
    this.#maxX = Math.max(this.#maxX, x)
    this.#maxY = Math.max(this.#maxY, y)
  }

  /**
   * @param {V.Vec2} vec
   * @returns {T | undefined}
   */
  get([x, y]) {
    return this.#data.get(x)?.get(y)
  }

  /**
   * @param {V.Vec2} vec
   * @param {T} value
   * @returns {this}
   */
  set([x, y], value) {
    if (this.#data.has(x) === false) {
      this.#data.set(x, new Map())
    }
    this.#data.get(x).set(y, value)

    this.#extendBounds(x, y)
    return this
  }

  /**
   * @param {V.Vec2} vec
   */
  has([x, y]) {
    return this.#data.get(x)?.has(y) === true
  }

  /**
   * @param {(arg: T, pos: V.Vec2) => R} mapFn
   * @returns {Map2d<R>}
   *
   * @template R
   */
  map(mapFn) {
    const result = new Map2d()
    for (const { pos, value } of this) {
      result.set(pos, mapFn(value, pos))
    }
    return result
  }

  /**
   *
   * @param {(from: BfsPos<T>, to: BfsPos<T>) => boolean} canGoFromTo
   * @param {V.Vec2} start
   * @returns {Iterable<BfsPos<T>>}
   */
  bfs(canGoFromTo, start) {
    return bfs(this, canGoFromTo, start, this.#getNeighbors)
  }

  /**
   *
   * @param {(arg: V.Vec2) => Iterable<V.Vec2>} getNeighbors
   */
  setGetNeighbors(getNeighbors) {
    this.#getNeighbors = getNeighbors
    return this
  }

  [Symbol.iterator]() {
    return toIterable(this.#data)
  }

  /**
   * @param {Object} params
   * @param {V.Vec2} [params.topLeftPos]
   * @param {V.Vec2} [params.botRightPos]
   * @param {(arg: T | undefined) => J} params.valToString
   * @returns
   *
   * @template J
   */
  to2dArray({
    topLeftPos = V.vec(this.#minX, this.#minY),
    botRightPos = V.vec(this.#maxX, this.#maxY),
    valToString,
  }) {
    const [minX, minY] = topLeftPos
    const [maxX, maxY] = botRightPos
    const result = []
    for (let y = minY; y <= maxY; y++) {
      const row = []
      for (let x = minX; x <= maxX; x++) {
        const value = this.get([x, y])
        row.push(valToString(value))
      }
      result.push(row)
    }
    return result
  }

  /**
   * @param {Object} params
   * @param {V.Vec2} [params.topLeftPos]
   * @param {V.Vec2} [params.botRightPos]
   * @param {(arg: T | undefined) => string} [params.valToString]
   * @returns
   */
  toString({
    topLeftPos = V.vec(this.#minX, this.#minY),
    botRightPos = V.vec(this.#maxX, this.#maxY),
    valToString = (x) => (x ?? ".").toString(),
  } = {}) {
    return this.to2dArray({ topLeftPos, botRightPos, valToString })
      .map((row) => row.join(""))
      .join("\n")
  }
}

/**
 * @param {T[][]} raw
 * @returns {Map2d<T>}
 * @template T
 */
export function toMap2d(raw) {
  return Map2d.fromArray(raw)
}

/**
 * @param {string} input
 * @returns
 */
export function parseMap2d(input) {
  const raw = input.split("\n").map((line) => line.split(""))
  return Map2d.fromArray(raw)
}

/**
 * @param {Map<number, Map<number, T>>} map2d
 *
 * @template T
 */
function* toIterable(map2d) {
  for (const x of map2d.keys()) {
    for (const y of map2d.get(x).keys()) {
      yield { pos: V.vec(x, y), value: map2d.get(x).get(y) }
    }
  }
}
