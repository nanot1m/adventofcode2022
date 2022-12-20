// @ts-check

import { deepStrictEqual } from "assert"
import { V, V3 } from "./index.js"
import { t } from "./parser.js"

function testParser() {
  const vecParser = t.vec()
  deepStrictEqual(
    vecParser.parse("1,2"),
    V.vec(1, 2),
    "Expected `vec` parser to parse a vector",
  )

  const vec3Parser = t.vec3()
  deepStrictEqual(
    vec3Parser.parse("1,2,3"),
    V3.vec3(1, 2, 3),
    "Expected `vec` parser to parse a vector",
  )

  const arrParser = t.arr(t.int())
  deepStrictEqual(
    arrParser.parse("1,2"),
    [1, 2],
    "Expected `arr` parser to parse an array",
  )
  const vecArrParser = t.arr(t.vec())
  deepStrictEqual(
    vecArrParser.parse("1,2 -> 3,4"),
    [V.vec(1, 2), V.vec(3, 4)],
    "Expected `arr` parser to parse an array",
  )
  deepStrictEqual(
    vecArrParser.parse("1,2\n3,4"),
    [V.vec(1, 2), V.vec(3, 4)],
    "Expected `arr` parser to parse an array with newline",
  )
  deepStrictEqual(
    vecArrParser.parse("1,2\n\n3,4"),
    [V.vec(1, 2), V.vec(3, 4)],
    "Expected `arr` parser to parse an array with double newlines",
  )

  const withCustomSeparatorParser = arrParser.withSeparator("||")
  deepStrictEqual(
    withCustomSeparatorParser.parse("1||2||3||4"),
    [1, 2, 3, 4],
    "Expected `arr` parser to parse an array with custom separator",
  )

  const tplParser = t.tpl`hello ${"name|str"} at position ${"pos|vec"}`
  deepStrictEqual(
    tplParser.parse("hello world at position 1,2"),
    { name: "world", pos: V.vec(1, 2) },
    "Expected `tpl` parser to parse a template",
  )

  const arrTplParser = t.arr(tplParser)
  deepStrictEqual(
    arrTplParser.parse(
      "hello world at position 1,2\nhello sun at position 3,4",
    ),
    [
      { name: "world", pos: V.vec(1, 2) },
      { name: "sun", pos: V.vec(3, 4) },
    ],
    "Expected `arr` parser to parse an array of templates",
  )
}

testParser()
