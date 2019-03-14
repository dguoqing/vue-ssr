import Vue from 'vue'

const ChildComponent = {
    template: '<div>child component: {{data.value}}</div>',
    inject: ['yeye', 'data'],
    mounted() {
        // console.log(this.yeye, this.value)
    }
}

const component = {
    name: 'comp',
    props:['props1'],
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
//     template: `
//     <div :style="style">
//       <slot></slot>
//     </div>
//   `,
    render(createElement){
        return createElement(
            'div',
            {
                style:this.style,
                // on: {
                //     click: () => this.$emit('click')                //在这里触发传进来的click事件
                // }
            }, [
                // this.$slots.default,                                    //默认的slot
                this.$slots.header,
                this.props1
            ])
    },
    data() {
        return {
            style: {
                width: '200px',
                height: '200px',
                border: '1px solid #aaa'
            },
            value: 'component value'
        }
    }
}

new Vue({
    components: {
        CompOne: component
    },
    provide() {
        const data = {}

        Object.defineProperty(data, 'value', {
            get: () => this.value,
            enumerable: true
        })

        return {
            yeye: this,
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
        console.log(this.$refs.comp.value, this.$refs.span)
    },
    methods: {
        handleClick(){
            console.log('handleClicked')
        }
    },
    //   template: `
    //     <div>
    //       <comp-one ref="comp">
    //         <span ref="span">{{value}}</span>
    //       </comp-one>
    //     </div>
    //   `,
    render(createElement) {                                                 //可以接受一个参数为createElement函数，通过vue-loader处理
        //   return this.$createElement()                      //vue创建dom节点，
        return createElement(                                   //参数  1-节点的名字    2-节点的属性        3-节点内的内容参数为数组      创建slot使用this.$slots.default
                                                                //
            'comp-one',
            {
                ref: 'comp',
                style:{                                         //样式
                    color:'red'
                },
                props: {                                        //传入props
                    props1:this.value
                },
                // on: {                                           //传入事件
                //     click: this.handleClick
                // },
                nativeOn: {                                     //自动触发this.$emit事件，并且将事件自动绑定到子组件的根节点上
                    click: this.handleClick
                },
                domProps: {                                         //原生dom
                    innerHTML: '<span>inner</span>'
                },
                attrs: {
                    id: 'id'
                }
            },
            [
                createElement(
                    'span',
                    {
                        ref: 'span',
                        slot: 'header'                              //要显示到那个slot-header上面
                    },
                    this.value)
            ])
    }
})