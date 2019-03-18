//action ,用来写异步代码


export default{
    updateCountAsync(store, payload){                //store-整个store，payload调用action时传入的载荷
        setTimeout(() => {
            store.commit('updateCount', payload)
        },payload.time)
    }
}