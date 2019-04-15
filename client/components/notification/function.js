import Vue from 'vue'
import Component from './func-notification'

const NotificationConstrutor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstance = instance => {
    if(!instance) return
    const len = instances.length
    const index = instances.findIndex(inst => instance.id === inst.id)
    instances.splice(index, 1)

    if(len <= 1) return
    const removeHeight = instance.vm.height
    for(let i = index; i < len - 1; i++){
        instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
    }
}
const notify = options => {
    if(Vue.prototype.$isServer) return              //如果是服务端，直接return
    console.log('options',options)
    const {
        autoClose,
        ...rest
    } = options

    const instance = new NotificationConstrutor({
        propsData:{
            ...rest
        },
        data: {
            autoClose: autoClose === undefined ? 30000 : autoClose
        }
    })
    const id = `notification${seed++}`
    instance.id = id
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true

        //吐司的位置
    let verticalOffset = 0
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16
    })

    verticalOffset += 16;       //  浏览器最底部高出16
    instance.verticalOffset = verticalOffset
    instances.push(instance);
    instance.vm.$on('closed',() => {
        removeInstance(instance)
        document.body.removeChild(instance.vm.$el)
        instance.vm.$destroy()      //不会卸载dom节点，所以要执行document.body.removeChild(instance.vm.$el)主动删除
    })
    instance.vm.$on('close', () => {
        instance.vm.visible = false
    })

    return instance.vm
}

export default notify

