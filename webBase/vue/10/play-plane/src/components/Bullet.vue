<template>
  <container>
    <sprite :texture="bulletImg"></sprite>
  </container>
</template>

<script>
import { onMounted, onUnmounted, reactive } from 'vue'
import bulletImg from '../assets/bullet.png'
import {game} from '../game'
import config from '../config'
export default {
  setup(){
    return {
      bulletImg
    }
  }
}
export function useBullet(){
  const bullets=reactive([
  ])
  function addBullet(position){
    bullets.push({width:61,height:99,...position})
  }
  function distoryBullet(index){
    bullets.splice(index,1)
  }
  function move(){
    function handleTicker(){
      bullets.forEach((bullet,index)=>{
        bullet.y-=config.plane.bullet.speed;
        if(bullet.y<-100){
          // bullets.splice(index,1)
          distoryBullet(index)
        }
      })
    }
    onMounted(()=>{
     game.ticker.add(handleTicker);
    })
    onUnmounted(()=>{
      game.ticker.remove(handleTicker);
    })
  }
  move()
  return {
    bullets,
    addBullet,
    distoryBullet
  }
}
</script>

<style>

</style>