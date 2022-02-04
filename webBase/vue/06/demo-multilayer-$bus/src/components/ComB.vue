<template>
  <div>
    ComB
    <ComC :title="$attrs.title"></ComC>
    <button @click="getListeners">get listeners</button>
  </div>
</template>

<script>
import ComC from "./ComC.vue";
export default {
  inheritAttrs: false,
  // props:["title"],
  components: {
    ComC,
  },
  methods: {
    getListeners() {
      console.log(this.$listeners);
      // this.$listeners.a 
    },
  },
  mounted() {
    console.log(this.$attrs);
  },
};
</script>

<style></style>
