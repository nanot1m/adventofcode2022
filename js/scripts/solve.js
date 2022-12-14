import { fork } from "node:child_process"
import { promises as fsPromises } from "node:fs"
import { config } from "../infra/config.js"

const day = parseInt(process.argv[2], 10)

if (day) {
  execDay(day).then(console.log, console.error)
} else {
  fsPromises
    .readdir(config.solutionsDir)
    .then((dir) => dir.filter((x) => /^\d+\.js$/.test(x)))
    .then((xs) => xs.map((x) => x.split(".")[0]))
    .then((xs) => xs.sort((a, b) => a - b))
    .then((files) => files.map((file) => execDay(file)))
    .then((promises) => Promise.allSettled(promises))
    .then((messages) => {
      messages.forEach((res) => {
        if (res.status === "fulfilled") {
          console.log(res.value)
        } else {
          console.error(res.reason)
        }
      })
    })
    .catch(console.error)
}

function execDay(day) {
  return new Promise(async (res, rej) => {
    const worker = fork(config.workerPath, { stdio: "pipe" })
    worker.send({ day: parseInt(day) })

    let stdout = ""
    worker.stdout.on("data", (data) => {
      stdout += data
    })

    let stderr = ""
    worker.stderr.on("data", (data) => {
      stderr += data
    })

    worker.on("message", (msg) => {
      if (msg === "done") {
        worker.kill()
        if (stderr) {
          rej(stderr)
        } else {
          res(stdout)
        }
      }
    })

    worker.on("error", (e) => {
      rej(e)
    })

    worker.on("exit", (code) => {
      if (code === null || code === 0) {
        res(stdout)
      } else {
        rej(stderr)
      }
    })
  })
}
