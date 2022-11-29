// @ts-check
import { existsSync, readFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const envPath = resolve(dirname(fileURLToPath(import.meta.url)), "../.env")

/**
 * @param {string} line
 */
function trimLine(line) {
  const commentIndex = line.indexOf("#")
  return (commentIndex === -1 ? line : line.substring(0, commentIndex)).trim()
}

if (existsSync(envPath)) {
  readFileSync(envPath, "utf8")
    .split("\n")
    .map(trimLine)
    .filter((line) => line.length > 0)
    .map((line) => line.split("=").map((x) => x.trim()))
    .forEach(([key, value]) => (process.env[key] = value))
}
