import { scaleCanvasToPixelRatio } from "../common"
import {
  checks,
  parseInput,
  getShortestPath,
  toArray,
} from "../../../js/solutions/24"
import { parseMap2d, Map2d } from "../../../js/modules/map2d"

import grass from "./img/grass.png"
import wallV from "./img/wall-v.png"
import wallH from "./img/wall-h.png"
import wallTL from "./img/wall-tl.png"
import wallTR from "./img/wall-tr.png"
import wallBL from "./img/wall-bl.png"
import wallBR from "./img/wall-br.png"
import { V } from "../../../js/modules"
import { it } from "../../../js/modules/itertools"
import { mod } from "../../../js/modules/lib"

const example = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`

const blizzardToChar = {
  "<": "⇠",
  ">": "⇢",
  "^": "⇡",
  v: "⇣",
}

const canvas = document.getElementById("canvas")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")

const form = document.getElementById("input-form")
const inputElement = document.getElementById("input")
inputElement.value = example

const controls = document.querySelector(".controls")
const solveBtn = document.getElementById("solve")

form.addEventListener("submit", function (e) {
  e.preventDefault()
  const formData = new FormData(this)
  const input = formData.get("input")?.toString() ?? ""
  startLevel(input.trim())
})

const tileSize = 10
let scale = 4
const padding = 4

const colors = {
  bg: "#1e130a",
  blizzard: "#4dabf7",
}

function drawElf(pos) {
  drawChar(pos, "🧌", "green", false)
}

function drawElf2(pos) {
  drawChar(pos, "🧝‍♂️", "green", false)
}

function drawChar(pos, char, color = "white", clear = true) {
  ctx.font = tileSize * scale + "px monospace"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  const size = tileSize * scale
  if (clear) {
    ctx.fillStyle = colors.bg
    ctx.fillRect(pos[0] * size, pos[1] * size, size, size)
  }
  ctx.fillStyle = color
  ctx.fillText(char, pos[0] * size + size / 2, pos[1] * size + size / 2)
}

function drawSprite(pos, sprite) {
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(
    sprite,
    0,
    0,
    tileSize,
    tileSize,
    pos[0] * tileSize * scale,
    pos[1] * tileSize * scale,
    tileSize * scale,
    tileSize * scale,
  )
}

function loadSprite(path) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = path
  })
}

async function loadSprites() {
  const sprites = await Promise.all([
    loadSprite(grass),
    loadSprite(wallV),
    loadSprite(wallH),
    loadSprite(wallTL),
    loadSprite(wallTR),
    loadSprite(wallBL),
    loadSprite(wallBR),
  ])
  return {
    grass: sprites[0],
    wallV: sprites[1],
    wallH: sprites[2],
    wallTL: sprites[3],
    wallTR: sprites[4],
    wallBL: sprites[5],
    wallBR: sprites[6],
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

let handle = 0

async function startLevel(level) {
  const map = parseInput(level)
  const width = (map.width + 2) * tileSize + padding * 2
  const height = (map.height + 2) * tileSize + padding * 2
  const blizzards = it(map)
    .filter((x) => x.value !== ".")
    .toArray()

  const screenWidth = window.innerWidth
  const maxScale = Math.max(Math.min(Math.floor(screenWidth / width), 4), 1)

  scale = maxScale

  scaleCanvasToPixelRatio(ctx, width, height, scale)
  ctx.fillStyle = colors.bg
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.translate(padding * scale, padding * scale)

  const message = "Loading..."
  let timePassed = Date.now()
  for (let i = 0; i < message.length; i++) {
    drawChar([i, 1], message[i], "white")
  }
  const sprites = await loadSprites()
  const shortestPath = toArray(
    getShortestPath(map, [0, -1], [map.width - 1, map.height], 0),
  )
  timePassed = Date.now() - timePassed
  if (timePassed < 1000) {
    await delay(1000 - timePassed)
  }

  ctx.fillStyle = colors.bg
  ctx.fillRect(-padding, -padding, canvas.width, canvas.height)

  let playerPos = [0, -1]
  let time = 0
  let lost = false
  let won = false
  let blizzardsToDraw = blizzards

  drawLevel(map, time)
  setButtonsState()

  async function showSolution() {
    cancelAnimationFrame(handle)
    blockAllButtons()

    for (const [pos] of shortestPath) {
      await movePlayerFromToWithAnimation(playerPos, pos, 100)
    }
  }

  function movePlayerFromToWithAnimation(from, to, duration) {
    return new Promise((res) => {
      const [x1, y1] = from
      const [x2, y2] = to
      const dx = x2 - x1
      const dy = y2 - y1
      let lastTime = 0

      const origPoses = blizzardsToDraw.map((b) => b.pos)

      function loop(dt) {
        if (lastTime === 0) {
          lastTime = dt
        }
        const dTime = dt - lastTime
        const progress = Math.min(dTime / duration, 1)
        const x = x1 + dx * progress
        const y = y1 + dy * progress
        playerPos = [x, y]

        blizzardsToDraw.forEach((b, i) => {
          const dx = b.value === "<" ? -1 : b.value === ">" ? 1 : 0
          const dy = b.value === "^" ? -1 : b.value === "v" ? 1 : 0
          blizzardsToDraw[i] = {
            value: b.value,
            pos: [
              origPoses[i][0] + dx * progress,
              origPoses[i][1] + dy * progress,
            ],
          }
        })

        drawLevel(map, time)
        if (progress < 1) {
          handle = requestAnimationFrame(loop)
        } else {
          cancelAnimationFrame(handle)
          playerPos = to
          time++
          blizzardsToDraw.forEach((b, i) => {
            const dx = b.value === "<" ? -1 : b.value === ">" ? 1 : 0
            const dy = b.value === "^" ? -1 : b.value === "v" ? 1 : 0
            const x = mod(origPoses[i][0] + dx, map.width)
            const y = mod(origPoses[i][1] + dy, map.height)

            blizzardsToDraw[i] = {
              value: b.value,
              pos: [x, y],
            }
          })
          drawLevel(map, time)
          res()
        }
      }
      loop(0)
    })
  }

  function drawLevel(map, time) {
    ctx.fillStyle = colors.bg
    ctx.fillRect(
      -padding * scale,
      -padding * scale,
      canvas.width,
      canvas.height,
    )

    let drawMap = new Map2d()
    for (let i = -1; i <= map.width; i++) {
      drawMap.set([i, -1], "#")
      drawMap.set([i, map.height], "#")
    }
    for (let i = 0; i < map.height; i++) {
      drawMap.set([-1, i], "#")
      drawMap.set([map.width, i], "#")
    }
    drawMap.set([0, -1], ".")
    drawMap.set([map.width - 1, map.height], ".")
    drawMap = parseMap2d(drawMap.toString())

    for (const { pos, value } of drawMap) {
      if (value === "#") {
        const isWallOnLeft = drawMap.get([pos[0] - 1, pos[1]]) === "#"
        const isWallOnRight = drawMap.get([pos[0] + 1, pos[1]]) === "#"
        const isWallOnTop = drawMap.get([pos[0], pos[1] - 1]) === "#"
        const isWallOnBottom = drawMap.get([pos[0], pos[1] + 1]) === "#"

        if (isWallOnRight && isWallOnBottom) {
          drawSprite(pos, sprites.wallTL)
        } else if (
          (isWallOnLeft && isWallOnBottom) ||
          (isWallOnLeft && !isWallOnRight)
        ) {
          drawSprite(pos, sprites.wallTR)
        } else if (
          (isWallOnRight && isWallOnTop) ||
          (isWallOnRight && !isWallOnLeft)
        ) {
          drawSprite(pos, sprites.wallBL)
        } else if (isWallOnLeft && isWallOnTop) {
          drawSprite(pos, sprites.wallBR)
        } else if (isWallOnRight || isWallOnLeft) {
          drawSprite(pos, sprites.wallH)
        } else {
          drawSprite(pos, sprites.wallV)
        }
      } else {
        // drawSprite(pos, sprites.grass)
      }
    }

    blizzardsToDraw.forEach((blizzard) => {
      drawChar(
        V.add(blizzard.pos, V.vec(1, 1)),
        blizzardToChar[blizzard.value],
        colors.blizzard,
        false,
      )
    })

    drawElf([playerPos[0] + 1, playerPos[1] + 1])
    drawElf2([drawMap.width - 2, drawMap.height - 1])
  }

  function blockAllButtons() {
    for (const button of controls.children) {
      button.disabled = true
    }
  }

  function setButtonsState() {
    const canMove = {
      up:
        V.eq([playerPos[0], playerPos[1] - 1], [0, -1]) ||
        map.has([playerPos[0], playerPos[1] - 1]),
      down:
        V.eq([playerPos[0], playerPos[1] + 1], [map.width - 1, map.height]) ||
        map.has([playerPos[0], playerPos[1] + 1]),
      left: map.has([playerPos[0] - 1, playerPos[1]]),
      right: map.has([playerPos[0] + 1, playerPos[1]]),
      stay: true,
    }
    for (const button of controls.children) {
      button.disabled = lost || won || !canMove[button.name]
    }
  }

  function drawLoseScreen() {
    ctx.fillStyle = colors.bg
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const message = "You lost!"
    for (let i = 0; i < message.length; i++) {
      drawChar([i, 1], message[i], "red")
    }
  }

  function drawWinScreen() {
    ctx.fillStyle = colors.bg
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const message = "You won!"
    for (let i = 0; i < message.length; i++) {
      drawChar([i, 1], message[i], "green")
    }
  }

  function checkWinLose() {
    if (V.eq(playerPos, [map.width - 1, map.height])) {
      won = true
      drawWinScreen()
    } else if (
      checks.u(map, playerPos, time) ||
      checks.d(map, playerPos, time) ||
      checks.l(map, playerPos, time) ||
      checks.r(map, playerPos, time)
    ) {
      lost = true
      drawLoseScreen()
    }
  }

  async function handleMove(direction) {
    let nextPos = [...playerPos]
    if (direction === "up") {
      nextPos[1]--
    } else if (direction === "down") {
      nextPos[1]++
    } else if (direction === "left") {
      nextPos[0]--
    } else if (direction === "right") {
      nextPos[0]++
    }
    await movePlayerFromToWithAnimation(playerPos, nextPos, 300)
    checkWinLose()
    setButtonsState()
  }

  controls.onclick = function (e) {
    handleMove(e.target.name)
  }

  solveBtn.onclick = function () {
    showSolution()
  }
}
