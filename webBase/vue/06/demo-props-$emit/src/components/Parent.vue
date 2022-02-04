<template>
  <div>
    Parent msg : {{ msg }}

    <Foo > </Foo>
    <Child
      ref="child"
      @to-parent="handleToParent"
      title="this is parent title"
    ></Child>

    <Child
      ref="child"
      @to-parent="handleToParent"
      title="this is parent title"
    ></Child>

    <input type="text" ref="input" />

    <button @click="handleGetChildByRef">get child by ref</button>
    <button @click="focus">focus</button>
    <button @click="getChildren">get children</button>
  </div>
</template>

<script>
import Child from "./Child.vue";
import Foo from './Foo.vue'
export default {
  components: {
    Child,
    Foo
  },
  data() {
    return {
      msg: "heihei",
    };
  },
  methods: {
    getChildren() {
      console.log(this.$children);
      // children -> 0
      const firstComponent = this.$children[0];
      firstComponent.setMsg("first heiheihei");
    },
    handleToParent() {
      console.log("to parent in Parent ");
      this.msg = "haha";
    },
    handleGetChildByRef() {
      this.$refs.child.setMsg("heiheiheiheihei - from parent");
    },
    focus() {
      console.log(this.$refs);
      // $refs -> element
      this.$refs.input.focus();
    },
  },
};
</script>

<style></style>
