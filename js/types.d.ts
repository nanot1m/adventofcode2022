declare global {
  interface RotateFn {
    (rotatable: string, clockwise?: boolean): string
    (rotatable: string[], clockwise?: boolean): string[]
    <R>(rotatable: R[][], clockwise?: boolean): R[][]
  }

  type ParserType =
    | { type: "str" }
    | { type: "num" }
    | { type: "bool" }
    | { type: "arr"; item: ParserType; separator?: string }
    | { type: "tuple"; items: ParserType[]; separator?: string }

  type ParserTypeValue<T extends ParserType> = T extends { type: "str" }
    ? string
    : T extends { type: "num" }
    ? number
    : T extends { type: "bool" }
    ? boolean
    : T extends { type: "arr"; item: ParserType; separator?: string }
    ? ParserTypeValue<T["item"]>[]
    : T extends { type: "tuple"; items: ParserType[]; separator?: string }
    ? { [K in keyof T["items"]]: ParserTypeValue<T["items"][K]> }
    : never

  type TemplateKey<T> = T extends `${infer K}|${infer _}` ? K : T

  type TemplateValue<T> = T extends `${infer _}|${infer V}`
    ? TemplateValueHelper<V>
    : string
}

type TemplateValueHelper<V> = V extends "int"
  ? number
  : V extends "str"
  ? string
  : V extends `${infer U}[]`
  ? TemplateValueHelper<U>[]
  : never

export {}
