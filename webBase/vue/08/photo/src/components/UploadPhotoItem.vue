<template>
  <div class="uploadPhotoItem">
    <span class="myProgress">
      <span class="plan" :style="{ width: percent + '%' }"></span>
      {{ percent }}%
    </span>
    <img :src="imgUrl" />
    <span class="pictureName"> {{ item.name }} </span>
  </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      imgUrl: "",
      percent: 0,
    };
  },
  created() {
    const render = new FileReader();
    render.readAsDataURL(this.item);
    render.onload = () => {
      this.imgUrl = render.result;
    };
  },
  methods: {
    updateProgress(val) {
      this.percent = val;
    },
  },
};
</script>

<style></style>
