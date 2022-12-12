// @ts-check

import { strictEqual } from "assert"

import { rotateString2d } from "./lib.js"

function testRotateString2d() {
  strictEqual(
    rotateString2d(` yz
abc
12`),
    `1a
2by
 cz`,
    "rotateString2d should rotate a string 90 degrees clockwise",
  )
}

testRotateString2d()
