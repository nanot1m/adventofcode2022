// @ts-check
import { performance } from "perf_hooks"
import { parse } from "path"
import { cachedFetchFromAoC, HttpError, submitAndLog } from "./input.js"

const currentDay = parse(process.argv[1]).name

const WIDTH = 66

const drawLine = (/** @type {0 | 1 | 2} */ type) => {
  let [l, r] = type === 1 ? ["╭", "╮"] : type === 2 ? ["╰", "╯"] : ["├", "┤"]
  console.log(
    `${l}${Array(WIDTH - 2)
      .fill("─")
      .join("")}${r}`,
  )
}

const drawText = (/** @type {string} */ text) =>
  console.log(`│ ${text.padEnd(WIDTH - 4, " ")} │`)

/**
 * @param {Object} config
 * @param {(day: number) => string | Promise<string>} [config.input]
 * @param {(input: string) => Array<() => any>} config.solve
 * @param {Record<number, boolean>} [config.submit]
 * @param {(day: number, level: number, result: string) => void} [config.submitFn]
 * @param {number | string} [config.day]
 */
export async function solution({
  input = cachedFetchFromAoC,
  solve,
  submit = { 1: false, 2: false },
  submitFn = submitAndLog,
  day = currentDay,
}) {
  await Promise.resolve()
    .then(() => {
      drawLine(1)
      drawText("Advent of Code. Day " + day)
      drawLine()
      return input(Number(day))
    })
    .then(solve)
    .then(async (solutions) => {
      /** @type {Array<any>} */
      const results = []
      await solutions.reduce((acc, solution, idx) => {
        let now = 0
        return acc
          .then(() => {
            now = performance.now()
          })
          .then(solution)
          .then((result) => {
            results.push(result)
            drawText(`Part ${idx + 1}`)
            drawText("")
            const lines = (result ?? "").toString().split("\n")
            if (lines.length > 1) {
              drawText("Result:")
              lines.forEach((/** @type {string} */ line) => drawText(line))
            } else {
              drawText(`Result: ${result}`)
            }
            drawText(`  Time: ${(performance.now() - now).toFixed(0)}ms`)
            drawLine(idx === solutions.length - 1 ? 2 : 0)
          })
      }, Promise.resolve())
      return results
    })
    .then((results) => {
      return results
        .map((result, idx) => [result, idx + 1])
        .filter(([, level]) => submit[level])
        .reduce(async (acc, [result, level], idx) => {
          await acc
          if (idx > 0) {
            await new Promise((resolve) => setTimeout(resolve, 5000))
          }
          return submitFn(Number(day), level, result)
        }, Promise.resolve())
    })
    .catch((e) => {
      if (e instanceof HttpError && e.statusCode === 404) {
        console.error(`Day ${day} is not available yet`)
        return
      }
      console.error(e)
    })
}
