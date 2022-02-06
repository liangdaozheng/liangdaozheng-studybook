<template>
  <div>
    count:{{count}}
    age:{{age}}
  </div>
  <button @click="addCount">change count</button>
  <button @click="changeAge">change age</button>
  <button @click="changeStop">change stop</button>
  <div>
    mouse move 
    x:{{XX}}
    y:{{YY}}
  </div>
</template>

<script>
import { ref, watchEffect,toRefs } from 'vue'
import {useMousemove} from '../useMousemove.js'
export default {
  setup(){
    // console.log(watchEffect);
    const count=ref(0);
    const age=ref(0);
    function addCount(){
      count.value++;
    }
    function changeAge(){
      age.value++;

    }
    let watchCount=watchEffect((onInvalidate)=>{
      onInvalidate(()=>{
        console.log('reset value');
      })
      console.log(count.value);
      console.log(age.value);
    })
    function changeStop(){
      watchCount && watchCount();
    }
    const {option}=useMousemove()
    console.log(option);
    const {x:XX,y:YY}=toRefs( option);


    return {
      XX,
      YY,
      count,
      age,
      addCount,
      changeStop,
      changeAge
    }
  }
}
</script>

<style>

</style>