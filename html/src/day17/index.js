// @ts-check

import { scaleCanvasToPixelRatio } from "../common"
import { simulate } from "../../../js/solutions/17.js"
import { V } from "../../../js/modules"
import { range } from "../../../js/modules/itertools"

const canvas = document.getElementById("canvas")
if (!(canvas instanceof HTMLCanvasElement)) throw new Error("no canvas")

const ctx = canvas.getContext("2d")
if (!ctx) throw new Error("no ctx")

const SCREEN_WIDTH = 9
const SCREEN_HEIGHT = 64
const SIZE = 5

const COLORS = {
  "+": "#ff922b",
  "-": "#51cf66",
  L: "#339af0",
  O: "#cc5de8",
  I: "#e03131",
  ".": "white",
}

const example = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>"

scaleCanvasToPixelRatio(ctx, SCREEN_WIDTH * SIZE, SCREEN_HEIGHT * SIZE)

const inputForm = document.getElementById("input-form")
if (!(inputForm instanceof HTMLFormElement)) throw new Error("no form")
const pauseButton = document.getElementById("pause")
if (!(pauseButton instanceof HTMLButtonElement))
  throw new Error("no pause button")
const speedInput = document.getElementById("speed")
if (!(speedInput instanceof HTMLInputElement)) throw new Error("no speed input")

const inputField = inputForm.elements.namedItem("input")
if (inputField instanceof HTMLTextAreaElement) {
  inputField.value = example
}

inputForm.addEventListener("submit", function (e) {
  e.preventDefault()
  const formData = new FormData(this)
  const input = formData.get("input")?.toString() ?? ""
  draw(input.trim(), ctx)
})

pauseButton.addEventListener("click", function (e) {
  if (paused) {
    play()
  } else {
    pause()
  }
})

let paused = false

function pause() {
  paused = true
  if (pauseButton) {
    pauseButton.textContent = "Play"
  }
}

function play() {
  paused = false
  if (pauseButton) {
    pauseButton.removeAttribute("disabled")
    pauseButton.textContent = "Pause"
  }
}

let stepDelay = 500
speedInput.value = String(1000 / stepDelay)
speedInput.addEventListener("input", function (e) {
  stepDelay = 1000 / Number(this.value)
})

let rafHandle = 0
/**
 * @param {string} input
 * @param {CanvasRenderingContext2D} ctx
 */
function draw(input, ctx) {
  ctx.canvas.scrollIntoView({ behavior: "smooth" })
  cancelAnimationFrame(rafHandle)
  play()

  const iter = simulate(input.trim())

  let scroll = 0

  function drawFullState() {
    const { value } = iter.next()
    if (!value) return

    ctx.fillStyle = "#343a40"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const { map, rock, height } = value

    const maxY = height + 5

    if (maxY - scroll > SCREEN_HEIGHT) {
      scroll = maxY - SCREEN_HEIGHT
      console.log(scroll)
    }

    const arr = map.to2dArray({
      valToString: (x) => x ?? ".",
      topLeftPos: V.vec(0, scroll),
      botRightPos: V.vec(6, Math.max(maxY, SCREEN_HEIGHT)),
    })

    const dx = 1
    for (let y = 0; y < arr.length; y++)
      for (let x = 0; x < arr[y].length; x++) {
        ctx.fillStyle = COLORS[arr[y][x]]
        ctx.fillRect((x + dx) * SIZE, y * SIZE, SIZE, SIZE)
      }

    rock.points.forEach((p) => {
      const [x, y] = V.add(p, rock.pos)
      ctx.fillStyle = COLORS[rock.name]
      ctx.fillRect((x + dx) * SIZE, (y - scroll) * SIZE, SIZE, SIZE)
    })
  }

  let lastTime = 0

  /**
   * @param {number} dt
   */
  function drawLoop(dt) {
    if (paused) {
      lastTime = 0
    } else {
      if (lastTime === 0) {
        lastTime = dt
        drawFullState()
      } else if (dt - lastTime > stepDelay) {
        const countSteps = Math.floor((dt - lastTime) / stepDelay)
        lastTime = dt
        for (const _ of range(countSteps)) {
          drawFullState()
        }
      }
    }
    rafHandle = requestAnimationFrame(drawLoop)
  }
  drawLoop(0)
}
