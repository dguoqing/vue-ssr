// const doscLoader = require.resolve('./dosc-loader')//官网上有配置文件

module.exports = isDev => {//此处是个函数，根据不同环境生成不同的配置
    return {
        preserveWhitepace:true,//写.vue文件template模板时，一段字符串不小心打了一个空格，且换行了，为了防止渲染时这个不必要的空格而报错。
        extractCSS:!isDev,//vue默认不会将.vue文件里的css样式单独打包，此处设置true，就可以将.vue文件的css样式单独打包，使用vue开发时，要是vue-style-loader,开发时不需要
        cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',//将css的className编译成由文件路径、文件名以及文件内容的hash64形成独一无二的名字，在.vue写的class名字只有通过cssModules调用才会生成,生产环境可以将path和name去掉，只用hash
            camelCase:true,//将class名由-链接的，变成变成驼峰命名，这样javascript比较好调用
        },
        // postcss:
        // hotReload://根据环境变量生成。。。。根据process.env.NODE_ENV不是production ，就会开启，修改内容会热重载，样式不会（样式用的是vue-style-loader实现的）
        // loaders: {//自定义.vue文件里的模块，像style，template，script，开发高级组件库，文档，常规下vue用不到，下面两个也用不到
        //     "dosc":doscLoader,
        //     js: "coffe-loader",//vue里面的js对应的loader
        // },
        // preLoader: {//在使用babel-loader编译之前使用的loader

        // },
        // postLoader: {//编译完之后再去编译的loader

        // }

    }
}