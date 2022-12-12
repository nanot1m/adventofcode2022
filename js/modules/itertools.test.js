// @ts-check
import { deepStrictEqual } from "assert"

import { it } from "./itertools.js"

function testSkipLast() {
  deepStrictEqual(
    it([1, 2, 3, 4, 5]).skipLast().toArray(),
    [1, 2, 3, 4],
    "Expected `skipLast` to skip last element when n is not specified",
  )

  deepStrictEqual(
    it([1, 2, 3, 4, 5]).skipLast(2).toArray(),
    [1, 2, 3],
    "Expected `skipLast` to skips last two elements when n is 2",
  )

  deepStrictEqual(
    it([1, 2, 3, 4, 5]).skipLast(0).toArray(),
    [1, 2, 3, 4, 5],
    "Expected `skipLast` to doesn't skip any elements when n is 0",
  )

  deepStrictEqual(
    it([1, 2, 3]).skipLast(5).toArray(),
    [],
    "Expected `skipLast` to skips all elements when n is greater than the length of the iterable",
  )
}

testSkipLast()
