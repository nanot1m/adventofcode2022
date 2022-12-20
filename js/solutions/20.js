// @ts-check

import { range } from "../modules/itertools.js"
import { readLines } from "../modules/lib.js"

/**
 * @param {string} input
 * @returns {Array<() => any>}
 */
export function solve(input) {
  return [() => part1(input), () => part2(input)]
}

const example = `\
1
2
-3
3
-2
0
4
`

/**
 * @typedef {object} Node
 * @property {number} val
 * @property {Node} next
 * @property {Node} prev
 */

/**
 *
 * @param {number[]} nums
 */
function toLinkedList(nums) {
  /** @type {Node} */
  let cur = { val: nums[0], next: null, prev: null }
  const nodes = [cur]
  for (let i = 1; i < nums.length; i++) {
    /** @type {Node} */
    const next = { val: nums[i], next: null, prev: cur }
    cur.next = next
    cur = next
    nodes.push(cur)
  }
  cur.next = nodes[0]
  nodes[0].prev = cur

  return nodes
}

/**
 *
 * @param {Node} node
 * @returns
 */
function remove(node) {
  const prev = node.prev
  const next = node.next
  prev.next = next
  next.prev = prev
  return next
}

/**
 * @param {Node} node
 * @param {Node} afterNode
 */
function insertAfter(node, afterNode) {
  const next = afterNode.next
  afterNode.next = node
  node.prev = afterNode
  node.next = next
  next.prev = node
}

/**
 *
 * @param {Node} node
 * @param {number} steps
 * @returns {Node}
 */
function shift(node, steps) {
  const targetNode = move(node, steps)
  if (steps > 0) {
    remove(node)
    insertAfter(node, targetNode)
  } else if (steps < 0) {
    remove(node)
    insertAfter(node, targetNode.prev)
  }
  return node
}

/**
 *
 * @param {Node} node
 * @param {number} steps
 */
function move(node, steps) {
  if (steps > 0) {
    while (steps--) {
      node = node.next
    }
  } else if (steps < 0) {
    while (steps++) {
      node = node.prev
    }
  }
  return node
}

/**
 * @param {Node[]} nodes
 * @returns
 */
function mix(nodes) {
  for (const idx of range(nodes.length)) {
    shift(nodes[idx], nodes[idx].val % (nodes.length - 1))
  }
}

/**
 * @param {string} input
 */
function part1(input) {
  const nums = readLines(input.trim()).map(Number)
  const nodes = toLinkedList(nums)

  mix(nodes)

  const zero = nodes.find((x) => x.val === 0)
  const a = move(zero, 1000)
  const b = move(a, 1000)
  const c = move(b, 1000)

  return a.val + b.val + c.val
}

/**
 * @param {string} input
 */
function part2(input) {
  const nums = readLines(input.trim())
    .map(Number)
    .map((x) => x * 811589153)
  const nodes = toLinkedList(nums)

  for (const _ of range(10)) {
    mix(nodes)
  }

  const zero = nodes.find((x) => x.val === 0)
  const a = move(zero, 1000)
  const b = move(a, 1000)
  const c = move(b, 1000)

  return a.val + b.val + c.val
}
