const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')

//引入 操作内存的构造方法
const MemoryFS = require('memory-fs')               //与node的fs区别，它不把文件写到磁盘上
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)            //生成 webpack调用产物

const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs;              //serverCompiler的输出目录是mfs，制定这个产物挂到内存里去；操作更快

let bundle;                                         //记录webpack每次打包的文件    注册全局变量接收结果

//此产物 可以去监听 入口配置的文件是否变化 如果变化 那么重新打包；第一个参数 先写控对象（配置文件）
serverCompiler.watch({}, (err, stats) => {                //相当于webpack-dev-server
    if(err) throw err
    //先转换成json格式
    stats = stats.toJson()
    stats.errors.forEach(err => console.log(err));
    stats.warnings.forEach(warn => console.warn(warn))


    const bundlePath = path.join(                           //bundle的路径
        serverConfig.output.path,
        'vue-ssr-server-bundle.json'
    )
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))          //指定bundle读取文件的路径、文件的编码格式，返回的是string
    console.log('new bundle generated')
})
//中间件，处理服务端渲染返回的东西
const handleSSR = async (ctx) => {
    if(!bundle){
        ctx.body = '稍等...';
        return
    }

    //读取客户端的文件
    const clientManifestResp = await axios.get('http://127.0.0.1:3000/public/vue-ssr-client-manifest.json')
    const clientManifest = clientManifestResp.data
    //读取html模板的内容
    const template = fs.readFileSync(
        path.join(__dirname, '../server.template.ejs'),
        'utf-8'
    )
    //创建一个renderer
    const renderer = VueServerRenderer.createBundleRenderer(bundle, {
        inject: false,                       //使用官方推荐的模板
        clientManifest,                         //生成带有script标签的js文件字符串
    })

    await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*',handleSSR)

module.exports = router
