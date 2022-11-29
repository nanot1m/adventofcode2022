// @ts-check
import "./env.js"
import { get, request } from "https"
import { dirname, join } from "path"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { fileURLToPath } from "url"

const SESSION = process.env.SESSION

/**
 *
 * @param {string|number} dayN
 * @param {boolean} trim
 * @returns
 */
export function readFromFileSystem(dayN, trim = true) {
  const name = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "input",
    `day${dayN}.input.txt`,
  )
  let input = readFileSync(name, "utf8")
  if (trim) input = input.trim()
  return input
}

/**
 * @template T
 */
export class HttpError extends Error {
  /**
   * @param {number} statusCode
   * @param {string} statusMessage
   * @param {T} body
   */
  constructor(statusCode, statusMessage, body) {
    super(`${statusCode} ${statusMessage}`)
    this.statusCode = statusCode
    this.statusMessage = statusMessage
    this.body = body
  }
}

/**
 *
 * @param {string|number} dayN
 * @param {boolean} trim
 * @returns
 */
export function fetchFromAoC(dayN, trim = true) {
  if (SESSION == null) {
    console.error(
      [
        'Environment variable "SESSION" is not provided.',
        "Please login at https://adventofcode.com/2022/auth/login",
        'and set value from cookie "session" as an env variable "SESSION"',
      ].join(" "),
    )
    process.exit(1)
  }

  return new Promise((resolve, reject) => {
    let text = ""
    const req = get(
      `https://adventofcode.com/2022/day/${dayN}/input`,
      { headers: { cookie: `session=${SESSION}` } },
      (res) => {
        res.on("data", (chunk) => {
          text += chunk
        })
        res.on("end", () => {
          if (res.statusCode > 399) {
            reject(new HttpError(res.statusCode, res.statusMessage, text))
            return
          }
          resolve(trim ? text.trim() : text)
        })
        res.on("error", reject)
      },
    )
    req.on("error", reject)
    req.end()
  })
}

/**
 *
 * @param {string|number} dayN
 * @param {boolean} trim
 * @returns
 */
export async function cachedFetchFromAoC(dayN, trim = false) {
  const name = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "input",
    `day${dayN}.input.txt`,
  )
  if (existsSync(name)) {
    return readFromFileSystem(dayN, trim)
  }

  const input = await fetchFromAoC(dayN, trim)
  mkdirSync(dirname(name), { recursive: true })
  writeFileSync(name, input)
  return input
}

/**
 * @param {number} dayN
 * @param {1 | 2} level
 * @param {string|number} result
 */
export function submit(dayN, level, result) {
  if (SESSION == null) {
    console.error(
      [
        'Environment variable "SESSION" is not provided.',
        "Please login at https://adventofcode.com/2022/auth/login",
        'and set value from cookie "session" as an env variable "SESSION"',
      ].join(" "),
    )
    process.exit(1)
  }

  return new Promise((resolve, reject) => {
    let text = ""
    const body = `level=${level}&answer=${result}`
    const req = request(
      {
        host: "adventofcode.com",
        path: "/2022/day/" + dayN + "/answer",
        method: "POST",
        headers: {
          cookie: `session=${SESSION}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Contetn-Length": body.length,
        },
      },
      (res) => {
        res.on("data", (chunk) => {
          text += chunk
        })
        res.on("end", () => {
          if (res.statusCode > 399) {
            reject(new HttpError(res.statusCode, res.statusMessage, text))
            return
          }
          resolve(text)
        })
        res.on("error", reject)
      },
    )
    req.on("error", reject)
    req.write(body)
    req.end()
  })
}

/**
 *
 * @param {number} dayN
 * @param {1|2} level
 * @param {string|number} result
 */
export function submitAndLog(dayN, level, result) {
  console.log(`Submitting: Day ${dayN}. Level ${level}. Result: ${result}`)
  return submit(dayN, level, result)
    .then(
      (x) => x,
      (x) => x,
    )
    .then((html) => {
      const indexOfMain = html.indexOf("<main>")
      const indexOfEnd = html.indexOf("</main>")
      const main = html.substring(indexOfMain, indexOfEnd)
      const indexOfAnswer = main.indexOf("<p>")
      const answer = main.substring(indexOfAnswer + 3, main.indexOf("</p>"))
      return answer
    })
    .then(console.log)
}
