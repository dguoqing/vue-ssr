<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!-- <Todo></Todo> -->
    <router-link to="/app/123">app页面123</router-link>
    <router-link to="/app/456">app页面456</router-link>
    <router-link to="/login">login登录页面</router-link>
    <!-- <router-link to="/login/exact">login登录页面</router-link> -->
    <transition name="fade">
      <router-view/>
    </transition>
    <!-- <Footer></Footer> -->
    <router-view name="a"/>
  </div>
</template>
<script>
import Header from "./layout/header.vue";
// import Footer from "./layout/footer.jsx";
// import Todo from "./views/todo/todo.vue";

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
//   mounted(){
//       console.log(this.$route)
//   }
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


