<template >
  <div>
    Foo
    <p>
      username:{{username}}
    </p>
    <p>
      age:{{age}}
    </p>
    <p>
      10年后的年龄{{tenYearsOld}}
    </p>
    <div>
      <button @click="changeUserName">change user name</button>
      <button @click="changeUserAge">change user age</button>
      <button @click="asyncChangeUserName">async change user name</button>
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex';
// const states=mapState(['username','age']);
console.log(mapGetters)
export default {
  data() {
    return {
      // username: this.$store.state.username,
      // age:this.$store.state.age
    }
  },
  computed: {
    ...mapState(['username','age']),
    // ...mapGetters(['tenYearsOld']),
    tenYearsOld(){
      return this.$store.getters.tenYearsOld;
    }
    // username() {
    //   return this.$store.state.username;
    // }
  },
  methods: {
    changeUserName() {
      // this.$store.state.username='dao'
      this.$store.commit('changeUserName',{username:'dao'})
    },
    changeUserAge(){
      // this.$store.state.age=19
      this.$store.commit('changeUserAge',{age:28})
    },
    async asyncChangeUserName(){
     await this.$store.dispatch('changeUserName',{username:'zheng'});
     console.log('change name ok');
    }
  },
  
}
</script>
<style >
  
</style>