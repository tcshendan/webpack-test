module.exports = {
    root: true,
    extends: 'standard',
    plugins: [
        'html'
    ],
    env: {
        browser: true,
        node: true
    },
    parser: 'babel-eslint',
    rules: {
        indent: ['error', 4]
    }
}
