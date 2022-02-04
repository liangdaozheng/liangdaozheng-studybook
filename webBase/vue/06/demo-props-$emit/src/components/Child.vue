<template>
  <div>
    Child
    <p>child-msg :{{ msg }}</p>
    <div>title: {{ title }}</div>
    <button @click="toParent">to parent</button>
    <button @click="getParent">get parent</button>
  </div>
</template>

<script>
export default {
  // input
  props: ["title"],
  data() {
    return {
      msg: "",
    };
  },

  methods: {
    getParent(){
      console.log(this.$parent.focus())
    },
    toParent() {
      this.$emit("to-parent");
    },

    setMsg(val) {
      this.msg = val;
    },
  },
};
</script>

<style></style>
