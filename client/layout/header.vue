<template>
    <header :class="$style.mainHeader">
        <h1>Todo</h1>
    </header>
</template>

<script>
export default {
    // computed: {
    //     $style(){
    //         return {
    //             mainHeader:'这里的内容是下面css的main-header的内容'
    //         }
    //     }
    // }
}
</script>

<style lang="stylus" module>//CSSmodules使用，这里使用module，相当于computed的$style返回的对象，上面注释的
    .main-header
        text-align center
        h1
            font-size 100px
            color rgba(175,47,47,0.4)
            font-weight 400
            margin 20px
</style>