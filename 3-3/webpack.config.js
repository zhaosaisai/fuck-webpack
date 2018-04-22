module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: '[name].[hash:6].js'
    },
    // 
    module: {
        rules: [
            {
                test: /\.js$/,
                // 可以在options中或者.babelrc文件中指定详细的设置
                use: {
                    loader: 'babel-loader'
                },
                exclude: '/node_modules/'
            }
        ]
    }
}