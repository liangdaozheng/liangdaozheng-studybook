
<template>
  <container>
    <sprite :texture="startPage"></sprite>
    <sprite x="250" y="520" :texture="startBtn" @click="startGame" :interactive="true"></sprite>
  </container>
</template>

<script>
import startPage from '../assets/start_page.jpg';
import startBtn from '../assets/startBtn.png'

export default {
  setup(props,{emit}){
    console.log(props);
    function startGame(){
      console.log('start game');
      emit('change-page','GamePage')
    };
    return {
      startPage,
      startBtn,
      startGame
    }
  }
}
</script>

<style>

</style>