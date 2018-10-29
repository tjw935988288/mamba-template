const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const dictionary = require('../config/dictionary')
const argv = require('yargs').argv

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const webpackBaseConfig = {
    entry: {
        app: resolve('src/index.js')
    },
    output: {
        path: resolve('dist'),
        filename: '[name]-[hash].bundle.js',
        chunkFilename: '[name]-[chunkhash].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
            {
                test: /.less$/,
                use: [
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "css-loader"
                ]
            }
        ]
    }
}

if (argv.mode === 'production') {
    for (let style of dictionary.style) {
        webpackBaseConfig.module.rules[dictionary.loaders[style]].use.unshift({
            loader: MiniCssExtractPlugin.loader
        })
    }
    webpackBaseConfig.plugins = []
    webpackBaseConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: "[contentHash].css"
        })
    )
}

module.exports = webpackBaseConfig