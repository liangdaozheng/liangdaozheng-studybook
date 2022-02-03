<template>
  <div id="app">
    todos
    <TodoList> </TodoList>
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";
export default {
  name: "App",
  components: {
    TodoList,
  },
};
</script>

<style>
/* #app{
  display: flex;
  justify-content: center;
} */
</style>
