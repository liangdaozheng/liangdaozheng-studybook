
<template>
   <container>
    <sprite :texture="plane"></sprite>
  </container>
</template>

<script>
import plane from '../assets/plane.png'
import { onMounted, onUnmounted, reactive } from 'vue'

export default {
  setup(){
    return {
      plane,
    }
  }
};
export function usePlane(){
   const planeInfo=reactive({
      x:180,
      y:300
    })
    // 移动
    function move(){
      const speed=10;
      function handleMove(e){
        console.log(e.code);
        switch (e.code) {
          case 'ArrowDown':
            planeInfo.y += speed;
            break;
          case 'ArrowLeft':
            planeInfo.x -= speed;
            break;
          case 'ArrowUp':
            planeInfo.y -= speed;
            break;
          case 'ArrowRight':
            planeInfo.x += speed;
            break;
          
        }
      }
      onMounted(()=>{
        window.addEventListener("keyup",handleMove)
      })
      onUnmounted(()=>{
        window.removeEventListener("keyup",handleMove)
      })
    };
    
    move();

    return {
      planeInfo
    }
}
</script>

<style>

</style>