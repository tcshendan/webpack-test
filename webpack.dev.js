const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const scriptLoader = [
    {
        loader: 'babel-loader'
    },
    {
        loader: 'eslint-loader',
        options: {
            formatter: require('eslint-friendly-formatter')
        }
    }
]

const cssLoader = [
    {
        loader: 'css-loader',
        options: {
            // modules: true,
            // localIdentName: '[path][name]_[local]_[hash:base64:5]',
            sourceMap: true
        }
    },
    {
        loader: 'less-loader',
        options: {
            sourceMap: true
        }
    }
]

const styleLoader = [
    {
        loader: 'style-loader'
    }
].concat(cssLoader)

const imageLoader = [
    {
        loader: 'file-loader',
        options: {
            publicPath: './assets/imgs/',
            outputPath: 'assets/imgs/'
        }
    }
]

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 9001,
        hot: true,
        overlay: true,
        proxy: {
            // 跨域代理转发
            '/comments': {
                target: 'https://m.weibo.cn',
                changeOrigin: true,
                logLevel: 'debug'
            }
        },
        historyApiFallback: {
            // HTML5 history模式
            rewrites: [{
                from: /^\/abc$/,
                to: '/'
            }]
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: scriptLoader
            },
            {
                test: /\.less$/,
                use: styleLoader
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src']
                    }
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: imageLoader
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name]-[hash:5].[ext]',
                        limit: 2000,
                        publicPath: './assets/fonts/',
                        outputPath: 'assets/fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
})
