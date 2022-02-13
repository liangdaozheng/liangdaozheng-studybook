<template>
  <container>
    <sprite :texture="enemyImg"></sprite>
  </container>
</template>

<script>
import { onMounted, onUnmounted, reactive } from 'vue'
import enemyImg from '../assets/enemy.png'
import {game} from '../game'
import config from '../config'
export default {
  setup(){
    return {
      enemyImg
    }
  }
}
export function useEnemy(){
  const enemys= reactive([])
  function distoryEnemy(index){
    enemys.splice(index,1)
  }
  // 动态飞机
  function createEnemy(){
    setInterval(()=>{
      enemys.push({
        x:Math.floor(Math.random()*450)+50,
        y:-100,
        speed:typeof config.enemy.speed==='function'? config.enemy.speed(): config.enemy.speed,
        width:308,
        height:207,
        HP:2
      })
    },1000)
  }
  function hit(enemy,enemyIndex){
    enemy.HP--;
    if(enemy.HP<= 0){
      distoryEnemy(enemyIndex)
    }
  }

  function move(){
    function handleTicker(){
      enemys.forEach((enemy,index)=>{
        enemy.y+=enemy.speed;
        if(enemy.y > 1300){
          // enemys.splice(index,1);
          distoryEnemy(index)
        }
      })
    }
    onMounted(()=>{
      game.ticker.add(handleTicker);
    })
    onUnmounted(()=>{
      game.ticker.remove(handleTicker)
    })
  }
  
  createEnemy()
  move()
  return {
    enemys,
    distoryEnemy,
    hitEnemy:hit
  }
}
</script>

<style>

</style>