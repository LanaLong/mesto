const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';
const isProduct = !isDev;

// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');


module.exports = {
    // context: path.resolve(__dirname, 'src'),
    entry: { main: './src/js/script.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: { loader: "babel-loader" },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    'file-loader?name=../dist/images/[name].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                            disable: true,
                        }
                    },
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=../dist/vendor/[name].[ext]'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        })
    ]
};


// {
//     test: /\.css$/,
//     use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
// },
// {
//     test: /\.(png|jpe?g|gif)$/i,
//     use: [
//         {
//             loader: 'file-loader',
//         },
//     ],
// },
// {
//     test: /\.css$/i,
//     use: [
//         (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
//         'css-loader',
//         'postcss-loader'
//     ]
// },  // в правилах укажите, что если вы собираете в режиме dev, то плагин MiniCssExtractPlugin загружать не нужно