const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const dictionary = require('../config/dictionary')
const argv = require('yargs').argv
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
                    "style-loader",
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
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: path.resolve(__dirname, '../dist')
        }])
    ]
}

if (argv.mode === 'production') {
    for (let style of dictionary.style) {
        webpackBaseConfig.module.rules[dictionary.loaders[style]].use.unshift({
            loader: MiniCssExtractPlugin.loader
        })
    }
    webpackBaseConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: "[contentHash].css"
        })
    )
}

module.exports = webpackBaseConfig