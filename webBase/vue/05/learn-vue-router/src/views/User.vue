<template>
  <div>
    user:{{$route.params.id}}
    <router-view></router-view>
    <button @click="back">back</button>
  </div>
</template>
<script>
export default {
  created () {
    console.log(this.$route);
  },
  watch: {
    $route() {
      console.log(this.$route.params.id);
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  beforeRouteUpdate() {
    console.log(this.$route.params.id);
  
  },
  
}
</script>
<style >
  
</style>