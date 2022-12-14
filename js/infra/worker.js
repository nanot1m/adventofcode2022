// @ts-check
import { join } from "node:path"
import { config } from "./config.js"
import { HttpError } from "./input.js"
import { solution } from "./solution.js"

/**
 * @param {unknown} msg
 * @returns {msg is { day: number }}
 */
function isValidMessage(msg) {
  return (
    msg != null &&
    typeof msg === "object" &&
    "day" in msg &&
    typeof msg.day === "number"
  )
}

process.on("message", async (msg) => {
  if (isValidMessage(msg)) {
    const name = join(config.solutionsDir, `${msg.day}.js`)
    const { solve } = await import(name)
    if (!solve) {
      const messages = [
        `Day ${msg.day} is not implemented:`,
        `  Expected a ${name} to export a function named "solve"`,
      ]

      console.error(messages.join("\n"))
      process.exit(1)
    }

    await solution({ solve, day: msg.day })
    process.exit(0)
  }

  throw new Error(
    "Invalid message, expected { day: number } but got " + JSON.stringify(msg),
  )
})
