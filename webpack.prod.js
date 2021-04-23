const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');
const glob = require('glob');

const PATHS = {
    src: path.join(__dirname, 'src')
  }

module.exports = {

    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    output: {
        filename: 'main.[contenthash].js',
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name][ext][query]'
    },
    module: {
        rules: [
            {

                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader'
                }

            },
        
            {

                test: /\.css$/,
                exclude: /bulma\.css$/,
                use: [
                    'style-loader', 
                    'css-loader'
                ]

            },

            {

                test: /bulma\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]

            },

            {

                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: false
                },

            },

            {
                test: /\.(?:ico|gif|png|svg|jpg|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext][query]'
                }
            }

        ]
    },
    
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
          }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body'
        }),
        new TerserPlugin(),
    ]

}