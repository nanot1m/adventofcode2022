import { fork } from "child_process"
import { promises as fsPromises } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

const day = parseInt(process.argv[2], 10)

if (day) {
  execDay(day).then(console.log)
} else {
  fsPromises
    .readdir(dirname(fileURLToPath(import.meta.url)))
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
}

function execDay(day) {
  return new Promise(async (res, rej) => {
    const worker = fork("./worker.js", { stdio: "pipe" })
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
        if (stderr) rej(stderr)
        res(stdout)
      }
    })

    worker.on("error", rej)

    worker.on("exit", (code) => {
      if (code !== 0) rej(stderr)
      res(stdout)
    })
  })
}
