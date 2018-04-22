const path = require('path')
module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        // publicPath: path.resolve(__dirname, 'dist/')
        publicPath: './dist/'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        // 生成一个url，link标签引入，依赖于file-loader
                        // loader: 'style-loader/url'
                        options: {
                            // insertInto: '#app',
                            singleton: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules: true,
                            // localIdentName: 定义css module生成的类名
                            localIdentName: '[path] [name]_[local]_[hash:base64:5]'
                        }
                        // loader: 'file-loader',
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            }
        ]
    }
}