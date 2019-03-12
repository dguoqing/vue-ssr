const path = require('path')                            //path是Nodejs中的基本包,用来处理路径
const HtmlWebpackPlugin = require('html-webpack-plugin')       //引入html-webpack-plugin
const webpack = require("webpack")                      //引入webpack
const ExtractPlugin = require("extract-text-webpack-plugin")
const merge = require('webpack-merge')//合并webpack
const baseConfig = require('./webpack.config.base')


const defaultPlugins = [
    new webpack.DefinePlugin({                      //主要作用是在此处可以根据isdev配置process.env,一是可以在js代码中可以获取到process.env,
        'process.env': {                             //二是webpack或则vue等根据process.env如果是development,会给一些特殊的错误提醒等,而这些特殊项在正式环境是不需要的
            NODE_ENV: '"development"'
        }
    }),
    new HtmlWebpackPlugin({                         //引入HtmlWebpackPlugin
        template: path.join(__dirname, 'template.html')
    })
]
const devServer = {                                //这个devServer的配置是在webpack2.x以后引入的,1.x是没有的
    port: 3030,                                     //访问的端口号
    host: '0.0.0.0',                              //可以设置0.0.0.0 ,这样设置你可以通过127.0.0.1或则localhost去访问
    overlay: {
        errors: true,                               //编译中遇到的错误都会显示到网页中去
    },
    // open: true ,                                 //项目启动时,会默认帮你打开浏览器
    hot: true,                                       //在单页面应用开发中,我们修改了代码后是整个页面都刷新,开启hot后,将只刷新对应的组件
    // historyApiFallback:true
}

let config

config = merge(baseConfig, {
    entry: path.join(__dirname, '../practice/index.js'),
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
                            localIdentName: '[path]-[name]-[hash:base64:5]' ,
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
            }
        ]
    },
    devServer,
    //import Vue from 'vue' 默认引入的是vue.runtime.xxx,开发环境vue.runtime.esm.js,,正式环境vue.runtime.min.js，，，有无runtime的区别，可不可以在vue对象里写template
    resolve: {
        alias: {                                    //指定插件的版本
            "vue": path.join(__dirname, "../node_modules/vue/dist/vue.esm.js")
        }
    },
    plugins: defaultPlugins.concat([
        new webpack.HotModuleReplacementPlugin(),//添加两个插件用于hot:true的配置
        new webpack.NoEmitOnErrorsPlugin(),
    ])
})


module.exports = config;