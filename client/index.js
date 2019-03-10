import Vue from 'vue'
import App from './app.vue'
// import './assets/style/style.css'
// import './assets/style/style-stylus.styl'
// import './assets/style/style-less.less'
import './assets/style/global.styl'

// const root = document.getElementById('root')
const root = document.createElement('div')
document.body.appendChild(root)
new Vue({
  render: h => h(App)
}).$mount(root)
