<template>
  <div>
    Baz
    <input type="text" ref="inputRef" />
  </div>
  <div>
    <ul>
      <li
        v-for="(user, index) in users"
        :key="index"
        :ref="
          (el) => {
            if (el) lis[index] = el;
          }
        "
      >
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import {
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  inject,
  ref,
  watchEffect,
  reactive,
} from "vue";
export default {
  setup() {
    onBeforeMount(() => {
      console.log("onBeforeMount");
    });
    onMounted(() => {
      console.log("onMounted");
    });

    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });
    onUpdated(() => {
      console.log("onUpdated");
    });
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount");
    });
    onUnmounted(() => {
      console.log("onUnmounted");
    });

    const appValue = inject("app", "app.vue default value");
    console.log(appValue);
    const inputRef = ref(null);
    onMounted(() => {
      console.log(inputRef.value, "1111");
    });
    watchEffect(
      () => {
        console.log(inputRef.value, "watchEffect");
      },
      {
        flush: "post",
      }
    );

    const users = reactive([
      { name: 1 },
      { name: 2 },
      { name: 3 },
      { name: 4 },
    ]);

    const lis = ref([]);
    onMounted(() => {
      console.log(lis, "lis");
    });

    return {
      inputRef,
      users,
      lis,
    };
  },
};
</script>

<style>
</style>