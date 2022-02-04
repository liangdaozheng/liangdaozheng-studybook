<template>
  <div id="UserForm">
    <table>
      <tr>
        <th>id</th>
        <th>用户名</th>
        <th>邮箱</th>
        <th>性别</th>
        <th>爱好</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item, index) of users" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.gender }}</td>
        <td>{{ item.hobby.join(" | ") }}</td>
        <td>
          <button @click="modify(index)">修改</button>
          <button @click="deleteData(item.id)">删除</button>
        </td>
      </tr>
    </table>

    <!-- <modify-panel
      :visible.sync="showModifyPanel"
      :item="currentModifyItem"
      @save="handleSave"
    >
    </modify-panel> -->
  </div>
</template>

<script>

// import ModifyPanel from "../views/ModifyPanel.vue";
export default {
  components: {
    //     ModifyPanel,
  },
  data() {
    return {
      //       formData,
      showModifyPanel: false,
      currentModifyIndex: -1,
    };
  },
  computed: {
    currentModifyItem() {
      return this.$store.state.users[this.currentModifyIndex];
    },
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    //     findDataById(id) {
    //       return this.formData.find((d) => d.id === id);
    //     },

    //     handleSave(info) {
    //       // 基于id找到具体的数据
    //       const rawData = this.findDataById(info.id);
    //       if (rawData) {
    //         rawData.hobby = info.hobby;
    //         rawData.username = info.username;
    //         rawData.email = info.email;
    //         rawData.gender = info.gender;
    //       }
    //     },
    modify(index) {
      //       this.showModifyPanel = true;
      this.currentModifyIndex = index;
      //       this.store.commit("changeModifyIndex", { index });

      // item
      // currentModifyItem
      this.$router.push({
        name: "Modify",
        params: {
          item: this.currentModifyItem,
        },
      });
    },
    deleteData(id) {
      // 删除指定的数据
      //       this.formData.splice(index, 1);
      //       this.$store.commit("deleteUser", {
      //         index,
      //       });
      this.$store.dispatch("deleteUser", {
        id,
      });
    },
  },
};
</script>

<style></style>
