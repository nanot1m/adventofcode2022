// @ts-check

import { add, mul } from "./lib.js"
import * as V from "./vec.js"

/**
 * @param {number} [start]
 * @param {number} [end]
 * @param {number} [step]
 */
export function* range(start, end, step = 1) {
  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = start
    start = 0
  }
  if (step === undefined) {
    step = 1
  }
  for (let i = start; i < end; i += step) {
    yield i
  }
}

/**
 * @param {Iterable<T>} iterable
 * @param {number} n
 *
 * @template T
 */
export function* skip(iterable, n) {
  for (const x of iterable) {
    if (n === 0) {
      yield x
    } else {
      n -= 1
    }
  }
}

/**
 * @param {Iterable<T>} iterable
 * @param {number} n
 *
 * @template T
 */
export function* take(iterable, n) {
  for (const x of iterable) {
    if (n === 0) {
      return
    }
    yield x
    n -= 1
  }
}

/**
 * @param {Iterable<T>} iterable
 *
 * @template T
 */
export function first(iterable) {
  for (const x of iterable) {
    return x
  }
}

/**
 * @param {Iterable<T>} iterable
 *
 * @template T
 */
export function last(iterable) {
  let last
  for (const x of iterable) {
    last = x
  }
  return last
}

/**
 * @param {Iterable<T>} iterable
 * @param {(arg0: R, arg1: T, index: number) => R} reducer
 * @param {R} initial
 *
 * @template T
 * @template R
 */
export function reduce(iterable, reducer, initial) {
  let acc = initial
  let idx = 0
  for (const x of iterable) {
    acc = reducer(acc, x, idx++)
  }
  return acc
}

/**
 *
 * @param {T} x
 * @param {(arg: T) => T} f
 *
 * @template T
 */
export function* iterate(x, f) {
  yield x
  while (true) {
    x = f(x)
    yield x
  }
}

/**
 *
 * @param {Iterable<T>} iterable
 * @param {(arg: T, index: number) => R} f
 *
 * @template T
 * @template R
 */
export function* map(iterable, f) {
  let index = 0
  for (const x of iterable) {
    yield f(x, index)
    index += 1
  }
}

/**
 *
 * @param {Iterable<T>} iterable
 * @param {number} n
 *
 * @template T
 */
export function* groupsOf(iterable, n) {
  let group = []
  for (const x of iterable) {
    group.push(x)
    if (group.length === n) {
      yield group
      group = []
    }
  }
  if (group.length > 0) {
    yield group
  }
}

/**
 * @param {Iterable<T>} iterable
 *
 * @template T
 */
export function toArray(iterable) {
  return Array.from(iterable)
}

/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {T | undefined}
 * @template T
 */
export function find(iterable, predicate) {
  for (const x of iterable) {
    if (predicate(x)) {
      return x
    }
  }
}

/**
 * @param {Iterable<number>} xs
 * @returns
 */
export function sum(xs) {
  return reduce(xs, add, 0)
}

/**
 * @param {Iterable<number>} xs
 * @returns
 */
export function multiply(xs) {
  return reduce(xs, mul, 1)
}

/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {Iterable<T>}
 * @template T
 */
export function* filter(iterable, predicate) {
  for (const x of iterable) {
    if (predicate(x)) {
      yield x
    }
  }
}

/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} [predicate]
 * @returns {number}
 * @template T
 */
export function count(iterable, predicate = () => true) {
  let count = 0
  for (const x of iterable) {
    if (predicate(x)) {
      count += 1
    }
  }
  return count
}

/**
 *
 * @param {Iterable<T>} iterableA
 * @param {Iterable<U>} iterableB
 * @returns {Iterable<[T, U]>}
 *
 * @template T, U
 */
export function* zip(iterableA, iterableB) {
  const iterA = iterableA[Symbol.iterator]()
  const iterB = iterableB[Symbol.iterator]()
  while (true) {
    const { value: a, done: doneA } = iterA.next()
    const { value: b, done: doneB } = iterB.next()
    if (doneA || doneB) {
      return
    }
    yield [a, b]
  }
}

/**
 *
 * @param {Iterable<T>} iterable
 * @returns {Iterable<[number, T]>}
 *
 * @template T
 */
export function indexed(iterable) {
  return zip(range(Infinity), iterable)
}

/**
 *
 * @param {Iterable<T>} iterable
 * @param {number} n
 * @returns {Iterable<T[]>}
 *
 * @template T
 */
export function* windowed(iterable, n) {
  const buffer = []
  for (const x of iterable) {
    buffer.push(x)
    if (buffer.length === n) {
      yield buffer
      buffer.shift()
    }
  }
}

/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {number}
 * @template T
 */
export function findIndex(iterable, predicate) {
  let i = 0
  for (const x of iterable) {
    if (predicate(x)) {
      return i
    }
    i++
  }
  return -1
}

