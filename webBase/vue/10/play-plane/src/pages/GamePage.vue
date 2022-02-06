
<template>
  <container>
    <Map></Map>
    <Plane :x="planeInfo.x" :y="planeInfo.y"></Plane>
  </container>
</template>

<script>
import Plane, {usePlane}from '../components/Plane'
import Map from '../components/Map'
export default {
  components: {
    Plane, Map },
  setup(){
    const {planeInfo} =usePlane();
    return {
      planeInfo
    }
   
  }
};
</script>

<style>

</style>