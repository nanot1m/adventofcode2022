// @ts-check
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 */
export function scaleCanvasToPixelRatio(ctx, width, height) {
  const pixelRatio = window.devicePixelRatio || 1
  ctx.canvas.width = width * pixelRatio
  ctx.canvas.height = height * pixelRatio
  ctx.canvas.style.width = `${width}px`
  ctx.canvas.style.height = `${height}px`
  ctx.scale(pixelRatio, pixelRatio)
}
