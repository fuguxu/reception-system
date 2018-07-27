const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const env = process.env.NODE_ENV; 

module.exports = {
    entry: [
        "babel-polyfill",
        path.join(__dirname, './src/entry/main.js')
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename:'js/[hash:8].[name].min.js',
        chunkFilename:'js/[hash:8].[id].min.js'
    },
    watch: true,
    devtool: '#source-map',
    resolve:{
        extensions:['.js', '.vue','.css', '.png', '.jpg'],
        alias:{}
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.join(__dirname, './src/html/main.html'),
            filename:'main.html',
            chunksSortMode:'dependency',
            favicon:path.join(__dirname, './src/img/favicon.ico'),
            inject:'body',
            chunks:['main','vendor']
        }),
        new webpack.DefinePlugin({
            __LOCAL__: env === 'local',
            __DEV__: env === 'dev',
            __SIT__: env === 'sit',
            __UAT__: env === 'uat',
            __PROD__: env === 'prod'
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[hash:8].[name].min.css',
            allChunks: true
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: { safe: true, map: { inline: false } }
            })
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    minChunks: 2,
                    name: 'vendor',
                },
          }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.join(__dirname , 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['css-hot-loader',MiniCssExtractPlugin.loader,"css-loader"]
            },
            {
                test: /\.(scss|sass)$/,
                use: ['css-hot-loader',MiniCssExtractPlugin.loader,"css-loader", 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:10000,
                        name:'img/[hash:8].[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:10000,
                        name:'fonts/[hash:8].[name].[ext]'
                    }
                }]
            },
        ]
    },
};
