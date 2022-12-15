// @ts-check
import { access, readdir, stat } from "node:fs/promises"
import { join } from "node:path"
import { config } from "../infra/config.js"
import { solution } from "../infra/solution.js"

const day = parseInt(process.argv[2], 10)

/**
 * @param {unknown} err
 */
function handleError(err) {
  if (err instanceof Error) {
    if (err.stack) {
      console.error(err.stack)
    } else {
      console.error(err.message)
    }
    return
  }
  console.error(err)
}

if (day) {
  execDay(day).catch(handleError)
} else {
  readdir(config.solutionsDir)
    .then((dir) => dir.filter((x) => /^\d+\.js$/.test(x)))
    .then((xs) => xs.map((x) => x.split(".")[0]))
    .then((xs) => xs.sort((a, b) => Number(a) - Number(b)))
    .then((files) => files.map((file) => execDay(file)))
    .then((promises) => Promise.allSettled(promises))
    .then((messages) => {
      messages.forEach((res) => {
        if (res.status === "rejected") {
          handleError(res.reason)
        }
      })
    })
    .catch(handleError)
}

/**
 * @param {string | number} day
 */
async function execDay(day) {
  const name = join(config.solutionsDir, `${day}.js`)

  try {
    await access(name)
  } catch (err) {
    const messages = [`Day ${day} is not implemented`, `Can not read ${name}`]

    throw new Error(messages.join("\n"), { cause: err })
  }

  const { solve } = await import(name)
  if (!solve) {
    const messages = [
      `Day ${day} is not implemented`,
      `Expected a ${name} to export a function named "solve"`,
    ]

    throw new Error(messages.join("\n"))
  }

  await solution({ solve, day })
}
