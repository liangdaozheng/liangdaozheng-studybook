<template>
  <div id="app">
    <div>
      count:{{count}}
    </div>
    <div> 
      doule {{double}}
    </div>
    <button @click="changeCount">change count</button>
  </div>
</template>

<script>
// import {mapState,mapGetters} from 'vuex';
import { createNamespacedHelpers } from 'vuex'

const {mapState,mapGetters}=createNamespacedHelpers('moduleA');
export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['double'])
    // count() {
    //   // console.log(this.$store.state);
    //   return this.$store.state.moduleA.count; 
    // },
    // double(){
    //   // return this.$store.getters.double;
    //   return this.$store.getters['moduleA/double'];
    // }
  },
  methods: {
    changeCount() {
      this.$store.commit("moduleA/changeCount",13)
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
