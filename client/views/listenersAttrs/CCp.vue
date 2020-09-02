<template>
    <div>
        <h1>CCP</h1>
        <p>coo:::{{ coo }}</p>
        <p>foo:::{{ foo }}</p>
        <a href="javascript:void(0);" @click="emitRoucket">CCP发射火箭</a>
    </div>
</template>
<script>
export default {
    name: "CCp",
    props: ["coo", "foo"],
    data() {
        return {};
    },
    methods:{
        emitRoucket(){
            this.$emit("upRocket", "CCP说发射火箭")
        }
    }
};
</script>
