const path = require('path')                            //path是Nodejs中的基本包,用来处理路径
const webpack = require("webpack")                      //引入webpack
const ExtractPlugin = require("extract-text-webpack-plugin")
const merge = require('webpack-merge')//合并webpack
const baseConfig = require('./webpack.config.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin')                                   //vue服务端渲染的插件


let config

const isDev = process.env.NODE_ENV === 'development'
const plugins = [
    new ExtractPlugin('styles.[md5:contentHash:hex:8].css'),   //定义打包分离出的css文件名
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.NODE_ENV': '"server"'
    }),
    new VueServerPlugin()
]
// if(isDev){
//     plugins.push(new VueServerPlugin())                       //输出的一个json文件
// }

config = merge(baseConfig, {
    target: 'node',
    entry: path.join(__dirname, '../client/server-entry.js'),
    output: {
        libraryTarget: 'commonjs2',             //打包出来文件，modules.exportes来暴露
        filename: 'server-entry.js',
        path: path.join(__dirname, '../server-build')
    },
    externals: Object.keys(require('../package.json').dependencies),                //在node端运行，用require引入文件，不需要全部打包到一个js文件，不需要打包的文件
    devtool: 'source-map',
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
    plugins
})


module.exports = config;