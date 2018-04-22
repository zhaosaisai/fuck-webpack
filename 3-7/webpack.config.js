const webpack = require('webpack')
const path = require('path')

module.exports = {
    // 多入口的情况下才能提取公用代码块
    entry: {
        pageA: './pageA.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        chunkFilename: '[name].chunk.js'
    }
}