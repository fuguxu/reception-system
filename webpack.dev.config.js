const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const env = process.env.NODE_ENV; 

module.exports = {
    entry: [
        path.join(__dirname, './src/entry/main.js')
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        chunkFilename:'[id].js'
    },
    watch: true,
    devtool: '#eval-source-map',
    devServer:{
        contentBase: path.join(__dirname, 'dist'),
        hot:true,
        inline:true,
        publicPath:'',
        port:8001,
        host:'localhost',
        stats:{cached:false,colors:true},
        disableHostCheck: true
    },
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
        new OpenBrowserPlugin({url:'http://localhost:8001/main.html'}),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
    ],
    optimization: {//webpack4.0打包相同代码配置
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
                        name:'img/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:10000,
                        name:'fonts/[name].[ext]'
                    }
                }]
            },
        ]
    },
};
