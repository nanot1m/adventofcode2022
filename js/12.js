// @ts-check
import { V } from "./modules/index.js"
import { it } from "./modules/itertools.js"
import { parseMap2d } from "./modules/map2d.js"
import { solution } from "./solution.js"

solution({
  solve(input) {
    return [() => part1(input), () => part2(input)]
  },
})

const S = "S".charCodeAt(0)
const E = "E".charCodeAt(0)
const a = "a".charCodeAt(0)
const z = "z".charCodeAt(0)

/**
 * @param {string} input
 */
function part1(input) {
  const map2d = parseMap2d(input).map((x) => x.charCodeAt(0))

  const start = it(map2d).find((x) => x.value === S).pos
  const end = it(map2d).find((x) => x.value === E).pos

  map2d.set(start, a)
  map2d.set(end, z)

  const mapBfs = map2d.bfs((a, b) => b.value - a.value <= 1, start)
  const result = it(mapBfs).find((x) => V.eq(x.pos, end)).distance

  return result
}

/**
 * @param {string} input
 */
function part2(input) {
  const map2d = parseMap2d(input).map((x) => x.charCodeAt(0))

  const start = it(map2d).find((x) => x.value === S).pos
  const end = it(map2d).find((x) => x.value === E).pos

  map2d.set(start, a)
  map2d.set(end, z)

  const mapBfs = map2d.bfs((a, b) => a.value - b.value <= 1, end)
  const result = it(mapBfs).find((x) => x.value === a).distance

  return result
}
