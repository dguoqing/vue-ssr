import Router from 'vue-router'

import routes from './routes'

// const router = new Router({
//     routes
// })
//hashRouter,浏览器不解析，对SEO不友好

// export default router               //这样暴露的话，外面引进的router都是同一个router，都是创建好了的,服务端渲染会导致内存溢出，每次渲染都会创建一个router，每次都会缓存

export default () => {                  //每次引入的时候才会去new 一个router
    return new Router({
        routes,
        mode:'history' ,                    //使用history，去除浏览器地址栏的#
        // base:'/base/',                      //整个地址的基路径，使用vue-router跳转都会加上/base/,不是强制的，不常用
        linkActiveClass:'active-link',          //router-link标签的class的名称
        linkExactActiveClass: 'exact-active-link',
        scrollBehavior(to, from, savedPosition){                           //页面跳转的时候，页面要不要滚动的,savedPosition:来过次路由
            if(savedPosition){
                return savedPosition
            }else{
                return {x:0,y:0}
            }
        },
        // fallback:true,                  //解决路由跳转，页面不变化，有的游览器不支持，就会每次跳转都会请求服务器，单页面就变成多页面应用了
        // parseQuery(query){           //将?a=xxx&b=CCC转化成obj

        // },
        // stringifyQuery(obj){

        // }
    })
}