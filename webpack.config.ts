import * as path from 'path'
import * as webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'

const config: webpack.Configuration = {
    mode: 'production',
    target: 'node',
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
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

export default config;