// @ts-check

import { add } from "./lib.js"

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
 * @param {(arg0: R, arg1: T) => R} reducer
 * @param {R} initial
 *
 * @template T
 * @template R
 */
export function* reduce(iterable, reducer, initial) {
  let acc = initial
  for (const x of iterable) {
    acc = reducer(acc, x)
    yield acc
  }
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
 * @param {(arg: T) => R} f
 *
 * @template T
 * @template R
 */
export function* map(iterable, f) {
  for (const x of iterable) {
    yield f(x)
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
  return last(reduce(xs, add, 0))
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
 * @typedef {Object} GenericIt<T>
 *
 * @property {() => Iterable<T>} getIterable
 * @property {<R>(fn: (arg: T) => R) => It<R>} map
 * @property {(n: number) => It<T[]>} groupsOf
 * @property {() => T[]} toArray
 * @property {() => T | undefined} first
 * @property {() => T | undefined} last
 * @property {(predicate: (arg: T) => boolean) => T | undefined} find
 * @property {(n: number) => It<T>} skip
 * @property {(n: number) => It<T>} take
 * @property {() => Set<T>} toSet
 * @property {<R>(reducer: (arg0: R, arg1: T) => R, init: R) => It<R>} reduce
 * @property {(fn: (arg: T) => void) => void} forEach
 * @property {(predicate?: (arg: T) => boolean) => number} count
 * @property {(predicate: (arg: T) => boolean) => It<T>} filter
 * @property {() => It<[number, T]>} indexed
 *
 * @template T
 */

/**
 * @typedef {GenericIt<number> & {
 *    sum: () => number
 *    min: () => number
 *    max: () => number
 * }} NumIt
 */

/**
 * @typedef {T extends number ? NumIt : GenericIt<T>} It
 * @template T
 */

/**
 *
 * @param {Iterable<T>} iterable
 * @returns {It<T>}
 * @template T
 */
export const it = (iterable) => {
  /**
   * @type {It<any>}
   */
  const returnValue = {
    //#region GenericIt methods
    getIterable: () => iterable,
    /** @type {<R>(fn: (arg: T) => R) => It<R>} */
    map: (fn) => it(map(iterable, fn)),
    groupsOf: (n) => it(groupsOf(iterable, n)),
    toArray: () => toArray(iterable),
    first: () => first(iterable),
    last: () => last(iterable),
    /** @type {(predicate: (arg: T) => boolean) => T} */
    find: (predicate) => find(iterable, predicate),
    skip: (n) => it(skip(iterable, n)),
    take: (n) => it(take(iterable, n)),
    toSet: () => new Set(iterable),
    /** @type {<R>(reducer: (arg0: R, arg1: T) => R, init: R) => It<R>} */
    reduce: (reducer, initial) => it(reduce(iterable, reducer, initial)),
    /** @type {(fn: (arg: T) => void) => void} */
    forEach: (fn) => {
      for (const x of iterable) {
        fn(x)
      }
    },
    filter: (/** @type {(arg: T) => boolean} */ predicate) =>
      it(filter(iterable, predicate)),
    count: (/** @type {(arg: T) => boolean} */ predicate) =>
      count(iterable, predicate),
    indexed: () => it(indexed(iterable)),
    //#endregion

    //#region NumIt methods
    sum: () => sum(/** @type {Iterable<number>} */ (iterable)),
    min: () =>
      /** @type {NumIt} */ (returnValue).reduce(Math.min, Infinity).last(),
    max: () =>
      /** @type {NumIt} */ (returnValue).reduce(Math.max, -Infinity).last(),
    //#endregion
  }
  return /** @type {It<T>} */ (returnValue)
}
