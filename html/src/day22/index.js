// @ts-check

import { scaleCanvasToPixelRatio } from "../common"
import {
  parseInput,
  getConnectionsOnCube,
  traverseMap,
} from "../../../js/solutions/22"
import { range } from "../../../js/modules/itertools"

const canvas = document.getElementById("canvas")
if (!(canvas instanceof HTMLCanvasElement)) throw new Error("no canvas")

const ctx = canvas.getContext("2d")
if (!ctx) throw new Error("no ctx")

const WIDTH = 200
const HEIGHT = 200
const SIZE = 2

const SCALE = scaleCanvasToPixelRatio(ctx, WIDTH * SIZE, HEIGHT * SIZE)
canvas.style.width = 200 + "px"
canvas.style.height = 200 + "px"

const inputForm = document.getElementById("input-form")
if (!(inputForm instanceof HTMLFormElement)) throw new Error("no form")
const speedInput = document.getElementById("speed")
if (!(speedInput instanceof HTMLInputElement)) throw new Error("no speed input")

let stepDelay = 100
speedInput.value = String(1000 / stepDelay)
speedInput.addEventListener("input", function (e) {
  stepDelay = 1000 / Number(this.value)
})

const nextButton = document.getElementById("next")

inputForm.addEventListener("submit", function (e) {
  e.preventDefault()
  const formData = new FormData(this)
  const input = formData.get("input")?.toString() ?? ""
  draw(input.trimEnd(), ctx)
})

const cube = document.querySelector(".cube")
const radioGroup = document.querySelector(".radio-group")
let currentClass = ""
function changeSide() {
  if (!(radioGroup instanceof HTMLElement)) {
    throw new Error("no radio group")
  }
  var checkedRadio = radioGroup.querySelector(":checked")
  if (checkedRadio instanceof HTMLInputElement) {
    var showClass = "show-" + checkedRadio.value
    if (currentClass && cube) {
      cube.classList.remove(currentClass)
    }
    cube?.classList.add(showClass)
    currentClass = showClass
  }
}
changeSide()
radioGroup?.addEventListener("change", changeSide)

function updateFaceBackground(faceName, pos) {
  const face = document.querySelector(`.cube__face--${faceName}`)
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("no canvas")
  }
  if (face instanceof HTMLElement) {
    let faceCanvas = face.querySelector("canvas")
    let faceCtx
    if (!faceCanvas) {
      faceCanvas = document.createElement("canvas")
      faceCtx = faceCanvas.getContext("2d")
      if (!faceCtx) throw new Error("no ctx")
      faceCtx.canvas.width = 50 * SIZE * SCALE
      faceCtx.canvas.height = 50 * SIZE * SCALE
      face.appendChild(faceCanvas)
    }
    faceCtx = faceCanvas.getContext("2d")
    if (!faceCtx) throw new Error("no ctx")
    faceCtx.drawImage(
      canvas,
      -pos[0] * 50 * SIZE * SCALE,
      -pos[1] * 50 * SIZE * SCALE,
    )
  }
}

const colors = {
  ".": "white",
  "#": "#343a40",
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

  const iter = traverseMap(map, moves, connections, start, sideSize, true)

  if (!nextButton) {
    throw new Error("no next button")
  }
  nextButton.onclick = () => {
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
  }

  nextButton.removeAttribute("disabled")

  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  function drawPos(pos, dir, fillStyle, skipUpdate) {
    ctx.fillStyle = fillStyle
    ctx.fillRect(pos[0] * SIZE, pos[1] * SIZE, SIZE, SIZE)
    if (!skipUpdate) {
      updateFaceBackground("front", [1, 1])
      updateFaceBackground("top", [1, 0])
      updateFaceBackground("right", [2, 0])
      updateFaceBackground("bottom", [1, 2])
      updateFaceBackground("left", [0, 2])
      updateFaceBackground("back", [0, 3])

      // rotate to face containing pos
      let face = "front"
      if (pos[1] < 50) {
        face = pos[0] < 100 ? "top" : "right"
      } else if (pos[1] < 100) {
        face = "front"
      } else if (pos[1] < 150) {
        face = pos[0] < 50 ? "left" : "bottom"
      } else {
        face = "back"
      }
      const faceElement = document.querySelector(
        `[name="rotate-cube-side"][value="${face}"]`,
      )
      if (faceElement instanceof HTMLInputElement) {
        faceElement.checked = true
        changeSide()
      }
    }
  }

  function drawInitState() {
    for (const p of map) {
      ctx.fillStyle = colors[p.value] ?? "white"
      ctx.fillRect(p.pos[0] * SIZE, p.pos[1] * SIZE, SIZE, SIZE)
    }
    drawPos(start, "R")
  }

  drawInitState()

  let lastPos
  function drawStep() {
    const result = iter.next()
    if (result.done) {
      return
    }
    const { dir, pos, move } = result.value
    if (lastPos) {
      drawPos(lastPos, dir, "#51cf66", true)
    }
    drawPos(pos, dir, "#e03131")
    lastPos = pos
    // @ts-ignore
    document.getElementById(
      "status",
    ).innerText = `Move: ${move}, Dir: ${dirToChar[dir]}`
  }

  let lastTime = 0

  function drawLoop(dt) {
    if (lastTime === 0) {
      lastTime = dt
      drawStep()
    } else if (dt - lastTime > stepDelay) {
      const countSteps = Math.floor((dt - lastTime) / stepDelay)
      lastTime = dt
      for (const _ of range(countSteps)) {
        drawStep()
      }
    }

    rafHandle = requestAnimationFrame(drawLoop)
  }
  drawLoop(0)
}
