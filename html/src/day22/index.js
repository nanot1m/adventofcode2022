// @ts-check

import { scaleCanvasToPixelRatio } from "../common"
import { V } from "../../../js/modules"
import { range } from "../../../js/modules/itertools"
import {
  parseInput,
  getConnectionsOnCube,
  traverseMap,
} from "../../../js/solutions/22"

const canvas = document.getElementById("canvas")
if (!(canvas instanceof HTMLCanvasElement)) throw new Error("no canvas")

const ctx = canvas.getContext("2d")
if (!ctx) throw new Error("no ctx")

const WIDTH = 200
const HEIGHT = 200
const SIZE = 3

scaleCanvasToPixelRatio(ctx, WIDTH * SIZE, HEIGHT * SIZE)

const inputForm = document.getElementById("input-form")
if (!(inputForm instanceof HTMLFormElement)) throw new Error("no form")

const nextButton = document.getElementById("next")

inputForm.addEventListener("submit", function (e) {
  e.preventDefault()
  const formData = new FormData(this)
  const input = formData.get("input")?.toString() ?? ""
  draw(input.trimEnd(), ctx)
})

const colors = {
  ".": "white",
  "#": "orange",
}

const dirToChar = {
  D: "↑",
  U: "↓",
  L: "←",
  R: "→",
}

let rafHandle = 0
/**
 * @param {string} input
 * @param {CanvasRenderingContext2D} ctx
 */
function draw(input, ctx) {
  if (rafHandle) {
    cancelAnimationFrame(rafHandle)
  }
  ctx.canvas.scrollIntoView({ behavior: "smooth" })

  const { map, moves, start, sideSize } = parseInput(input)
  const connections = getConnectionsOnCube(sideSize)

  const iter = traverseMap(map, moves, connections, start, true)

  if (!nextButton) {
    throw new Error("no next button")
  }
  nextButton.onclick = () => {
    const result = iter.next()
    if (result.done) {
      return
    }
    const { dir, pos, move } = result.value
    console.log({ pos })
    drawPos(pos, dir)

    // @ts-ignore
    document.getElementById(
      "status",
    ).innerText = `Move: ${move}, Dir: ${dirToChar[dir]}`
  }

  nextButton.removeAttribute("disabled")

  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, WIDTH * SIZE, HEIGHT * SIZE)

  function drawPos(pos, dir) {
    ctx.fillStyle = "red"
    ctx.fillRect(pos[0] * SIZE, pos[1] * SIZE, SIZE, SIZE)
  }

  function drawInitState() {
    for (const p of map) {
      ctx.fillStyle = colors[p.value] ?? "white"
      ctx.fillRect(p.pos[0] * SIZE, p.pos[1] * SIZE, SIZE, SIZE)
    }
    drawPos(start, "R")
  }

  drawInitState()

  function drawLoop() {
    const result = iter.next()
    if (result.done) {
      return
    }
    const { dir, pos, move } = result.value
    drawPos(pos, dir)

    // @ts-ignore
    document.getElementById(
      "status",
    ).innerText = `Move: ${move}, Dir: ${dirToChar[dir]}`
    rafHandle = requestAnimationFrame(drawLoop)
  }
  drawLoop()
}
