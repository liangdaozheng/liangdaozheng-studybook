<template >
  <div>
    {{user}}
    <button @click="getUser" id="btn">get user</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      user: []
    }
  },
  methods: {
    async getUser() {
      const {data}=await axios.get("/users");
      this.user=data;
    }
  },
}
</script>
<style lang="">
  
</style>