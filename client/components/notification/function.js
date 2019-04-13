import Vue from 'vue'
import Component from './func-notification'

const NotificationConstrutor = Vue.extend(Component)

const instances = []
let seed = 1

const notify = options => {
    if(Vue.prototype.$isServer) return              //如果是服务端，直接return

    const instance = new NotificationConstrutor({
        propsData:options
    })
    const id = `notification${seed++}`
    instance.id = id
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)

        //吐司的位置
    let verticalOffset = 0
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16
    })

    verticalOffset += 16;       //  浏览器最底部高出16
    instance.verticalOffset = verticalOffset
    instances.push(instance);

    return instance.vm
}

export default notify

