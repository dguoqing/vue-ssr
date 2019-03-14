import Vue from 'vue'

const component = {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: ['value'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value">
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    //   this.$emit('input', e.target.value)                //监听父级穿过来的input事件
    //   this.$emit('getValue',e.target.value)              ///回调函数没有用
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data () {
    return {
      value: '123',
      value1:'456',
      value2:'789'
    }
  },
  methods: {
    getValue(value){
        console.log(value)                              //通过回调来获取value的变化的实时的值
    }
  },
  watch: {
    value1(){
        console.log(this.value1)                        //通过watch来监听获取value1的变化实时的值
    }
  },
  template: `
    <div>
    <comp-one :value="value" @input = "value = arguments[0]"></comp-one>
      <comp-one v-model="value1" @getValue="getValue"></comp-one>
      <comp-one v-model="value2"></comp-one>
    </div>
  `
})


// new Vue({
//     components: {
//       CompOne: component
//     },
//     el: '#root',
//     data () {
//       return {
//         value: '123'
//       }
//     },
//     template: `
//       <div>
//         <comp-one :value="value" @input = "value = arguments[0]"></comp-one>
//       </div>
//     `
//   })

// new Vue({
//     components: {
//       CompOne: component
//     },
//     el: '#root',
//     data () {
//       return {
//         value: '123'
//       }
//     },
//     methods: {
//         input(value){
//             console.log(value)
//         }
//     },
//     template: `
//       <div>
//         <comp-one :value="value" @input = "input"></comp-one>
//       </div>
//     `
//   })