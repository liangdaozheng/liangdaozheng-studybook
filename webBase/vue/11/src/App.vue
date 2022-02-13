<template>
  <p>count:{{count}}</p>
  <div>
    <todo-list></todo-list>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import TodoList from './components/TodoList.vue'
export default {
  name: "App",
  components: {
    TodoList
  },
  setup() {
    const store = useStore();
    const count = computed(() => store.state.count);

    return {
      count,
    };
  },
};
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
