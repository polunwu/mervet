const path = require('path');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin'); // create CNAME file

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
    resolve: {
        alias: {
            '@img': path.resolve(__dirname, 'src/assets/images'),
            '@assets': path.resolve(__dirname, 'src/assets'),
        },
    },
    devtool: 'source-map',
    entry: {
        index: './src/pages/home/index.js',
    },
    output: {
        filename: './assets/js/[name].[chunkhash:8].js',
        path: buildPath
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
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // ! 注意！
                            // 因為自訂了 MiniCssExtractPlugin 檔案路徑
                            // 會造成 css 內的 background-image url 路徑解析錯誤
                            // 因此要將 public path 指回根目錄
                            publicPath: '../../'
                        }
                    },
                    {
                        // translates CSS into CommonJS
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // Runs compiled CSS through postcss for vendor prefixing
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                ]
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash:20].[ext]',
                            limit: 8192,
                            outputPath: 'assets/images'
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
                            name: '[name].[hash:20].[ext]',
                            outputPath: 'assets/images',
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
                        options: {
                            outputPath: 'assets/fonts',
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pages/home/index.html',
            filename: 'index.html',
            chunks: ['index'] 
        }),
        new CleanWebpackPlugin(buildPath),
        new FaviconsWebpackPlugin({
            // Your source logo
            logo: './src/assets/images/icon.png',
            // The prefix for all image files (might be a folder or a name)
            prefix: 'icons-[hash]/',
            // Generate a cache file with control hashes and
            // don't rebuild the favicons until those hashes change
            persistentCache: true,
            // Inject the html into the html-webpack-plugin
            inject: true,
            // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
            background: '#fff',
            // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
            title: 'Mervét｜梅爾瓦特',

            // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: './assets/css/[name].[contenthash].css',
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                map: {
                    inline: false,
                },
                discardComments: {
                    removeAll: true
                },
                discardUnused: false
            },
            canPrint: true
        }),
        new CnameWebpackPlugin({
            domain: 'mervetskin.com',
        }),
    ]
};
