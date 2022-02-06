<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <!-- <Foo title="titleName"></Foo> -->
  <h1>------------------------------------------------</h1>
  <Bar></Bar>

  <h1>------------------------------------------------</h1>
  <Baz></Baz>
  <p>===========================================</p>
   <h1>------------------------------------------------</h1>
  <Counter></Counter>


</template>

<script>
import Counter from './components/Counter'
import Baz from './components/Baz'
import Bar from './components/Bar'
// import Foo from './components/Foo.vue'
// import HelloWorld from './components/HelloWorld.vue'
import { provide } from 'vue'

export default {
  name: 'App',
  components: {
    Counter,
    Baz,
    Bar,
    // Foo,
  },
  setup() {
    provide('app','app.vue to baz')
  }
}
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
