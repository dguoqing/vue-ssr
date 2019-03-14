import Vue from 'vue'

 const app = new Vue({
    // el: "#root",
    template: '<div>{{text}}</div>',
    data: {
        text: 1,
        obj: {}
    }
})
 app.$mount('#root')

let i = 0
setInterval(() => {
    // app.text += 1
    // app.$options.data.text += 1       //会加1
    // app.$data.text += 1;            //会加1

    /**/
    // i++;
    // app.obj.a = i;
    // app.$forceUpdate()


    /** */
    // app.$set(obj, 'a', i)           //给obj的增加a属性并且赋值i
    // app.$delete


},1000)
// new Vue({
//     el: "#root",
//     template: '<p>dddd</p>'
// })
                /*vue实例的属性*/
// console.log(app.$options)//vue所有属性
// app.$options.render = h => h('div', {}, 'new render function')  //重新渲染的时候就会执行新的render方法
// console.log(app.$root === app)          //true
// console.log(app.$children)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)   ///快速获取dom
// console.log(app.$isServer)  //服务端渲染时才会用到


                /*vue实例方法*/

// const unWatch = app.$watch('text', (newtext, oldtext) => {
//     console.log(`${newtext}:${oldtext}`)
// })
// unWatch()//页面跳转，注销

// app.$on('test', () => {         //事件监听
//     console.log('test emit')
// })

// app.$emit('test')               //触发事件


// app.$once('one', () => {         //事件监听,只监听一次
//     console.log('test emit')
// })

// setInterval(() => {
//     app.$emit('one')               //触发事件
// },1000)

// app.$forceUpdate()      //强制更新视图

// app.$set(app.obj, 'a', 1)

// app.$nextTick(callback)  //下次dom更新会调用callback


