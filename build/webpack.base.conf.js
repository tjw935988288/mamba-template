const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const dictionary = require('../config/dictionary')
const argv = require('yargs').argv
const CopyWebpackPlugin = require('copy-webpack-plugin')
const vueLoaderConfig = require('./vue-loader.conf')

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
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
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
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'fonts/[name].[hash:7].[ext]'
                }
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