<template>
  <circle :x="x" :y="100"></circle>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import { game } from "./game";
export default {
  name: "App",
  components: {},
  setup() {
    const x = ref(100);

    const speed = 5;
    let dir = 1;
    let r=50;
    function handleTicker(){
      x.value += speed * dir;
      if (x.value > 800-r) {
        dir = -1;
      } else if (x.value < r) {
        dir = 1;
      }
    }
    onMounted(()=>{
      game.ticker.add(handleTicker);
    })
    
    onUnmounted(()=>{
      game.ticker.remove(handleTicker);
    })

    
    return {
      x,
    };
  },
};
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
