import { Vec2 } from "./vec.js"
import { Vec3 } from "./vec3.js"

export interface RotateFn {
  (rotatable: string, clockwise?: boolean): string
  (rotatable: string[], clockwise?: boolean): string[]
  <R>(rotatable: R[][], clockwise?: boolean): R[][]
}

export type TemplateKey<T> = T extends `${infer K}|${infer _}` ? K : T

export type TemplateValue<T> = T extends `${infer _}|${infer V}`
  ? TemplateValueReturnType<V>
  : string

export type TemplateValueReturnType<V> = V extends "int"
  ? number
  : V extends "vec3"
  ? Vec3
  : V extends "vec"
  ? Vec2
  : V extends "str"
  ? string
  : V extends `${infer U}[]`
  ? TemplateValueReturnType<U>[]
  : never

export type NestedArray<T> = T | NestedArray<T>[]

type SolutionModuleInterface<T> = {
  parseInput: (input: string) => T
  part1: (input: T) => any
  part2: (input: T) => any
  useExample?: boolean
  exampleInput?: string
  disableInputTrim?: boolean
}

export type SolutionModuleValid<T> = T extends SolutionModuleInterface<infer U>
  ? true
  : T extends { parseInput: (input: string) => infer J }
  ? T extends { part1: (input: any) => any }
    ? T extends { part2: (input: any) => any }
      ? `Solution module must properly implement the SolutionModuleInterface<${J}>`
      : "Solution module must have a part2 function"
    : "Solution module must have a part1 function"
  : "Solution module must have a parseInput function that returns a value"
