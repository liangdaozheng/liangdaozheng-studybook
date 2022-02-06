<template>
  <div>
    todo-list
    <div><input type="text" v-model="newTodo" @keyup.enter="addTodo" /></div>
    <div>
      <ul>
        <li v-for="item in showTodoList" :key="item.id">
          <TodoItem :item="item"></TodoItem>
        </li>
      </ul>
    </div>
    <div>
      <el-button size="small" @click="changeShowState('all')">all</el-button>
      <el-button size="small" @click="changeShowState('active')">active</el-button>
      <el-button size="small" @click="changeShowState('completed')">completed</el-button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import TodoItem from "./TodoItem.vue";
export default {
  components: {
    TodoItem,
  },
  setup() {
    const store = useStore();

    const todoList = computed(() => store.state.todoList);

    const newTodo = ref("");

    const addTodo = () => {
      newTodo.value && store.commit("addTodo", {
        context: newTodo.value,
      });
      newTodo.value = "";
    };

    const showState=ref("all");

    const showTodoList=computed(()=>{
      return store.state.todoList.filter((todo)=>{
        if(showState.value==='all'){
          return todo;
        }else if(showState.value==='active'){
          return !todo.state;
        }else if(showState.value==='completed'){
          return todo.state;
        }
      })
      
    })

    const changeShowState=(type)=>{
        showState.value=type;
    }

    return {
      newTodo,
      addTodo,
      todoList,
      showTodoList,
      changeShowState
    };
  },
};
</script>

<style></style>
