const ejs  = require('ejs')


module.exports = async (ctx, renderer, template) => {
    //指定header为html
    ctx.headers['Content-Type'] = 'text/html'
    //context对象要传入到vue-server-render，vue-server-render拿到context之后，会在context对象上插入一堆的属性，方便渲染html，客户端的js.css路径
    const context = { url: ctx.path }
    try{
        const appString = await renderer.renderToString(context)                  //会返回Promise
        const { title } = context.meta.inject()
        const html  = ejs.render(template, {                    //第二个参数是传入到template模板的参数
            appString,                          //html内容
            style: context.renderStyles(),       //样式
            scripts: context.renderScripts(),      //
            title: title.text()
        })
        ctx.body = html                 //返回给客户端的html内容
    }catch(err){
         console.log('render error:',err)
         throw err
    }

}