// @ts-check
import { parseMap, simulateSand } from "../../../js/solutions/14.js"
import { V } from "../../../js/modules/index.js"

const canvas = document.getElementById("canvas")
if (!(canvas instanceof HTMLCanvasElement)) throw new Error("no canvas")

const ctx = canvas.getContext("2d")
if (!ctx) throw new Error("no ctx")

let raf = 0
/**
 * @param {string} input
 * @param {CanvasRenderingContext2D} ctx
 */
function draw(input, ctx, part2 = false) {
  cancelAnimationFrame(raf)
  const map = parseMap(input)

  if (part2) {
    const h = map.height + 1
    const minX = Math.min(map.bounds.minX, 500 - h)
    const maxX = Math.max(map.bounds.maxX, 500 + h)

    const floor = V.segment(V.vec(minX, h), V.vec(maxX, h))
    for (const pos of floor) {
      map.set(pos, "~")
    }
  }

  const { width, height, bounds } = map
  const scale = Math.min(10, Math.max(2, 200 / width))

  ctx.canvas.width = width * scale
  ctx.canvas.height = height * scale

  ctx.canvas.scrollIntoView({ behavior: "smooth" })

  const colors = {
    "+": "orange",
    o: "orange",
    "#": "gray",
    ".": "darkblue",
    "~": "brown",
  }

  const iter = simulateSand(map)

  function drawFullState() {
    const map2dStr = map.to2dArray({ valToString: (x) => x ?? "." })

    map2dStr.forEach((row, y) => {
      row.forEach((cell, x) => {
        ctx.fillStyle = colors[cell]
        ctx.fillRect(x * scale, y * scale, scale, scale)
      })
    })
  }

  function drawPoint([x, y], color) {
    ctx.fillStyle = color
    ctx.fillRect(
      (x - bounds.minX) * scale,
      (y - bounds.minY) * scale,
      scale,
      scale,
    )
  }

  drawFullState()

  const step = () => {
    const value = iter.next().value
    if (value) {
      drawPoint(value, colors.o)
      raf = requestAnimationFrame(step)
    }
  }

  step()
}

const inputForm = document.getElementById("input-form")
if (!(inputForm instanceof HTMLFormElement)) throw new Error("no form")

inputForm.addEventListener("submit", function (e) {
  e.preventDefault()
  const formData = new FormData(this)
  const input = formData.get("input")?.toString() ?? ""
  draw(input.trim(), ctx, formData.get("part2") === "on")
})
