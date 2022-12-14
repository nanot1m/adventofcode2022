// @ts-check
import { simulateSand, parseMap } from "../../../js/14.js"

const canvas = document.getElementById("canvas")
if (!(canvas instanceof HTMLCanvasElement)) throw new Error("no canvas")

const ctx = canvas.getContext("2d")
if (!ctx) throw new Error("no ctx")

let interval = 0
/**
 * @param {string} input
 * @param {CanvasRenderingContext2D} ctx
 */
function draw(input, ctx) {
  clearInterval(interval)
  const map = parseMap(input)
  const { width, height, bounds } = map
  const scale = Math.min(10, Math.max(4, 100 / width))

  ctx.canvas.width = width * scale
  ctx.canvas.height = height * scale

  ctx.canvas.scrollIntoView({ behavior: "smooth" })

  const colors = {
    "+": "orange",
    o: "orange",
    "#": "gray",
    ".": "darkblue",
  }

  const iter = simulateSand(map)
  const first = (iter.next().value?.[1] ?? 0) - bounds.minY

  function drawState() {
    const map2dStr = map.to2dArray({ valToString: (x) => x ?? "." })

    map2dStr.forEach((row, y) => {
      row.forEach((cell, x) => {
        ctx.fillStyle = colors[cell]
        ctx.fillRect(x * scale, y * scale, scale, scale)
      })
    })

    let x = 500 - bounds.minX
    for (let y = 0; y <= first; y++) {
      ctx.fillStyle = colors["o"]
      ctx.fillRect(x * scale, y * scale, scale, scale)
    }
  }

  drawState()

  interval = setInterval(() => {
    iter.next()
    drawState()
  }, 33)
}

const inputForm = document.getElementById("input-form")
if (!(inputForm instanceof HTMLFormElement)) throw new Error("no form")

inputForm.addEventListener("submit", function (e) {
  e.preventDefault()
  const formData = new FormData(this)
  const input = formData.get("input")?.toString() ?? ""
  draw(input.trim(), ctx)
})
