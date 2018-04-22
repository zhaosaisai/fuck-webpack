const webpack = require('webpack')
const path = require('path')

module.exports = {
    // 多入口的情况下才能提取公用代码块
    entry: {
        pageA: './pageA.js',
        pageB: './pageB.js',
        // 打包第三方的包
        vendor: ['lodash']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        // 可以新建多个实例，用于打包公共的业务代码和第三方的代码

        // 用于打包公共的业务代码
        new webpack.optimize.CommonsChunkPlugin({
            // 可以在output中，通过chunkFilename来引用这个名字
            // name: 'common',
            // minChunks: 2
            name: 'common',
            minChunks: 2,
            // 没有这个选项会报错
            // ERROR in CommonsChunkPlugin: While running in normal mode it's not allowed to use a non-entry chunk (vendor)
            chunks: ['pageA', 'pageB']
        }),
        // 用于打包第三方的代码
        new webpack.optimize.CommonsChunkPlugin({
            // 可以在output中，通过chunkFilename来引用这个名字
            // name: 'common',
            // minChunks: 2
            name: 'vendor',
            minChunks: Infinity
        }),
        // 用于打包webpack自己生成的代码
        new webpack.optimize.CommonsChunkPlugin({
            // 可以在output中，通过chunkFilename来引用这个名字
            // name: 'common',
            // minChunks: 2
            name: 'manifest',
            minChunks: Infinity
        }),
        /* 
            上面的两个配置等价于
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor', 'manifest'],
                minChunks: Infinity
            }),
        */
    ]
}