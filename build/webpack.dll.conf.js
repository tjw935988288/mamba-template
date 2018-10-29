const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')

module.exports = {
    entry: {
        vendor: Object.keys(pkg.dependencies)
    },
    output: {
        // manifest.json输出路径
        path: path.join(__dirname, '..'),
        // 输出文件名
        filename: '[name].dll.js',
        // 默认的library: var, 通过script标签引入输出文件时，返回值会赋值给library的值
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            // mainfest文件中请求的上下文，要与DllReferencePlugin中的保持一致
            context: __dirname,
            // manifest.json文件的输出路径
            path: path.join(__dirname, '..', '[name]-manifest.json'),
            // 暴露出的dll的函数名，需要与输出文件中暴露的名字相同
            name: '[name]_library'
        })
    ]
}