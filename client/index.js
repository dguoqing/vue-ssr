import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
// import './assets/style/style.css'
// import './assets/style/style-stylus.styl'
// import './assets/style/style-less.less'
import './assets/style/global.less'


import createRouter from './config/router'
import createStore from './store'
import mutations from './store/mutations';

Vue.use(VueRouter)
Vue.use(Vuex)
const router = createRouter()
const store = createStore()

// store.registerModule('c', {                 //  动态注册模块
//     state: {
//         text: 3
//     }
// })

// store.unregisterModule('c')                 //解绑模块

// store.watch(state => state.count +1, (newCount) => {         //监听到count改变时，就会执行
//     console.log('new count watched:',newCount)
// })

// store.subscribe((mutation, state) => {              //订阅，每个mutation被调用时，就会执行
//     console.log(mutation.type)
//     console.log(mutation.payload)
// })
// store.subscribeAction((action, state) => {               //监听到action
//     console.log(action.type)
//     console.log(action.payload)
// })

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
    store,
    render: h => h(App)
}).$mount('#root')
