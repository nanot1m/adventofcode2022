// @ts-check
// https://stackoverflow.com/a/42919752

const top = 0
const parent = (/** @type {number} */ i) => ((i + 1) >>> 1) - 1
const left = (/** @type {number} */ i) => (i << 1) + 1
const right = (/** @type {number} */ i) => (i + 1) << 1

/**
 * @template T
 */
export class PriorityQueue {
  /**
   *
   * @param {(a: T, b: T) => number} comparator
   */
  constructor(comparator = (a, b) => Number(a > b)) {
    /** @type {T[]} @private */
    this._heap = []
    /** @private */
    this._comparator = comparator
  }
  size() {
    return this._heap.length
  }
  isEmpty() {
    return this.size() == 0
  }
  peek() {
    return this._heap[top]
  }
  /**
   * @param  {T[]} values
   * @returns
   */
  push(...values) {
    values.forEach((value) => {
      this._heap.push(value)
      this._siftUp()
    })
    return this.size()
  }
  pop() {
    const poppedValue = this.peek()
    const bottom = this.size() - 1
    if (bottom > top) {
      this._swap(top, bottom)
    }
    this._heap.pop()
    this._siftDown()
    return poppedValue
  }
  /**
   * @param {T} value
   */
  replace(value) {
    const replacedValue = this.peek()
    this._heap[top] = value
    this._siftDown()
    return replacedValue
  }
  /**
   * @param {number} i
   * @param {number} j
   * @private
   */
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]) < 0
  }
  /**
   * @param {number} i
   * @param {number} j
   * @private
   */
  _swap(i, j) {
    ;[this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]]
  }
  /**
   * @private
   */
  _siftUp() {
    let node = this.size() - 1
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node))
      node = parent(node)
    }
  }
  /**
   * @private
   */
  _siftDown() {
    let node = top
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild =
        right(node) < this.size() && this._greater(right(node), left(node))
          ? right(node)
          : left(node)
      this._swap(node, maxChild)
      node = maxChild
    }
  }
}
