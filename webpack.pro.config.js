const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const env = process.env.NODE_ENV; 

module.exports = {
    entry: {
        main:path.join(__dirname, './src/entry/main.js'),
        core: ['vue','vue-router','vue-i18n']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename:'js/[hash:8].[name].min.js',
        chunkFilename:'js/[hash:8].[id].min.js'
    },
    // watch: true,
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
            chunks:['main','core']
        }),
        new webpack.DefinePlugin({
            __LOCAL__: env === 'local',
            __DEV__: env === 'dev',
            __SIT__: env === 'sit',
            __UAT__: env === 'uat',
            __PROD__: env === 'prod'
        }),
        new CleanWebpackPlugin(['dist']),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[hash:8].[name].min.css',
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            Vue:'vue' // 下载vue
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: { map: { inline: false } }
            })
        ],
        splitChunks: {
            cacheGroups: {
                core:{
                    chunks:'initial',
                    name:'core',
                    enforce:true
                },
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
