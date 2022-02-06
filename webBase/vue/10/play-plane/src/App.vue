<template>
  <container>
    <StartPage v-if="currentPage==='StartPage'" @change-page="handleChangePage"></StartPage>
    <GamePage v-else-if="currentPage==='GamePage'"></GamePage>
    <EndPage v-else-if="currentPage==='EndPage'"  @change-page="handleChangePage"></EndPage>
  </container>
</template>

<script>

import EndPage from './pages/EndPage.vue'
import StartPage from './pages/StartPage.vue';
import GamePage from './pages/GamePage.vue';
import { ref } from 'vue';
export default {
  name: 'App',
  components: {
    EndPage,
    StartPage,
    GamePage
  },
  setup(){
    // const currentPage=ref('StartPage');
    const currentPage=ref('GamePage');
    // const currentPage=ref('EndPage');
    function handleChangePage(pageName){
      currentPage.value=pageName;
    }
    return {
      currentPage,
      handleChangePage
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
