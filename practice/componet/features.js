import Vue from 'vue'

const ChildComponent = {
    template: '<div>child component: {{data.value}}</div>',
    inject: ['yeye', 'data'],                   //在此获取爷爷组件内return 出来的内容
    mounted() {
        // console.log(this.$parent.$options.name)         //comp组件
        console.log(this.yeye, this.data)
    }
}

const component = {
    name: 'comp组件',
    components: {
        ChildComponent
    },
    // template: `
    //   <div :style="style">
    //     <div class="header">
    //       <slot name="header"></slot>
    //     </div>
    //     <div class="body">
    //       <slot name="body"></slot>
    //     </div>
    //   </div>
    // `,
    template:                                           //穿进去的aaa value,都会挂在到slot-scope的props上
    `
    <div :style="style">
      <slot :value="value" aaa="111"></slot>
      <slot :value="value" aaa="222"></slot>
      <child-component />
    </div>
  `,
    data() {
        return {
            style: {
                width: '200px',
                height: '200px',
                border: '1px solid #aaa'
            },
            value: 'component value'
        }
    },
    methods :{
        handle(){
            console.log('component 的方法')
        }
    }
}

new Vue({
    components: {
        CompOne: component
    },
    provide() {                                 //      向上获取父组件的爷爷辈的组件，使用此属性，要写成函数
        const data = {}

        Object.defineProperty(data, 'value', {  //使用这个可以改变子组件的内容，实现reactive，在vue中不推荐使用，vue可能会废弃掉
            get: () => this.value,              //每次调用value值的时候，都会调用get方法，value的值每次获取this.value的最新值，
            enumerable: true                    //使value的值为可读的
        })

        return {
            yeye: this,             //return 此组件的this
            data
        }
    },
    el: '#root',
    data() {
        return {
            value: '123'
        }
    },
    mounted() {
        console.log(this.$refs.comp.value, this.$refs.span)             ///通过ref可以直接调用组件内的方法、属性，一般只获取，不要去操作
        this.$refs.comp.handle()                                        //comp组件内的方法
    },
    template: `
    <div>
      <comp-one ref="comp">
        <span slot-scope="props" ref="span">{{props.value}} {{props.aaa}} {{value}}</span>
        <span slot-scope="props" ref="span">{{props.value}} {{props.aaa}} {{value}}</span>
      </comp-one>
      <input type="text" v-model="value" />
    </div>
  `

//   template: `
//   <div>
//     <comp-one >
//       <span slot="header" ref="span"></span>             //slot插槽 插到slot的name=header的下面
//     </comp-one>
//     <input type="text" v-model="value" />
//   </div>
})