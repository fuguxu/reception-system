
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const env = process.env.NODE_ENV;
const HappyPack = require('happypack');
const threadLoader = require('thread-loader');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const FileListPlugin = require('./webpackPlugin/fileListPlugin');
const WatchFilePlugin = require('./webpackPlugin/watchFilePlugin');
threadLoader.warmup({
    // pool options, like passed to loader options
    // must match loader options to boot the correct pool
}, [
        // modules to load
        // can be any module, i. e.
        'babel-loader',
        'babel-preset-es2015',
        'sass-loader',
    ]);
const cssModuleOption = {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    cssModules: {
        camelCase: true,
        sourceMaps:true
    },
};
const DEV = env === 'local';
module.exports = {
    entry: {
        main: [path.join(__dirname, './src/entry/main.js')],
        core: ['vue', 'vue-router']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: DEV ? '[name].js' : 'js/[hash:8].[name].min.js',
        chunkFilename: DEV ? '[id].js' : 'js/[hash:8].[name].min.js'
    },

    resolve: {
        extensions: ['.js', '.vue', '.css', '.png', '.jpg'],
        alias: {
            '@':path.resolve(__dirname,'src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/html/main.html'),
            filename: 'main.html',
            chunksSortMode: 'dependency',
            // favicon:path.join(__dirname, './src/img/favicon.ico'),
            inject: 'body',
            chunks: ['main', 'core', 'vendor']
        }),
        new webpack.DefinePlugin({
            __LOCAL__: env === 'local',
            __DEV__: env === 'dev',
            __SIT__: env === 'sit',
            __UAT__: env === 'uat',
            __PROD__: env === 'prod'
        }),
        new FileListPlugin({text:'我是手写插件并传进去的参数'}),
        new WatchFilePlugin({}),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            filename: DEV ? 'css/[name].css' : 'css/[hash:8].[name].min.css',
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            Vue: [path.resolve('node_modules/vue/dist/vue.esm.js'),'default'] // 下载vue
        }),

        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory'],
            threadPool: happyThreadPool
        })
    ],
    optimization: { // webpack4.0打包相同代码配置
        splitChunks: {
            // maxSize:50000,
            cacheGroups: {// 单独提取JS文件引入html
                core: {
                    chunks: 'initial',
                    name: 'core',// 入口的entry的key
                    enforce: true
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
                options: cssModuleOption
            },
            {
                test: /\.js$/,
                use: ['happypack/loader?id=babel', 'eslint-loader'],
                exclude: /node_modules/,
                include: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules/vue-socket.io')]
            },
            {
                test: /\.css$/,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            'css-hot-loader', MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: cssModuleOption

                            }
                        ]
                    },
                    {
                        use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader']
                    }
                ],
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    // 'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: cssModuleOption
                    },
                    {
                        loader: 'postcss-loader',
                        options: cssModuleOption
                    },
                    {
                        loader: 'sass-loader',// sass-loader 也支持一个 data 选项，这个选项允许你在所有被处理的文件之间共享常见的变量，而不需要显式地导入它们：
                        options: Object.assign({},cssModuleOption,{
                            data:'$globalColor: red;' // // 你也可以从一个文件读取，例如 `variables.scss`
                        })
                    },
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: DEV ? 'img/[name].[ext]' : 'img/[hash:8].[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: DEV ? 'fonts/[name].[ext]' : 'fonts/[hash:8].[name].[ext]'
                    }
                },
            ]
            },
        ]
    }
};