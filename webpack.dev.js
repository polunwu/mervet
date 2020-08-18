const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        alias: {
            '@img': path.resolve(__dirname, 'src/assets/images'),
            '@assets': path.resolve(__dirname, 'src/assets'),
        },
    },
    devtool: 'eval-cheap-module-source-map',
    entry: {
        index: './src/pages/home/index.js',
    },
    devServer: {
        port: 3000,
        open: true,
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    { 
                        loader: 'html-loader',
                        options: {
                            attributes: {
                                list: [
                                    {
                                        // Tag name
                                        tag: 'img',
                                        // Attribute name
                                        attribute: 'src',
                                        // Type of processing, can be `src` or `scrset`
                                        type: 'src',
                                    },
                                    {
                                        // Tag name
                                        tag: 'img',
                                        // Attribute name
                                        attribute: 'srcset',
                                        // Type of processing, can be `src` or `scrset`
                                        type: 'srcset',
                                    },
                                    { // 自訂解析 data-src
                                        tag: 'img',
                                        attribute: 'data-src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'data-srcset',
                                        type: 'srcset',
                                    },
                                    {
                                        // Tag name
                                        tag: 'link',
                                        // Attribute name
                                        attribute: 'href',
                                        // Type of processing, can be `src` or `scrset`
                                        type: 'src',
                                    },
                                ],
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.(scss|css|sass)$/,
                use: [
                    {
                        // creates style nodes from JS strings
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                    // Please note we are not running postcss here
                ]
            }
            ,
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: '[path][name].[ext]?hash=[hash:20]',
                            limit: 8192,
                        }
                    }
                ]
            },
            {
                // Load all svgs
                test: /\.svg/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]?hash=[hash:20]',
                        },
                    }
                ]
            },
            {
                // Load all fonts
                test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/pages/home/index.html',
            filename: 'index.html',
            chunks: ['index'] 
        })
    ]
};
