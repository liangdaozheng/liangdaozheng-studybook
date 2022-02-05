<template>
  <div>
    <img :src="item.imgUrl" alt="" />
    <p>
      {{ item.name }}
    </p>
    <button @click="back">back</button>
  </div>
</template>

<script>
import { apiGetPhoto } from "../api";

export default {
  props: ["id"],
  data() {
    return {
      item: {},
    };
  },
  async created() {
    const photo = this.$store.getters.getPhotoById(this.id);
    if (photo) {
      this.item = photo;
    } else {
      const { data } = await apiGetPhoto(this.id);
      this.item = data.data;
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
