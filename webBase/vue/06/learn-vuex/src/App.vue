<template>
  <div id="app">
    <Foo></Foo>
   <!-- <button @click="getUserName">get state username</button> -->
   <Bar></Bar>
  </div>
</template>

<script>


import Bar from './components/Bar'
import Foo from './components/Foo.vue'
export default {
  name: 'App',
  components: {
    Bar,
    Foo,
    
  },
  methods: {
    getUserName() {
      console.log(this.$store);
      console.log(this.$store.state.username);
    }
  },
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