/**
 *
 * @param {Iterable<T>} iterable
 * @param {T} value
 * @returns {number}
 *
 * @template T
 */
export function indexOf(iterable, value) {
  return findIndex(iterable, (x) => x === value)
}

/**
 *
 * @param {Iterable<T>} iterable
 * @param {(arg: T) => Iterable<R>} f
 * @returns {Iterable<R>}
 *
 * @template T, R
 */
export function* flatMap(iterable, f) {
  for (const x of iterable) {
    yield* f(x)
  }
}

/**
 * @param {Iterable<T>} iterable
 * @param {number} [n]
 * @returns {Iterable<T>}
 *
 * @template T
 */
export function* skipLast(iterable, n = 1) {
  if (n <= 0) {
    yield* iterable
    return
  }

  const buffer = Array(n)
  let i = 0
  for (const x of iterable) {
    if (i >= n) {
      yield buffer[i % n]
    }
    buffer[i % n] = x
    i++
  }
}

/**
 *
 * @param {Iterable<T>} iterable
 * @param {number} every
 * @param {number} [skipInitial]
 * @returns {Iterable<T>}
 *
 * @template T
 */
export function* takeEvery(iterable, every, skipInitial = 0) {
  if (every <= 0) {
    return
  }
  if (skipInitial < 0) {
    skipInitial = 0
  }

  for (const x of iterable) {
    if (skipInitial === 0) {
      yield x
      skipInitial = every
    }
    skipInitial--
  }
}

/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {Iterable<T>}
 * @template T
 */
export function* takeWhile(iterable, predicate) {
  for (const x of iterable) {
    if (!predicate(x)) {
      return
    }
    yield x
  }
}

/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {Iterable<T>}
 * @template T
 */
export function* takeUntil(iterable, predicate) {
  for (const x of iterable) {
    if (predicate(x)) {
      return
    }
    yield x
  }
}

/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {boolean}
 * @template T
 */
export function every(iterable, predicate) {
  for (const x of iterable) {
    if (!predicate(x)) {
      return false
    }
  }
  return true
}

/**
 *
 * @param {Iterable<T>} iterable
 * @param {number} index
 * @param {(arg: T) => T} fn
 *
 * @template T
 */
export function* updateAt(iterable, index, fn) {
  let i = 0
  for (const x of iterable) {
    if (i === index) {
      yield fn(x)
    } else {
      yield x
    }
    i++
  }
}

/**
 *
 * @param {Iterable<T>} iterable
 * @param  {T[]} values
 *
 * @template T
 */
export function* unshift(iterable, ...values) {
  yield* values
  yield* iterable
}

/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => boolean} predicate
 * @returns {Iterable<T>}
 * @template T
 */
export function* skipAfter(iterable, predicate) {
  for (const x of iterable) {
    yield x
    if (predicate(x)) {
      return
    }
  }
}

/**
 * @param {Iterable<T>} iterable
 * @param {(arg: T) => any} [mapFn]
 * @returns {Iterable<T>}
 *
 * @template T
 */
export function* distinct(iterable, mapFn = (x) => x) {
  const set = new Set()
  for (const x of iterable) {
    const key = mapFn(x)
    if (!set.has(key)) {
      set.add(key)
      yield x
    }
  }
}

/**
 * @typedef {Iterable<T> & {
 *    map: <R>(fn: (arg: T, index: number) => R) => FluentIterable<R>
 *    groupsOf: (n: number) => FluentIterable<T[]>
 *    toArray: () => T[]
 *    first: () => T | undefined
 *    last: () => T | undefined
 *    find: (predicate: (arg: T) => boolean) => T | undefined
 *    skip: (n: number) => FluentIterable<T>
 *    take: (n: number) => FluentIterable<T>
 *    toSet: () => Set<T>
 *    reduce: <R>(reducer: (arg0: R, arg1: T, index: number) => R, init: R) => R
 *    forEach: (fn: (arg: T) => void) => void
 *    count: (predicate?: (arg: T) => boolean) => number
 *    filter: (predicate: (arg: T) => boolean) => FluentIterable<T>
 *    indexed: () => FluentIterable<[number, T]>
 *    windowed: (n: number) => FluentIterable<T[]>
 *    findIndex: (predicate: (arg: T) => boolean) => number
 *    indexOf : (value: T) => number
 *    flatMap: <R>(f: (arg: T) => Iterable<R>) => FluentIterable<R>
 *    skipLast: (n?: number) => FluentIterable<T>
 *    takeEvery: (every: number, skipInitial?: number) => FluentIterable<T>
 *    takeWhile: (predicate: (arg: T) => boolean) => FluentIterable<T>
 *    takeUntil: (predicate: (arg: T) => boolean) => FluentIterable<T>
 *    every: (predicate: (arg: T) => boolean) => boolean
 *    updateAt: (index: number, fn: (arg: T) => T) => FluentIterable<T>
 *    unshift: (...values: T[]) => FluentIterable<T>
 *    skipAfter: (predicate: (arg: T) => boolean) => FluentIterable<T>
 *    distinct: (mapFn?: (arg: T) => any) => FluentIterable<T>
 * }} GenericFluentIterable<T>
 *
 *
 * @template T
 */

