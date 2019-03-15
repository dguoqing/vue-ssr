import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
// import './assets/style/style.css'
// import './assets/style/style-stylus.styl'
// import './assets/style/style-less.less'
import './assets/style/global.less'


import createRouter from './config/router'


Vue.use(VueRouter)
const router = createRouter()



router.beforeEach((to, from, next) => {         //  全局路由守卫，每次路由跳转都会执行,用来验证用户登录
    console.log('before each ')
    // console.log(to, from)
    if(to.fullPath === '/app'){
        next('/login')
        // next({
        //     path:'/login'
        // })
    }else{
        next()
    }
    next()
})

router.beforeResolve((to, from, next) => {
    console.log('beforeResolve')
    next()
})

router.afterEach((to, from, next) => {
    console.log('afterEach')
})






// const root = document.getElementById('root')
// const root = document.createElement('div')
// document.body.appendChild(root)
new Vue({
    router,
    render: h => h(App)
}).$mount('#root')
