const fs = require('node:fs')
const path = require('node:path')

const ES_MODULE_PATTERN = /"type":\s*"module"/
/** @type {string[]} */
const transformIgnorePatterns = []
require('glob').sync('node_modules/**/package.json', { dot: true }).forEach(pkgJsonPath => {
  if (ES_MODULE_PATTERN.test(fs.readFileSync(pkgJsonPath, 'utf8'))) {
    transformIgnorePatterns.push(path.dirname(pkgJsonPath).replaceAll('/', '\\'))
  }
})

/** @type {import('@swc/core').Config} */
const swcConfig = {
  sourceMaps: true
}

/** @type {import('jest').Config} */
module.exports = {
  rootDir: "src",
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', swcConfig],
  },
  transformIgnorePatterns
}
