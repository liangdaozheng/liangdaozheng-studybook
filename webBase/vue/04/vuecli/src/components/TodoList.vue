<template>
  <div>
    <input type="text" @keyup.enter="addTodo" v-model="newTodo" />
    <div>
      <ul>
        <li v-for="item in todolist" :key="item.id">
          <TodoItem
            :todo="item"
            @delete="removeTodo"
            @over="overTodo"
          ></TodoItem>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import TodoItem from "./TodoItem.vue";
export default {
  data() {
    return {
      todolist: [{ id: 0, text: "dadd", status: false }],
      newTodo: "",
      id: 1,
    };
  },
  components: {
    TodoItem,
  },
  methods: {
    addTodo() {
      this.newTodo &&
        this.todolist.push({
          id: this.createId(),
          text: this.newTodo,
          status: false,
        });
      this.newTodo = "";
    },
    createId() {
      return this.id++;
    },
    removeTodo(id) {
      console.log(id);
      this.todolist = this.todolist.filter((todo) => todo.id !== id);
    },
    overTodo(id) {
      console.log(id);
      let todo = this.todolist.find((todo) => todo.id === id);
      todo.status = !todo.status;
    },
  },
};
</script>
<style></style>
