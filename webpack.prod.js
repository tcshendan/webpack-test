const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const scriptLoader = [
    {
        loader: 'babel-loader'
    }
]

const cssLoader = [
    {
        loader: 'css-loader'
    },
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: [
                require('postcss-sprites')({
                    spritePath: 'dist/assets/imgs/sprites'
                })
            ]
        }
    },
    {
        loader: 'less-loader'
    }
]

const styleLoader = ExtractTextWebpackPlugin.extract({
    fallback: {
        loader: 'style-loader',
        options: {
            singleton: true,
            transform: './css.transform.js'
        }
    },
    use: cssLoader
})

const imageLoader = [
    {
        loader: 'url-loader',
        options: {
            name: '[name]-[hash:5].min.[ext]',
            limit: 2000,
            publicPath: './assets/imgs/',
            outputPath: 'assets/imgs/'
        }
    },
    {
        loader: 'img-loader',
        options: {
            plugins: [
                require('imagemin-pngquant')({
                    quality: '80'
                })
            ]
        }
    }
]

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
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
        new ExtractTextWebpackPlugin({
            filename: '[name]-[hash:5].min.css',
            allChunks: false
        })
    ]
})
