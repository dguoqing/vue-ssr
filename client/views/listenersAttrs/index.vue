<template>
    <div>
        <h1>Listener-Attrs222</h1>
        <h2>BCp传过来的参数：{{ BCpData }}</h2>
        ===========================================================
        <a-cp
            :foo="foo"
            v-bind="$props"
            :coo="coo"
            :ck="ck"
            @upRocket="upRocket"
        />
    </div>
</template>
<script>
import ACp from "./ACp.vue";
import moment from "moment";
export default {
    name: "Index",
    components: { ACp },
    // inheritAttrs:false,
    data() {
        return {
            foo: "hello word",
            coo: "cool water",
            ck: "杰克斯派洛",
            BCpData: ""
        };
    },
    mounted() {
        // let momentObj = moment(new Date())
        // console.log(momentObj)
        // let timen = moment(momentObj).valueOf()
        // console.log(timen)
    },
    methods: {
        upRocket(params) {
            console.log("index>>>>", params);
            this.BCpData = params;
        }
    }
};
</script>
