import Vuex from 'vuex'

import defaultState from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const isDev = process.env.NODE_ENV === 'development'

const createStore = () => {
    const store = new Vuex.Store({
        strict: isDev,               //开发时使用
        state:defaultState,
        mutations,
        getters,
        actions,
        plugins: [
            store => {
                console.log('store plugins ')
            }
        ],
        // modules: {                  //store模块,默认将state分模块
        //     a: {
        //         namespaced: true,   //可以将mutations限制作用域，false--mutations是全局的
        //         state: {
        //             text: 1
        //         },
        //         mutations: {
        //             updateText(state,text){
        //                 console.log('a.state:',text)
        //                 state.text = text
        //             }
        //         },
        //         getters: {
        //             textPlus(state,getters, rootState){            //getters--全局getters， rootState---全局state
        //                return state.text + rootState.count
        //             }
        //         },
        //         actions: {
        //             // add(ctx)
        //             add({state, commit, rootState}){    //commit 默认为本模块内的commit
        //                 commit('updateText', rootState.count)
        //                 commit('updateCount', {num: 789}, {root: true})     //加上{root: true}    全局的commit
        //             }
        //         }
        //     },
        //     b: {
        //         state: {
        //             text: 2
        //         }
        //     }
        // }
    })

    //开启热更新
    if(module.hot){
        module.hot.accept([
            './state',
            './mutations',
            './getters',
            './actions'
        ], () => {
            const newState = require('./state').default
            const newMutations = require('./mutations').default
            const newGetters = require('.//getters').default
            const newActions = require('./actions').default

            store.hotUpdate({
                state: newState,
                mutations: newMutations,
                getters: newGetters,
                actions: newActions
            })
        })
    }

    return store
}


export default createStore