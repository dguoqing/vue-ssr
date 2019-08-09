const path = require('path')                            //path是Nodejs中的基本包,用来处理路径
const HtmlWebpackPlugin = require('html-webpack-plugin')       //引入html-webpack-plugin
const webpack = require("webpack")                      //引入webpack
const ExtractPlugin = require("extract-text-webpack-plugin")
const merge = require('webpack-merge')//合并webpack
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === "development"    //判断是否为测试环境,在启动脚本时设置的环境变量都是存在于process.env这个对象里面的

const defaultPlugins = [
    new webpack.DefinePlugin({                      //主要作用是在此处可以根据isdev配置process.env,一是可以在js代码中可以获取到process.env,
        'process.env': {                             //二是webpack或则vue等根据process.env如果是development,会给一些特殊的错误提醒等,而这些特殊项在正式环境是不需要的
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HtmlWebpackPlugin({                         //引入HtmlWebpackPlugin
            template: path.join(__dirname, 'template.html')
    }),
    new VueClientPlugin()                           //默认生成这个文件vue-ssr-client-manifest.json
]
const devServer = {                                //这个devServer的配置是在webpack2.x以后引入的,1.x是没有的
    port: 3000,                                     //访问的端口号
    host: '0.0.0.0',                              //可以设置0.0.0.0 ,这样设置你可以通过127.0.0.1或则localhost去访问
    overlay: {
        errors: true,                               //编译中遇到的错误都会显示到网页中去
    },
    // open: true ,                                 //项目启动时,会默认帮你打开浏览器
    hot: true ,                                      //在单页面应用开发中,我们修改了代码后是整个页面都刷新,开启hot后,将只刷新对应的组件
    headers: {'Access-Control-Allow-Origin': '*'},  //解决本地出现跨域问题
    historyApiFallback: {                           //允许手动在地址栏中输入地址跳转，路由匹配，
        index: '/public/index.html'                            //路径和publicPath有关系
    }
}

let config

if (isDev) {//开发环境
    config = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        'vue-style-loader',                     //将css写入到html中去,vue开发时使用vue-style-loader
                        {
                            loader: "css-loader" ,                 //css-loader处理css
                            options: {
                                module: true,                   //开启了CSSModules,使用import引入的css样式使用了CSSModules，例如：footer
                                localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,            //stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
                            }                               //那么postcss-loader可以直接引用前面的sourceMap
                        },
                        'stylus-loader'                     //处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
                    ]
                },
                {
                    test: /\.less/,
                    use: [
                        'vue-style-loader',                     //将css写入到html中去,vue开发时使用vue-style-loader
                        {
                            loader: "css-loader" ,                 //css-loader处理css
                            options: {
                                module: false,                   //开启了CSSModules,使用import引入的css样式使用了CSSModules，例如：footer
                                localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,            //less-loader和postcss-loader自己都会生成sourceMap,如果前面less-loader已生成了sourceMap
                            }                               //那么postcss-loader可以直接引用前面的sourceMap
                        },
                        'less-loader'                     //处理less的css预处理器的问题件,转换成css后,抛给上一层的css-loader
                    ]
                }
            ]
        },
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),//添加两个插件用于hot:true的配置
            // new webpack.NoEmitOnErrorsPlugin()
        ])
    })                                            //如果是测试环境下的一些配置
} else {//正式环境
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/client-entry.js'),
            // vendor: ['vue']   //第三方的插件单独打包，利用浏览器缓存，可以节省加载时间和流量
        },
        output: {
            filename: '[name].[chunkhash:8].js',  //此处一定是chunkhash,因为用hash时app和vendor的hash码是一样的了,这样每次业务代码更新,vendor也会更新,也就没有了意义.
            publicPath:'/public/'
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader',                       //css-loader处理css
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,            //stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
                                }                               //那么postcss-loader可以直接引用前面的sourceMap
                            },
                            'stylus-loader'                     //处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
                        ]
                    })
                },
                {
                    test: /\.less/,
                    use: ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader',                       //css-loader处理css
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,            //less-loader和postcss-loader自己都会生成sourceMap,如果前面less-loader已生成了sourceMap
                                }                               //那么postcss-loader可以直接引用前面的sourceMap
                            },
                            'less-loader'                     //处理less的css预处理器的问题件,转换成css后,抛给上一层的css-loader
                        ]
                    })
                },
            ]
        },
        optimization:{
            splitChunks:{
                chunks:"all"
            },
            runtimeChunk:true
        },
        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),   //定义打包分离出的css文件名
            // new webpack.optimize.CommonsChunkPlugin({          //定义静态文件打包
            //     name: 'vendor'
            // }),
            // new webpack.optimize.CommonsChunkPlugin({         //将app.js文件中一些关于webpack文件的配置单独打包出为一个文件,用于解决部分浏览器长缓存问题
            //     name: 'runtime'
            // })
        ])
    })
}


module.exports = config;