<template >
  <div>
    {{count}}
    {{inputValue}}
    <button @click="count++" id="btn">add count</button>
    <input v-model="inputValue" type="text" id="input" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 1,
      inputValue:"dao"
    }
  },
  
}
</script>
<style >
  
</style>