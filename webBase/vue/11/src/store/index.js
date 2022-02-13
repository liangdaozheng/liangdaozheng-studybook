import { createStore } from "vuex";

let id = 10;

export default createStore({
  state: {
    todoList: [
      {
        id: 1,
        content: "吃饭",
        state: 1, // 1 代表着完成 0 代表着 active
      },
      {
        id: 2,
        content: "睡觉",
        state: 0,
      },
      {
        id: 3,
        content: "打豆豆",
        state: 0,
      },
    ],
    count:0
  },
  mutations: {
    addTodo(state, payload) {
      state.todoList.push({
        id: id++,
        content: payload,
      });
    },

    removeTodo(state, id) {
      state.todoList = state.todoList.filter((todo) => todo.id !== id);
    },

    completeTodo(state, id) {
      const item = state.todoList.find((i) => i.id === id);
      const isCompleted = (item)=> item.state === 1
      if (item) {
        item.state = isCompleted(item) ? 0 : 1;
      }
    },
  },
});
