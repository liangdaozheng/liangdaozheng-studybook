<template>
  <div>
    count:{{ count }}
    <el-button type="primary" @click="addCount">add count</el-button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    function addCount() {
      store.commit("addCount");
    }
    const count = computed(() => store.state.count);
    return {
      count,
      addCount,
    };
  },
};
</script>

<style>
</style>