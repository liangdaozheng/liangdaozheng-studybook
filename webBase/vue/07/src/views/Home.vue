<template>
  <div class="home">
    <UserForm></UserForm>
  </div>
</template>

<script>
import UserForm from "../components/UserForm.vue";
export default {
  name: "Home",
  components: {
    UserForm,
  },
  created() {
    this.$store.dispatch("fetchUsers");
  },
};
</script>
