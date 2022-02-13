<template>
  <div>
    todo-list
    <div>
      <input type="text" @keypress.enter="addTodo" v-model="newTodo" />
      <div>
        <ul>
          <li v-for="item in showTodoList" :key="item.id">
            <TodoItem :item="item"></TodoItem>
          </li>
        </ul>
      </div>

      <div>
        <button @click="changeFilterState('all')">all</button>
        <button @click="changeFilterState('active')">active</button>
        <button @click="changeFilterState('completed')">completed</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import TodoItem from "./TodoItem.vue";
export default {
  components: {
    TodoItem,
  },
  setup() {
    const store = useStore();
    const newTodo = ref("");
    const filterState = ref("completed");
    const showTodoList = computed(() => {
      // state
      if (filterState.value === "completed") {
        return store.state.todoList.filter((item) => item.state === 1);
      } else if (filterState.value === "active") {
        return store.state.todoList.filter((item) => item.state === 0);
      } else {
        return store.state.todoList;
      }
    });

    function addTodo() {
      newTodo.value && store.commit("addTodo", newTodo.value);
      resetInputValue();
    }

    function resetInputValue() {
      newTodo.value = "";
    }

    function changeFilterState(type) {
      filterState.value = type;
    }

    return {
      newTodo,
      addTodo,
      showTodoList,
      changeFilterState,
    };
  },
};
</script>

<style></style>
