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

export type NestedArray<T> = T | NestedArray<T>[]

export interface GenericFluentIterable<T> extends Iterable<T> {
  map: <R>(fn: (arg: T) => R) => FluentIterable<R>
  groupsOf: (n: number) => FluentIterable<T[]>
  toArray: () => T[]
  first: () => T | undefined
  last: () => T | undefined
  find: (predicate: (arg: T) => boolean) => T | undefined
  skip: (n: number) => FluentIterable<T>
  take: (n: number) => FluentIterable<T>
  toSet: () => Set<T>
  reduce: <R>(reducer: (arg0: R, arg1: T) => R, init: R) => R
  forEach: (fn: (arg: T) => void) => void
  count: (predicate?: (arg: T) => boolean) => number
  filter: (predicate: (arg: T) => boolean) => FluentIterable<T>
  indexed: () => FluentIterable<[number, T]>
  windowed: (n: number) => FluentIterable<Iterable<T>>
  findIndex: (predicate: (arg: T) => boolean) => number
  indexOf: (value: T) => number
  flatMap: <R>(f: (arg: T) => Iterable<R>) => FluentIterable<R>
  skipLast: (n?: number) => FluentIterable<T>
  takeEvery: (every: number, skipInitial?: number) => FluentIterable<T>
  takeWhile: (predicate: (arg: T) => boolean) => FluentIterable<T>
  takeUntil: (predicate: (arg: T) => boolean) => FluentIterable<T>
  every: (predicate: (arg: T) => boolean) => boolean
  updateAt: (index: number, fn: (arg: T) => T) => FluentIterable<T>
  unshift: (...values: T[]) => FluentIterable<T>
  skipAfter: (predicate: (arg: T) => boolean) => FluentIterable<T>
}

export interface NumFluentIterable extends GenericFluentIterable<number> {
  sum: () => number
  min: () => number
  max: () => number
}

export interface StrFluentIterable extends GenericFluentIterable<string> {
  join: (separator?: string) => string
}

export type FluentIterable<T> = T extends number
  ? NumFluentIterable
  : T extends string
  ? StrFluentIterable
  : GenericFluentIterable<T>
