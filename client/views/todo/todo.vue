<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus='autofocus'
            placeholder="接下去要做什么？"
            @keyup.enter="addTodo"
        />
        <Item
        :todo="todo"
        v-for="todo in filteredTodos"
        :key="todo.id"
        @del="deleteTodo"
         />
         <Tabs
         :filter="filter"
         @togole="togoleFilter"
         :todos="todos"
         @clearAllCompleted="clearAllCompleted"/>
         <router-view />
    </section>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
    metaInfo: {
        title: 'The Todo App'
    },
    beforeRouteEnter(to, from, next){
        console.log('todo before enter')
        next(vm => {
            console.log('after enter this.id is:'+vm.id)
        })
    },
    beforeRouteUpdate(to, from,next){
        console.log('todo before update')           //同一个路由下，路由后面的参数变化的时候
        next()
    },
    beforeRouteLeave(to, from,next){
        console.log('todo before leave')                    //页面离开
        // if(global.confirm('ate you sure ?')){

            next()
        // }
    },
    props:['id'],
    mounted(){
        console.log(this.id)
    },
    components:{
        Item,
        Tabs
    },
    data(){
        return {
            todos:[],
            filter: 'all'
        }
    },
    computed: {
        filteredTodos(){
            if(this.filter == 'all'){
                return this.todos
            }
            const completed = this.filter === 'completed';
            return this.todos.filter(todo => todo.completed === completed)
        }
    },
    methods:{
        addTodo(e){
            console.log(e.target.value);
            this.todos.unshift({
                id:id++,
                content:e.target.value.trim(),
                completed:false
            })
            e.target.value = '';
        },
        togoleFilter(state){
            this.filter = state
        },
        deleteTodo(id){
            this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
        },
        clearAllCompleted(){
            this.todos = this.todos.filter(todo => !todo.completed)
        }
    }
}
</script>


<style lang="stylus" scoped>
.real-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666

.add-input
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    border none
    outline none
    color inherit
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 36px
    border none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)

</style>
