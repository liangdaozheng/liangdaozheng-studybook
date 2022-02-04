<template>
  <div id="app">
    <div>
      <!-- <router-link to="/user/2">to user</router-link> -->
      <button @click="handleToUser">to user</button>
    </div>
    <router-view></router-view>
    <router-view name="one"></router-view>
    <router-view name="two"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  methods: {
    handleToUser() {
      console.log(this.$router);
      // this.$router.push({path:'/user/1'})
      this.$router.push({
        name:'User',
        params:{
          id:2
        }
      },()=>{
        console.log('over') // 可以结合 beforeRouteLeave
      })
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
