const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

module.exports = class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.done.tap(pluginName, compilation => {
            console.log("webpack 构建完成");
        });

        compiler.plugin('emit', (compilation, callback) => {
            var fileList = 'In this build:\n\n';
            for (var asset in compilation.assets) {
                fileList += ('-' + asset + '\n')
            }

            compilation.assets['filelist.md'] = {
                source() {
                    return fileList
                },
                size() {
                    return fileList.length
                }
            }

            callback()
        })
    }
}