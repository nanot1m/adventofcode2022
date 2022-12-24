// @ts-check
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 * @param {number} [scale]
 */
export function scaleCanvasToPixelRatio(ctx, width, height, scale = 1) {
  const pixelRatio = (window.devicePixelRatio ?? 1) * scale
  ctx.canvas.width = width * scale * pixelRatio
  ctx.canvas.height = height * scale * pixelRatio
  ctx.canvas.style.width = `${width * scale}px`
  ctx.canvas.style.height = `${height * scale}px`
  ctx.scale(pixelRatio, pixelRatio)
  return pixelRatio
}
