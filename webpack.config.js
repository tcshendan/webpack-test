const path = require('path');

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
        page2: './src/page2.js'
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
        }]
    }
}
