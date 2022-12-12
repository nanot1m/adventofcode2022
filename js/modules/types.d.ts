export interface RotateFn {
  (rotatable: string, clockwise?: boolean): string
  (rotatable: string[], clockwise?: boolean): string[]
  <R>(rotatable: R[][], clockwise?: boolean): R[][]
}

export type TemplateKey<T> = T extends `${infer K}|${infer _}` ? K : T

export type TemplateValue<T> = T extends `${infer _}|${infer V}`
  ? TemplateValueHelper<V>
  : string

type TemplateValueHelper<V> = V extends "int"
  ? number
  : V extends "str"
  ? string
  : V extends `${infer U}[]`
  ? TemplateValueHelper<U>[]
  : never
