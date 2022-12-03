// @ts-check

import { add } from "./lib.js"

/**
 * @param {number} start
 * @param {number} end
 * @param {number} step
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
