const argv = require('yargs').argv
const utils = require('./utils')

const isProduction = argv.mode === 'production'
const sourceMapEnabled = isProduction
  ? false
  : true

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: true,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}