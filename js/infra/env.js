// @ts-check
import { existsSync, readFileSync } from "node:fs"
import { config } from "./config.js"

/**
 * @param {string} line
 */
function trimLine(line) {
  const commentIndex = line.indexOf("#")
  return (commentIndex === -1 ? line : line.substring(0, commentIndex)).trim()
}

if (existsSync(config.envPath)) {
  readFileSync(config.envPath, "utf8")
    .split("\n")
    .map(trimLine)
    .filter((line) => line.length > 0)
    .map((line) => line.split("=").map((x) => x.trim()))
    .forEach(([key, value]) => (process.env[key] = value))
}
