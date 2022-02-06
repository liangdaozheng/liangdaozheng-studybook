import { createStore } from "vuex";
import { generateId } from "../utils/generateId.js";

const createTodoItem = (context) => {
  return {
    id: generateId(),
    context,
    state: false,
  };
};

export default createStore({
  state: {
    todoList: [],
  },
  mutations: {
    addTodo(state, { context }) {
      state.todoList.push(createTodoItem(context));
    },
    removeTodo(state, { id }) {
      state.todoList = state.todoList.filter((todo) => todo.id !== id);
    },

    completeTodo(state, { id }) {
      const todoItem = state.todoList.find((todo) => todo.id === id);
      const isCompleted = (todo) => !todo.state ;

      if (todoItem) {
        todoItem.state = isCompleted(todoItem) ? true :false;
      }
    },
  },
});
