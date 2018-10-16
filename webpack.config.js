const path = require('path');

module.exports = {
    entry: {
        pageA: './src/pageA.js',
        pageB: './src/pageB.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist'),
        chunkFilename: '[name].chunk.js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}

// module.exports = {
//     entry: {
//         index: './src/index.js'
//     },
//     output: {
//         filename: '[name].bundle.js',
//         path: path.join(__dirname, 'dist')
//     },
//     module: {
//         rules: [{
//             test: /\.js$/,
//             exclude: /(node_modules)/,
//             use: {
//                 loader: 'babel-loader',
//                 options: {
//                     presets: [
//                         ['@babel/preset-env', {
//                             targets: {
//                                 browsers: ['> 1%', 'last 2 versions']
//                             }
//                         }]
//                     ],
//                     plugins: [require('@babel/plugin-transform-runtime')]
//                 }
//             }
//         }]
//     }
// }
