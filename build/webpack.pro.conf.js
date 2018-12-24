const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const os = require('os')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const glob = require('glob-all')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.conf.js')
const merge = require('webpack-merge')
const webpack = require('webpack')

const proWebpackConfig = merge(webpackBaseConfig, {
    plugins: [
        new CleanWebpackPlugin(['../dist'], {
            allowExternal: true
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, '../src/*.js'),
                path.join(__dirname, '../index.html')
            ]),
        }),
        new OptimizeCss({
            assetNameRegExp: /[\d\D]\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        moduleIds: 'hashed',
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: os.cpus().length - 1,
                uglifyOptions: {
                    ecma: 8,
                    output: {
                      beautify: false,
                    },
                    compress: {
                        drop_console: false
                    }
                }
            })
        ],
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /\/node_modules\//
                },
                styles: {            
                    name: 'less',
                    test: /\.less$/,
                    chunks: 'all'
                }
            }
        }
    }
})

module.exports = proWebpackConfig