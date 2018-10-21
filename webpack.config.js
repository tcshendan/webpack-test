const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

// module.exports = {
//     entry: {
//         pageA: './src/pageA.js',
//         pageB: './src/pageB.js'
//     },
//     output: {
//         filename: '[name].bundle.js',
//         path: path.join(__dirname, 'dist'),
//         chunkFilename: '[name].chunk.js'
//     },
//     optimization: {
//         splitChunks: {
//             chunks: 'all'
//         }
//     }
// }

// module.exports = {
//     entry: {
//         pageA: './src/pageA.js',
//         pageB: './src/pageB.js'
//     },
//     output: {
//         filename: '[name].bundle.js',
//         path: path.join(__dirname, 'dist'),
//         chunkFilename: '[name].chunk.js'
//     },
//     optimization: {
//         splitChunks: {
//             cacheGroups: {
//                 common: {
//                     name: 'common',
//                     chunks: 'all',
//                     minSize: 1,
//                     priority: 0
//                 },
//                 vendor: {
//                     name: 'vendor',
//                     test: /[\\/]node_modules[\\/]/,
//                     chunks: 'all',
//                     priority: 10
//                 }
//             }
//         }
//     }
// }

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: __dirname + '/dist/',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['> 1%', 'last 2 versions']
                                }
                            }]
                        ],
                        plugins: [
                            require('@babel/plugin-transform-runtime'),
                            require('@babel/plugin-syntax-dynamic-import')
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true,
                            transform: './css.transform.js'
                        }
                    },
                    use: [{
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                // localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            }
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
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         publicPath: './assets/imgs/',
                    //         outputPath: 'assets/imgs/'
                    //     }
                    // }
                    {
                        loader: 'url-loader',
                        options: {
                            name: "[name].min.[ext]",
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
            filename: '[name].min.css',
            allChunks: false
        })
    ]
}
