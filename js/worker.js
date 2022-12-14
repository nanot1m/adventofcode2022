// @ts-check
import { resolve } from "node:path"
import { solution } from "./solution.js"

/**
 * @param {unknown} msg
 * @returns {msg is { day: number }}
 */
function isValidMessage(msg) {
  return typeof msg === "object" && "day" in msg && typeof msg.day === "number"
}

process.on("message", async (msg) => {
  if (isValidMessage(msg)) {
    const solve = await import(resolve(`./${msg.day}.js`)).then((m) => m.solve)
    if (!solve) {
      throw new Error(`Day ${msg.day} is not implemented`)
    }
    await solution({ solve, day: msg.day })
    process.send("done")
    return
  }

  throw new Error(
    "Invalid message, expected { day: number } but got " + JSON.stringify(msg),
  )
})
