const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const threadLoader = require('thread-loader');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const EslintPluginVue= require('eslint-plugin-vue');
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const env = process.env.NODE_ENV; 
threadLoader.warmup({
    // pool options, like passed to loader options
    // must match loader options to boot the correct pool
  }, [
    // modules to load
    // can be any module, i. e.
    'babel-loader',
    'babel-preset-es2015',
    'sass-loader',
  ]),

module.exports = {
    entry: {
        main:['babel-polyfill',path.join(__dirname, './src/entry/main.js')],
        core: ['vue','vue-router','vue-i18n']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        chunkFilename:'[id].js'
    },
    watch: true,
    devtool: '#eval-source-map',
    devServer:{
        // contentBase: path.resolve(__dirname, 'dist'),
        hot:true,
        inline:true,
        publicPath:'',
        port:8002,
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
            // favicon:path.join(__dirname, './src/img/favicon.ico'),
            inject:'body',
            chunks:['main','core','vendor']
        }),
        new webpack.DefinePlugin({
            __LOCAL__: env === 'local',
            __DEV__: env === 'dev',
            __SIT__: env === 'sit',
            __UAT__: env === 'uat',
            __PROD__: env === 'prod'
        }),
        new OpenBrowserPlugin({url:'http://localhost:8002/main.html'}),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            Vue:'vue' // 下载vue
        }),
        // new EslintPluginVue(),
        // new PrerenderSPAPlugin({
        //     // Required - The path to the webpack-outputted app to prerender.
        //     staticDir: path.join(__dirname, 'dist'),
        //     // Required - Routes to render.
        //     routes: [ '/', '/r/reception_center','/r/my_reception' ],
        //   }),
        //   new BundleAnalyzerPlugin(),
        // new HardSourceWebpackPlugin({
        //     // cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中，因此如 
        //     // 果清除了node_modules，则缓存也是如此
        //     cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
        //     // Either an absolute path or relative to webpack's options.context.
        //     // Sets webpack's recordsPath if not already set.
        //     recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
        //     // configHash在启动webpack实例时转换webpack配置，并用于cacheDirectory为不同的webpack配 
        //     // 置构建不同的缓存
        //     configHash: function(webpackConfig) {
        //        // node-object-hash on npm can be used to build this.
        //        return require('node-object-hash')({sort: false}).hash(webpackConfig);
        //     },
        //     // 当加载器，插件，其他构建时脚本或其他动态依赖项发生更改时，hard-source需要替换缓存以确保输 
        //     // 出正确。environmentHash被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
        //     environmentHash: {
        //        root: process.cwd(),
        //        directories: [],
        //        files: ['package-lock.json', 'yarn.lock'],
        //     },
        // }),
        // new webpack.optimize.AggressiveSplittingPlugin(
        //     {
        //         minSize: 30000, // 字节，分割点。默认：30720
        //         maxSize: 50000, // 字节，每个文件最大字节。默认：51200
        //         // chunkOverhead: 0, // 默认：0
        //         // entryChunkMultiplicator: 1, // 默认：1
        //       }
        // )
        new HappyPack({
            id:"babel",
            loaders: ['babel-loader?cacheDirectory'],
            threadPool:happyThreadPool
        })
    ],
    optimization: {//webpack4.0打包相同代码配置
        splitChunks: {
            // maxSize:50000,
            cacheGroups: {// 单独提取JS文件引入html
                core:{
                    chunks:'initial',
                    name:'core',// 入口的entry的key
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
                options:{
                    modules: true,
                    cssModules: {
                        localIdentName: '[path][name]---[local]---[hash:base64:5]',
                        camelCase: true
                    },
                }
            },
            {
                test: /\.js$/,
                use: ['happypack/loader?id=babel','eslint-loader'],
                exclude: /node_modules/,
                include:[path.join(__dirname , 'src'),path.join(__dirname ,'node_modules/vue-socket.io')]
            },
            {
                test: /\.css$/,
                oneOf:[
                    {
                        resourceQuery: /module/,
                        use: [
                            'css-hot-loader',MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    modules: true,
                                    cssModules: {
                                        localIdentName: '[path][name]---[local]---[hash:base64:5]',
                                        camelCase: true
                                    },
                                }
                            }
                        ]
                    },
                    {
                        use:['css-hot-loader',MiniCssExtractPlugin.loader,"css-loader"]
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
                        loader: "css-loader",
                        options: {
                            modules: true,
                        //     cssModules: {
                        //         localIdentName: '[path][name]---[local]---[hash:base64:5]',
                        //         camelCase: true
                        //     },
                        }
                    }, 
                    {
                        loader: "postcss-loader",
                        options: {
                            modules: true,
                            // cssModules: {
                            //     localIdentName: '[path][name]---[local]---[hash:base64:5]',
                            //     camelCase: true
                            // },
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            modules: true,
                            // cssModules: {
                            //     localIdentName: '[path][name]---[local]---[hash:base64:5]',
                            //     camelCase: true
                            // },
                        }
                    },
                    // 'postcss-loader', 
                    // 'sass-loader'
                ]
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
                },{
                    loader:'file-loader'
                }]
            },
        ]
    },
};
