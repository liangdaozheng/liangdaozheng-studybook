<template>
  <div>
    {{ count }}

    double:{{ double }}

    <button @click="handleClick">click add</button>
  </div>
  <div>
    age:{{ user.age }} readonly age:{{ copyUser.age }}
    <button @click="handleChangeAge">change age</button>
  </div>
</template>
<script>
// options api
import { reactive, ref, readonly, computed, watch } from "vue";
import _ from "lodash";
export default {
  props: ["title"],
  setup(props) {
    console.log(props);
    const count = ref(1);
    // console.log(count);
    function handleClick() {
      count.value++;
    }

    const user = reactive({
      name: "liang",
      age: 12,
    });

    // console.log(user);

    const copyUser = readonly({
      name: "liang",
      age: 12,
    });

    // console.log(copyUser);

    function handleChangeAge() {
      user.age = 19;
    }

    const double = computed(() => {
      return count.value * 2;
    });
    watch(
      count,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
      },
      { immediate: true }
    );

    watch(
      () => user.age,
      (newVal, oldVal) => {
        console.log(newVal, oldVal, "user.age");
      }
    );
    watch(
      () => _.cloneDeep(user),
      (newVal, oldVal) => {
        console.log(newVal, oldVal,'user');
      }
    );

    return {
      double,
      copyUser,
      user,
      count,
      handleClick,
      handleChangeAge,
    };
  },
};
</script>
<style>
</style>