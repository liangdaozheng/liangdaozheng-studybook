<template>
  <div>
    <div class="container">
      <div class="photoHeader">
        <div class="imgContainer">
          <img class="photoName" src="public/img/1.jpg" />
        </div>
        <div class="btnContainer">
          <span class="photoTitle">相册名称</span>
          <button class="mybtn" @click="showAddPhotoView = true">
            上传照片
          </button>
        </div>
      </div>

      <div class="photoContainer">
        <template v-for="item in photos">
          <router-link
            :key="item.id"
            :to="{ name: 'Details', params: { id: item.id } }"
          >
            <div class="photoItem">
              <img :src="item.imgUrl" />
              <span> {{ item.name }} </span>
            </div>
          </router-link>
        </template>
      </div>
    </div>
    <AddPhotoView
      :visible.sync="showAddPhotoView"
      @upload-completed="handleUploadCompleted"
    ></AddPhotoView>
  </div>
</template>

<script>

import AddPhotoView from "../components/AddPhotoView.vue";
export default {
  components: {
    AddPhotoView,
  },

  async created() {
    this.updatePhotos();
  },
  methods: {
    updatePhotos() {
      this.$store.dispatch("updatePhotos");
    },
    async handleUploadCompleted() {
      this.updatePhotos();
    },
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    },
  },
  data() {
    return {
      showAddPhotoView: false,
    };
  },
};
</script>

<style></style>
