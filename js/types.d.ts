interface RotateFn {
  (rotatable: string, clockwise?: boolean): string
  (rotatable: string[], clockwise?: boolean): string[]
  <R>(rotatable: R[][], clockwise?: boolean): R[][]
}
