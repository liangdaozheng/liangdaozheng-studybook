<template>
  <div>
    ComA msg: {{ msg }}
    <ComB v-bind="$attrs" @a="handleA" @b="handleB"></ComB>
    <button @click="getChildren">get children</button>
    <button @click="handleAttrs">attrs</button>
  </div>
</template>

<script>
import ComB from "./ComB.vue";
import bus from "../bus";
export default {
  inheritAttrs: false,
  components: {
    ComB,
  },
  mounted() {
    // bus.$on("init", this.init);
    bus.$once("init", this.init);
  },
  data() {
    return {
      msg: "",
      componentChildren: [],
    };
  },
  provide() {
    return {
      title: "form comA.vue",
      comA: this,
    };
  },

  methods: {
    init(val) {
      console.log("init", val);
    //   bus.$off("init", this.init);
    },
    handleA() {
      console.log("AAAAAAAAAAA");
    },
    handleB() {
      console.log("BBBBBBBBB");
    },
    handleAttrs() {
      console.log(this.$attrs);
    },
    setMsg(val) {
      this.msg = val;
    },
    addChild(child) {
      this.componentChildren.push(child);
    },
    getChildren() {
      console.log(this.componentChildren);
    },
  },
};
</script>

<style></style>