/**
 * @typedef {GenericFluentIterable<string> & {
 *    join: (separator?: string) => string
 * }} StrFluentIterable
 */

/**
 * @typedef {GenericFluentIterable<number> & {
 *    sum: () => number
 *    multiply: () => number
 *    min: () => number
 *    max: () => number
 * }} NumFluentIterable
 */

/**
 * @typedef {T extends number
 *    ? NumFluentIterable
 *    : T extends boolean
 *    ? GenericFluentIterable<boolean>
 *    : T extends string
 *    ? StrFluentIterable
 *    : T extends infer U ? GenericFluentIterable<U> : never} FluentIterable
 * @template T
 */

/**
 *
 * @param {Iterable<T>} iterable
 * @returns {FluentIterable<T>}
 * @template T
 */
export const it = (iterable) => {
  /**
   * @type {FluentIterable<any>}
   */
  const returnValue = {
    //#region GenericFluentIterable methods
    [Symbol.iterator]: () => iterable[Symbol.iterator](),
    /** @type {<R>(fn: (arg: T, index: number) => R) => FluentIterable<R>} */
    map: (fn) => it(map(iterable, fn)),
    groupsOf: (n) => it(groupsOf(iterable, n)),
    toArray: () => toArray(iterable),
    first: () => first(iterable),
    last: () => last(iterable),
    find: (/** @type {(value: T) => boolean} */ predicate) =>
      find(iterable, predicate),
    skip: (n) => it(skip(iterable, n)),
    take: (n) => it(take(iterable, n)),
    toSet: () => new Set(iterable),
    /** @type {<R>(reducer: (arg0: R, arg1: T, index: number) => R, init: R) => R} */
    reduce: (reducer, initial) => reduce(iterable, reducer, initial),
    /** @type {(fn: (arg: T) => void) => void} */
    forEach: (fn) => {
      for (const x of iterable) {
        fn(x)
      }
    },
    filter: (/** @type {(arg: T) => boolean} */ predicate) =>
      it(filter(iterable, predicate)),
    count: (/** @type {((arg: T) => boolean) | undefined} */ predicate) =>
      count(iterable, predicate),
    indexed: () => it(indexed(iterable)),
    windowed: (n) => it(windowed(iterable, n)),
    findIndex: (/** @type {(arg: T) => boolean} */ predicate) =>
      findIndex(iterable, predicate),
    indexOf: (/** @type {T} */ value) => indexOf(iterable, value),
    /** @type {<R>(f: (arg: T) => Iterable<R>) => FluentIterable<R>} */
    flatMap: (f) => it(flatMap(iterable, f)),
    skipLast: (n) => it(skipLast(iterable, n)),
    takeEvery: (every, skipInitial) =>
      it(takeEvery(iterable, every, skipInitial)),
    takeWhile: (/** @type {(arg: T) => boolean} */ predicate) =>
      it(takeWhile(iterable, predicate)),
    takeUntil: (/** @type {(arg: T) => boolean} */ predicate) =>
      it(takeUntil(iterable, predicate)),
    every: (/** @type {(arg: T) => boolean} */ predicate) =>
      every(iterable, predicate),
    updateAt: (/** @type {number} */ index, /** @type {(arg: T) => T} */ fn) =>
      it(updateAt(iterable, index, fn)),
    unshift: (/** @type {T[]} */ ...values) => it(unshift(iterable, ...values)),
    skipAfter: (/** @type {(arg: T) => boolean} */ predicate) =>
      it(skipAfter(iterable, predicate)),
    distinct: (/** @type {(arg: T) => any} */ mapFn) =>
      it(distinct(iterable, mapFn)),
    //#endregion

    //#region NumFluentIterable methods
    multiply: () => multiply(/** @type {Iterable<number>} */ (iterable)),
    sum: () => sum(/** @type {Iterable<number>} */ (iterable)),
    min: () =>
      /** @type {NumFluentIterable} */ (returnValue).reduce(Math.min, Infinity),
    max: () =>
      /** @type {NumFluentIterable} */ (returnValue).reduce(
        Math.max,
        -Infinity,
      ),
    //#endregion

    //#region StrFluentIterable methods
    join: (separator = ",") => toArray(iterable).join(separator),
    //#endregion
  }
  return /** @type {FluentIterable<T>} */ (returnValue)
}
