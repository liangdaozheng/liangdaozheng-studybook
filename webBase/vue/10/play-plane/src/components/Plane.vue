
<template>
   <container>
    <sprite :texture="plane"></sprite>
  </container>
</template>

<script>
import plane from '../assets/plane.png'
import { onMounted, onUnmounted, reactive } from 'vue'
import {planeMove} from './planeMove'
export default {
  setup(){
    return {
      plane,
    }
  }
};
export function usePlane({onAttack}){
   const planeInfo=reactive({
      x:200,
      y:700,
      width:20,
      height:30
    })
    
    function attack(){
      function handleAttack(e){
        if(e.code==='Space'){
          // console.log('ggg');
          onAttack && onAttack({
            x:planeInfo.x + 100,
            y:planeInfo.y
          })
        }
      }
      onMounted(()=>{
        window.addEventListener("keyup",handleAttack)
      })
      onUnmounted(()=>{
        window.removeEventListener("keyup",handleAttack)
      })
    }
    
    planeMove(planeInfo)
    attack()

    return {
      planeInfo
    }
}
</script>

<style>

</style>