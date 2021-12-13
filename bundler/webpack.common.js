const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: {
            
                index: path.resolve(__dirname, '../src/script.js'), 

            },

    output:
    {
        filename: 'bundle.[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, '../static/assets'),
                    to: 'assets',
                    noErrorOnMissing: true 
                }
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            minify: true
        }),
        new MiniCSSExtractPlugin()
    ],

    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.scss$/,
                use:
                [
                    MiniCSSExtractPlugin.loader, // 3. Inject styles into dom
                    'css-loader', //2. Turns css into common.js
                    'sass-loader' //1. Turns sass to css
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },

            // Videos
            {
                test: /\.(mp4|mov)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'videos/[hash][ext][query]'
                }
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            },

             // Shaders
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader'
                ]
            }
        ]
    }
}
