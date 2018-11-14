const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const os = require('os')
const path = require('path')

const devWebpackConfig = merge(webpackBaseConfig, {
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../vendor-manifest.json')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../test/index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: os.cpus().length - 1
            })
        ]
    },
    devServer:{
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',
        port: 8080,
        open: true,
        hot: true
    }
})

module.exports = devWebpackConfig