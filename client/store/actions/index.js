//action ,用来写异步代码


export default{
    updateCountAsync(store, payload){   //store-整个store，payload调用action时传入的载荷
        console.log(store)
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                console.log(11111)
                store.commit('updateCount', payload)
                resolve()
            },payload.time)
        })
    },



    // updateCountAsync({dispatch, commit}, payload){   //store-整个store，payload调用action时传入的载荷
    //     return dispatch('actionA').then(() => {
    //         commit('mutation')
    //     })
    // }




    // async actionA({commit}){
    //     commit('getData',await getData())
    // },
    // async actionB({dispatch, commit}){
    //     await dispatch('actionA')               //等待actionA完成
    //     commit('getOther',await getOther())                 ///getData、getOther返回都是Promise

    // }

}