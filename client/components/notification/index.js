import Notification from './notification.vue'
import notify from './function'

export default Vue => {
    Vue.component(Notification.name, Notification)          //注册全局组件
    Vue.prototype.$notify = notify
}