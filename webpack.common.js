const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: '[name]-[hash:5].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name]-[hash:5].chunk.js'
    },
    resolve: {
        // 配置别名
        alias: {
            jQuery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks: ['app'], // entry中的app入口才会被打包
            minify: {
                // 压缩选项
                collapseWhitespace: true
            }
        }),
        new CleanWebpackPlugin(['dist'])
    ]
}