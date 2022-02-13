
<template>
  <container>
    <Map></Map>
    <Plane :x="planeInfo.x" :y="planeInfo.y"></Plane>
    <Enemy v-for="(enemy,index) in enemys" :key="index" :x="enemy.x" :y="enemy.y"></Enemy>
    <Bullet
    v-for="(bullet,index) in bullets" :key="index" :x="bullet.x" :y="bullet.y"
    ></Bullet>
  </container>
</template>

<script>
import Bullet , {useBullet}from '../components/Bullet'
import Enemy , {useEnemy}from '../components/Enemy'
import Plane, {usePlane}from '../components/Plane'
import Map from '../components/Map'
import {useFighting} from './fighting'
export default {
  components: {
    Bullet,
    Enemy,
    Plane, Map },
  setup(props,{emit}){
    console.log(props);
    const {bullets,addBullet,distoryBullet} =useBullet();

    const {planeInfo} =usePlane({
      onAttack(position){
        addBullet(position)
      }
    });
    // 多架飞机
    const {enemys,distoryEnemy,hitEnemy} =useEnemy();
    const gameover=()=>{
      emit("change-page","EndPage")
    }
    useFighting({
      gameover,
      enemys,
      bullets,
      planeInfo,
      distoryBullet,
      distoryEnemy,
      hitEnemy
    })


    return {
      planeInfo,
      enemys,
      bullets
    }
   
  }
};
</script>

<style>

</style>