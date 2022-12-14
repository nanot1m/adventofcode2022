import { Vec2 } from "./vec.js"

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
  : V extends "vec"
  ? Vec2
  : V extends "str"
  ? string
  : V extends `${infer U}[]`
  ? TemplateValueReturnType<U>[]
  : never

export type NestedArray<T> = T | NestedArray<T>[]
