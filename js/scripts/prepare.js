// @ts-check

import { execSync } from "node:child_process"
import { join } from "node:path"
import { config } from "../infra/config.js"

const day = process.argv[2]

execSync(`mkdir -p ${config.solutionsDir}`)
execSync(`cp ${config.templatePath} ${join(config.solutionsDir, `${day}.js`)}`)
