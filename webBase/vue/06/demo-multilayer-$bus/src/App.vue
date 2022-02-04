<template>
  <div id="app">
    <ComA title="from app"></ComA>
    <Button disabled></Button>
  </div>
</template>

<script>
import ComA from "./components/ComA.vue";
import Button from './components/Button.vue'
export default {
  name: "App",
  components: {
    ComA,
    Button
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
