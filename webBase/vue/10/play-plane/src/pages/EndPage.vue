
<template>
  <container>
    <sprite :texture="endPage"></sprite>
    <sprite x="250" y="520" :texture="restartBtn" @click="startGame" :interactive="true"></sprite>
  </container>
</template>

<script>
import endPage from '../assets/end_page.jpg';
import restartBtn from '../assets/restartBtn.png'

export default {
  setup(props,{emit}){
    console.log(props);
    function startGame(){
      console.log('start game');
      emit('change-page','GamePage')
    };
    return {
      endPage,
      restartBtn,
      startGame
    }
  }
}
</script>

<style>

</style>