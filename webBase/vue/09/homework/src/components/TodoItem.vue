<template>
  <div :class="{ completed: isCompleted }">
    {{ item.context }}
    <el-button size="small" type="danger" @click="removeTodo">x</el-button>
    <el-button size="small" type="success" @click="completeTodo">completed</el-button>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: ["item"],
  setup(props) {
    const store = useStore();
    const removeTodo = () => {
      store.commit("removeTodo", { id: props.item.id });
    };

    const completeTodo = () => {
      store.commit("completeTodo", { id: props.item.id });
    };

    const isCompleted = computed(() => props.item.state);

    return {
      completeTodo,
      isCompleted,
      removeTodo,
    };
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
