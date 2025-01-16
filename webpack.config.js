const path = require('path')
const nodeExternals = require('webpack-node-externals')

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
        clean: true
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@data': path.resolve(__dirname, 'data_pool'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                    }
                ],
                exclude: /node_modules/
            }
        ]
    }
}
