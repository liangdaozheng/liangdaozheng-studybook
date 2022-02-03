<template>
  <div>
    <p>hi app</p>
    
  </div>
</template>

<script>
export default {
  name:"app",
  methods: {
    name() {
      console.log(222);
    }
  },
  mounted () {
    console.log(11);
  },
}
</script>

<style>
  .app{
    background: red;
  }
</style>