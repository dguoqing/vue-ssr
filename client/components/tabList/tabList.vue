<template>
    <div class="tab-list">
        <ul class="content">
            <li v-for="(v,i) in list" :key="i" @click="e => onChange(e,v,i)"
                :class="[value === i ? 'checked' : '','_tab-list_']">{{v}}</li>
            <li ref="line" class="line"></li>
        </ul>

    </div>
</template>
<script>
export default {
    name:'TabList',
    props:{
        list:{
            type:Array,
            default:() => []
        },
        value:{
            type:Number,
            default:0
        }
    },
    data(){

        return {
            elWidthList:[],//el宽度的集合
        }
    },
    model:{
        prop:'value',
        event:'change',
    },
    mounted(){
        this.elWidthList = this.getElWidthList()
        this.$nextTick(() => {
            this.setLinePosition(this.value)
        })
    },
    methods:{
        onChange(event,v,i){
            if(this.value === i) return;
            this.setLinePosition(i)
            this.$emit('change',i)

        },
        //设置滑块的位置
        setLinePosition(index){
            //24-dom之间的margin值
            //margin值 * 下标 + 距离左侧的left值
            let lt = 24 * index + this.getElLeft(this.elWidthList,index)

            //当前的dom width / 0.78（当前dom字体14 和字体18 的比值） - 滑块的宽度 / 2(处于中间位置) + left的值
            this.$refs.line.style.left = (this.elWidthList[index] / 0.78 -20) / 2 + lt + 'px'
        },
        //每个dom的width
        getElWidthList(){
            return [...document.getElementsByClassName('_tab-list_')].map((v,i) => this.value === i ? v.offsetWidth * 0.78 : v.offsetWidth)
        },
        // 获取left 值
        getElLeft(arr,index){
            return arr.reduce((res,pre,i) => i < index ? res + pre : res,0)
        }
    }

}
</script>
<style lang="less" scoped>
.tab-list{
    display: flex;
    background-color: transparent;
    align-items: center;
    position: relative;
    .content{
        display: flex;
        justify-content: center;
        list-style-type: none;
        align-items: center;
        padding: 0;
        li{
            font-size: 14px;
            color: #202022;
            line-height: 14px;
            margin-right: 24px;
            &:hover{
                cursor: pointer;
            }
        }
        .checked{
            font-size: 18px;
            line-height: 18px;
            margin-right: 24px;
            color: #202020;
        }
        .line{
            background-color: #202020;
            border-radius: 1.5px;
            width: 20px;
            height: 3px;
            position: absolute;
            bottom: -12px;
            transition-property: left;
            transition-timing-function: ease;
            transition-duration: 0.3s;
            transition-delay: 0s;
        }
    }
}

</style>