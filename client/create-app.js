//每次渲染都要渲染一个新的app,不然会出现内存溢出

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'

import App from './app.vue'
import createStore from './store'
import createRouter from './config/router'


import './assets/style/global.less'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)

export default () => {
    const router = createRouter()
    const store = createStore()

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return { app, router, store }

}