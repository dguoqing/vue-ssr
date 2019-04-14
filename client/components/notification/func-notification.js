import Notification from './notification.vue'

export default {
    extends: Notification,
    computed: {
        style(){
            console.log('>>>>>>>>>>>>>>',this.verticalOffset,)
            return {
                position:'fixed',
                right: '20px',
                bottom: `${this.verticalOffset}px`,
            }
        },
    },
    mounted(){
        console.log(this)
        this.createTimer()
    },
    methods:{
        createTimer(){
            if(this.autoClose){
                this.timer = setTimeout(() => {
                    this.visible = false
                }, this.autoClose);
            }
        },
        clearTimer(){
            if(this.timer){
                clearTimeout(this.timer)
            }
        },
        afterEnter() {
            // debugger
            this.height = this.$el.offsetHeight
        }
    },
    beforeDestory(){
        this.clearTimeout()
    },
    data(){
        return {
            verticalOffset: 0,
            autoClose:3000,
            height:0,
            visible:false
        }
    }
}

