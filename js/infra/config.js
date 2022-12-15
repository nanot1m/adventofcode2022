// @ts-check
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const DIRNAME = dirname(fileURLToPath(import.meta.url))

export const config = {
  envPath: resolve(DIRNAME, "../../.env"),
  solutionsDir: resolve(DIRNAME, "../solutions"),
  inputDir: resolve(DIRNAME, "../../input"),
  templatePath: resolve(DIRNAME, "template.js"),
}
