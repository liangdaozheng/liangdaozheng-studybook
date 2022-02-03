<template>
  <div>
    <button id="removeBtn" @click="overTodo(todo.id)">over</button>
    <span :class="classOver"> {{ todo.text }}</span>
    <button @click="handleDelete(todo.id)">delete</button>
    <slot></slot>
  </div>
</template>
<script>
export default {
  computed: {
    classOver() {
      return {
        over: this.todo.status,
      };
    },
  },
  props: ["todo"],
  methods: {
    handleDelete(id) {
      this.$emit("delete", id);
    },
    overTodo(id) {
      this.$emit("over", id);
    },
  },
};
</script>
<style>
.over {
  text-decoration: line-through;
}
</style>
