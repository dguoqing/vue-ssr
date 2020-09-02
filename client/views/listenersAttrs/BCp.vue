<template>
    <div>
        <h1>BCP</h1>
        <p>coo:{{ coo }}</p>
        <a href="javascript:void(0)" @click="emissionRocket">发射火箭</a>
        ==============================================================================
        <c-cp v-bind="$props" v-on="$listeners"></c-cp>
    </div>
</template>
<script>
import CCp from "./CCp.vue";
export default {
    name: "BCp",
    props: ["coo", "foo"],
    inheriAttrs: false,
    components: { CCp },
    data() {
        return {};
    },
    mounted() {
        console.log(this.$props, this.foo, this);
    },
    methods: {
        emissionRocket() {
            this.$emit("upRocket", "BCP说发射火箭");
        }
    }
};
</script>
