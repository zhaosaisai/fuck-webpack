const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

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
                use: ExtractTextWebpackPlugin.extract({
                    //  这个参数表示提取失败的时候，应该使用什么方法去处理提取出来的样式
                    fallback: {
                        loader: 'style-loader',
                        // 生成一个url，link标签引入，依赖于file-loader
                        // loader: 'style-loader/url'
                        options: {
                            // insertInto: '#app',
                            singleton: true
                        }
                    },
                    use:[
                            {
                                loader: 'css-loader',
                                options: {
                                    // minimize: true,
                                    modules: true,
                                    // localIdentName: 定义css module生成的类名
                                    localIdentName: '[path] [name]_[local]_[hash:base64:5]'
                                }
                                // loader: 'file-loader',
                            },
                            {
                                // 使用postcss-loader
                                loader: 'postcss-loader',
                                // postcss的选项

                                // 不起作用的
                                options: {
                                    ident: 'postcss',
                                    plugins: [
                                        // require('autoprefixer')(),
                                        require('postcss-cssnext')()
                                    ]
                                }
                            },
                            {
                                loader: 'less-loader'
                            }
                        ]
                })
            }, 
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            // 用于lodash的tree shaking
                            plugins: ['lodash']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css',
            // 指定提取的范围，默认是false，表示只会提取初始化的css样式
            // 异步组件中加载的样式是不会提取的
            allChunks: false
        }),
        
        
        // 开始使用tree shaking
        // 直接使用这个压缩插件，是本地的tree shaking的一种方式，会把代码中没有用到的全部移除
        new webpack.optimize.UglifyJsPlugin()
    ]
}