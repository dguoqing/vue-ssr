<template>
    <div>
        <h2>ACP</h2>
        <p>foo:::{{ foo }}</p>
        <p>attrs:>> {{ $attrs }}</p>
        <a href="javascript:void(0)" @click="emissionRocket">发射火箭</a>
        <br />
        =================================================================
        <b-cp v-bind="$attrs"  v-on="$listeners" />
    </div>
</template>
<script>
import BCp from "./BCp.vue";
export default {
    name: "ACp",
    components: { BCp },
    props: ["foo",'ck'],
    inheritAttrs: false,
    data() {
        return {};
    },
    mounted(){
        console.log("ACP",this.$props)
    },
    methods:{
        emissionRocket(){
            this.$emit("upRocket", "ACP说发射火箭");
        }
    }
};
</script>
