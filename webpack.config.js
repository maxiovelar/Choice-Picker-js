const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');



module.exports = {

    mode: 'development',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    module: {
        rules: [
        
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
            filename: '[name].css',
            ignoreOrder: false
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body'
        }),
    ]

}