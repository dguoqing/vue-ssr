<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!-- <Todo></Todo> -->
    <p style="textAlign:center;color:red">count:{{fullName}}{{counter}}</p>
    <!-- <p style="textAlign:center;color:red">textA:{{textA}}</p> -->
    <!-- <p style="textAlign:center;color:red">textC:{{textC}}</p> -->
    <!-- <p style="textAlign:center;color:red">textPlus:{{textPlus}}</p> -->
    <p style="textAlign:center">
        <router-link to="/app/123">app页面123</router-link>
        <router-link to="/app/456">app页面456</router-link>
        <router-link to="/login">login登录页面</router-link>
    </p>
    <!-- <router-link to="/login/exact">login登录页面</router-link> -->
    <transition name="fade">
      <router-view/>
    </transition>
    <!-- <Footer></Footer> -->
    <router-view name="a"/>
  </div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations,
    createNamespacedHelpers,                    //命名空间辅助函数
} from 'vuex'
import Header from "./layout/header.vue";
// import Footer from "./layout/footer.jsx";
// import Todo from "./views/todo/todo.vue";


// const {mapState,mapMutations} = createNamespacedHelpers('a')            //绑定在给定命名空间值上的组件绑定辅助函数


export default {
  components: {
    Header,
    // Footer,
    // Todo
  },
  data() {
    return {
      text: "hello word"
    };
  },
  mounted(){
    //   console.log(this.$route)
    // console.log(this.$store,this['a/textPlus'])
    let i = 0;
    // setInterval(()=>{
    //     this.$store.commit('updateCount', i++)                  //commit只能接受两个参数，一个是mutation函数名字，和载荷payload
    // }, 1000)
    // this.$store.dispatch('updateCountAsync', {
    //     num: 5,
    //     time: 2000
    // })
    this.updateCountAsync({
        num: 5,
        time: 2000
    }).then(() => {
        console.log('updateCountAsync  Promise')
    })
    setInterval(() => {
        this.updateCount({
            num: i++
        })
    },1000)
    console.log(this.counter)
    // this['a/updateText']('123')
    // this['a/add']()
    // this.$store.state.count =1
  },
  methods: {
    //   ...mapActions(['updateCountAsync','a/add']),
    //   ...mapActions('a', ['add']),               //a模块下的add
    //   ...mapMutations(['updateCount','a/updateText']),
      ...mapActions(['updateCountAsync']),
      ...mapMutations(['updateCount']),
  },
  computed: {
    //   count(){
    //       return this.$store.state.count
    //   },
    // ...mapState(['count']),     //和store里面同名是使用
    ...mapState({
        // counter:'count'
        counter: state => state.count,
        // textA: state => state.a.text,
        // textC: state => state.c.text
    }),
    // ...mapGetters(['fullName','a/textPlus']),
    ...mapGetters({
        fullName:'fullName',
        // textPlus: 'a/textPlus'
    }),
    //   fullName(){
    //       return this.$store.getters.fullName
    //   },
    // textA(){
    //       return this.$store.state.b.text
    //   }
  }
};
</script>
<style lang="less" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  #cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #999;
    opacity: 0.2;
    z-index: -1;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>


