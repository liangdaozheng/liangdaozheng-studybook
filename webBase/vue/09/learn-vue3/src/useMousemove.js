import {onMounted,onUnmounted,reactive} from 'vue'

export function useMousemove (){
  const option = reactive({
    x:0,
    y:0
  });
  function handleMove(e){
    option.x=e.pageX;
    option.y=e.pageY;
  }
  onMounted(()=>{
    window.addEventListener('mousemove',handleMove)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove',handleMove)
  });
  return {option};

}