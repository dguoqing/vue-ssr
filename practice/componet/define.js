import Vue from 'vue'

//data return 的对象，必须是一个新的对象，不能返回定义的全局的对象
//var obj = {},   data(){ return obj} 这样会导致使用同一个组件两次，返回的数据一模一样

const compoent = {
  props: {
    active: {
      // type: Boolean,
      // required: true,
    //   default:true,  //如果传进来的是对象，default必须写成函数，default(){return {obj}}
      validator (value) {//验证
        return typeof value === 'boolean'
      },
    //   onChange: Function
    },
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  methods: {
    handleChange () {
        // this.onChange()
      this.$emit('change')
    }
  }
}

// Vue.component('CompOne', compoent)

new Vue({
  components: {
    CompOne: compoent
  },
  data: {
    prop1: 'text1'
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  mounted () {
    console.log(this.$refs.comp1)
  },
  el: '#root',
  template: `
    <div>
        <comp-one  :active="true" :prop-one="prop1" :change="handleChange"></comp-one>
      <comp-one ref="comp1" :active="true" :prop-one="prop1" @change="handleChange"></comp-one>
      <comp-one :active="true" propOne="text2"></comp-one>
    </div>
  `
})