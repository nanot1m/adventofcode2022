// @ts-check

import { $ } from "./itertools.js"
import { readLines } from "./lib.js"
import { solution } from "./solution.js"

/**
 * @typedef {object} Dir
 * @property {string} name
 * @property {Dir | null} parent
 * @property {Node[]} children
 */

/**
 * @typedef {object} File
 * @property {string} name
 * @property {number} size
 */

/**
 * @typedef {Dir | File} Node
 */

solution({
  solve(input) {
    return [() => part1(input), () => part2(input)]
  },
})

/**
 * @param {string} input
 */
function parseInput(input) {
  const lines = readLines(input.trim())

  /** @type {Dir} */
  const fs = { name: "/", parent: null, children: [] }

  /** @type {Dir} */
  let currentDir = null

  /**
   * @param {string} name
   */
  function cd(name) {
    if (name === "/") {
      currentDir = fs
      return
    }

    if (name === "..") {
      if (currentDir == null) {
        throw new Error("Cannot go up from root")
      }
      currentDir = currentDir.parent
      return
    }

    if (currentDir == null) {
      throw new Error("Current dir is not set")
    }
    const dir = currentDir.children.find((x) => x.name === name)
    if (dir == null) {
      throw new Error(`Cannot find dir ${name}`)
    }
    if (!("children" in dir)) {
      throw new Error("Expected dir, got file")
    }
    currentDir = dir
  }

  for (const line of lines) {
    if (line.startsWith("$ cd")) {
      cd(line.split(" ")[2])
      continue
    }

    if (line.startsWith("$ ls")) {
      continue
    }

    if (line.startsWith("dir")) {
      const name = line.split(" ")[1]
      const dir = { name, parent: currentDir, children: [] }
      currentDir.children.push(dir)
    } else {
      const [sizeStr, name] = line.split(" ")
      const size = Number(sizeStr)
      const file = { name, size }
      currentDir.children.push(file)
    }
  }

  return fs
}

/**
 * @param {Dir} dir
 * @returns {Record<string, number>}
 */
function getDirSizes(dir) {
  /** @type {Record<string, number>} */
  const dirSizes = {}

  /**
   * @param {Dir} dir
   * @returns
   */
  function dirSize(dir, path = "") {
    const key = dir.name === "/" ? dir.name : path + dir.name + "/"
    if (dirSizes[key] != null) {
      return dirSizes[key]
    }

    let size = 0
    for (const child of dir.children) {
      if ("children" in child) {
        size += dirSize(child, key)
      } else {
        size += child.size
      }
    }

    dirSizes[key] = size
    return size
  }

  dirSize(dir)

  return dirSizes
}

/**
 * @param {string} input
 */
function part1(input) {
  const fs = parseInput(input)
  const dirSizes = getDirSizes(fs)

  return $(Object.values(dirSizes))
    .filter((x) => x <= 100_000)
    .sum()
}

/**
 * @param {string} input
 */
function part2(input) {
  const fs = parseInput(input)
  const dirSizes = getDirSizes(fs)

  const fsSize = dirSizes["/"]
  const maxSize = 70_000_000
  const curFreeSize = maxSize - fsSize
  const reqFreeSize = 30_000_000
  const delta = reqFreeSize - curFreeSize

  return $(Object.values(dirSizes))
    .filter((x) => x >= delta)
    .min()
}
