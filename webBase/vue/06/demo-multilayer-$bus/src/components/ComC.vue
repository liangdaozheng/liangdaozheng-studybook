<template>
  <div>
    ComC title: {{ title }}

    <!-- <button @click="getComA">get ComA</button> -->
    <button @click="handleInit">init</button>
  </div>
</template>

<script>
import bus from "../bus";
export default {
  props: ["title"],
  // inject: ["title", "comA"],
  methods: {
    handleInit() {
      bus.$emit("init",10);
    },
    // getComA() {
    //   console.log(this.comA);
    //   this.comA.setMsg("heiheihei comC.vue");
    //   this.comA.addChild(this);
    // },
  },
};
</script>

<style></style>
