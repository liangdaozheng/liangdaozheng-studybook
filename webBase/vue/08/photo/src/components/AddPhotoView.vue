<template>
  <div class="masking" v-show="visible">
    <div class="addPhotoContainer"></div>
    <div class="addController">
      <h3 class="addTitle">
        上传照片-普通上传(H5)<span class="close" @click="close">X</span>
      </h3>
      <div class="photoTitles">
        <span class="uploadTo">上传到</span>
        <div class="photoSelect">
          <img class="showPhoto" src="public/img/1.jpg" />
          相册名称
        </div>
      </div>
      <!-- 上传按钮 -->
      <div class="showContainer" v-show="!showLoadContainer">
        <div class="uploadContainer">
          <span class="fileinput-button">
            <span>上传图片</span>
            <input
              class="imgFile"
              type="file"
              name=""
              multiple="multiple"
              @input="addImg"
            />
          </span>
          <span class="hint"> 按住Ctrl可多选 </span>
        </div>
      </div>

      <!-- 显示待上传图片  -->
      <div class="loadContainer" v-show="showLoadContainer">
        <div class="wantUpload">
          <template v-for="(item, index) in wantPhotos">
            <UploadPhotoItem
              :item="item"
              :key="index"
              ref="items"
            ></UploadPhotoItem>
          </template>
        </div>
        <div class="addStyle">
          <!-- <span class="fileinput-add">
              <span></span>
              <input class="imgFile-add" type="file" multiple="multiple" />
            </span> -->
        </div>
        <!-- 开始上传按钮 -->
        <div class="bottomStyle">
          <span class="uploadBtn" @click="uploadImg">开始上传</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadPhotoItem from "./UploadPhotoItem.vue";
import { apiUpload } from "../api";
export default {
  props: ["visible"],
  components: {
    UploadPhotoItem,
  },
  data() {
    return {
      wantPhotos: [],
    };
  },
  computed: {
    showLoadContainer() {
      return this.wantPhotos.length > 0;
    },
  },
  methods: {
    async uploadImg() {
      const tasks = this.wantPhotos.map((val, index) => {
        return apiUpload(val, (percent) => {
          const item = this.$refs.items[index];
          item.updateProgress(percent);
        });
      });

      await Promise.all(tasks);
      this.reset();
      this.uploadCompleted();
    },
    uploadCompleted() {
      this.$emit("upload-completed");
    },

    reset() {
      this.wantPhotos.length = 0;
    },
    close() {
      this.$emit("update:visible", false);
    },
    addImg(e) {
      // console.log(e.target.files);
      this.wantPhotos.push(...e.target.files);
      // console.log(this.wantPhotos);
    },
  },
};
</script>

<style></style>
