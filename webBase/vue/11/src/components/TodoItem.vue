<template>
  <div>
    <span :class="{ completed: isCompleted }">
      {{ item.content }}
    </span>

    <button @click="removeTodo">Del</button>
    <button @click="completeTodo">Over</button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["item"],
  setup(props) {
    const store = useStore();
    function removeTodo() {
      store.commit("removeTodo", props.item.id);
    }

    function completeTodo() {
      store.commit("completeTodo", props.item.id);
    }
    // computed
    const isCompleted = computed(() => props.item.state === 1);

    return {
      removeTodo,
      completeTodo,
      isCompleted
    };
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
