// @ts-check
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 * @param {number} [scale]
 */
export function scaleCanvasToPixelRatio(ctx, width, height, scale) {
  const pixelRatio = scale ?? window.devicePixelRatio ?? 1
  ctx.canvas.width = width * pixelRatio
  ctx.canvas.height = height * pixelRatio
  ctx.canvas.style.width = `${width}px`
  ctx.canvas.style.height = `${height}px`
  ctx.scale(pixelRatio, pixelRatio)
  return pixelRatio
}
