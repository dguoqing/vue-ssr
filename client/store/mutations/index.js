//mutation,是同步的，不能有异步的代码

export default {            //mutation函数只能接受两个参数，专门用来修改state，

    updateCount(state, {num}) {
        state.count = num
    }
}