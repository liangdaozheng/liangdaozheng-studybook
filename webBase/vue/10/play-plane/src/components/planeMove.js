import { onMounted, onUnmounted } from 'vue'
import {game} from '../game'
export function planeMove(planeInfo) {
  const speed = 10;
  // let leftAndRightKeyCode='';
  // let upAndDownKeyCode='';

  const leftAndRightArr=[];
  const upAndDownArr=[];
  const upCommand={
    type:"upAndDown",
    name:"up",
    dir:-1
  }
  const downCommand={
    type:"upAndDown",
    name:"down",
    dir:1
  }
  const leftCommand={
    type:"leftAndRight",
    name:"left",
    dir:-1
  }
  const rightCommand={
    type:"leftAndRight",
    name:"right",
    dir:1
  }
  const map={
    ArrowUp:upCommand,
    ArrowDown:downCommand,
    ArrowLeft:leftCommand,
    ArrowRight:rightCommand,
  }
  function getArrByCommand(command){
    if(command.type==='leftAndRight'){
      return  leftAndRightArr
    }else{
     return upAndDownArr
    }
  }
  function addCommand(command){
   const arr = getArrByCommand(command);
   arr.unshift(command);
  }
  function removeCommand(command){
   const arr= getArrByCommand(command);
   const index=arr.indexOf(command);
   arr.splice(index,1)
  }
  function isExistCommand(command){
    const arr = getArrByCommand(command);
    return arr.indexOf(command) !==-1;
  }
  function handleKeyup(e){
    const command=map[e.code];
    if(command && isExistCommand(command)){
      removeCommand(command)
    }
  }
  function handleKeydown(e){
    const command=map[e.code];
    if(command && !isExistCommand(command)){
      addCommand(command)
    }
  }
  function handleTicker(){
    const leftAndRightCommand=leftAndRightArr[0];
    if(leftAndRightCommand){
      planeInfo.x +=leftAndRightCommand.dir * speed;
    }
    const upAndDownCommand=upAndDownArr[0];
    if(upAndDownCommand){
      planeInfo.y +=upAndDownCommand.dir * speed;
    }
  }

  // function handleKeyup(e) {
  //   // console.log(e.code);
  //   if(e.code==='ArrowDown' || e.code==='ArrowUp'){
  //     upAndDownKeyCode=''
  //   }
  //   if(e.code==='ArrowLeft' || e.code==='ArrowRight'){
  //     leftAndRightKeyCode=''
  //   }
  // }
  // function handleKeydown(e){
  //   if(e.code==='ArrowDown' || e.code==='ArrowUp'){
  //     upAndDownKeyCode=e.code
  //   }
  //   if(e.code==='ArrowLeft' || e.code==='ArrowRight'){
  //     leftAndRightKeyCode=e.code
  //   }
  // }
  // function handleTicker(){
  //   // switch (keyCode) {
  //   //   case 'ArrowDown':
  //   //     planeInfo.y += speed;
  //   //     break;
  //   //   case 'ArrowLeft':
  //   //     planeInfo.x -= speed;
  //   //     break;
  //   //   case 'ArrowUp':
  //   //     planeInfo.y -= speed;
  //   //     break;
  //   //   case 'ArrowRight':
  //   //     planeInfo.x += speed;
  //   //     break;

  //   // }
  //   if(upAndDownKeyCode==='ArrowDown' || upAndDownKeyCode==='ArrowUp'){
  //     if(upAndDownKeyCode==='ArrowUp'){
  //       planeInfo.y -= speed;
  //     }else{
  //       planeInfo.y += speed;
  //     }
  //   }
  //   if(leftAndRightKeyCode==='ArrowLeft' || leftAndRightKeyCode==='ArrowRight'){
  //     if(leftAndRightKeyCode==='ArrowLeft' ){
  //       planeInfo.x -= speed;
  //     }else{
  //       planeInfo.x += speed;
  //     }
  //   }
  // }
  onMounted(() => {
    game.ticker.add(handleTicker)
    window.addEventListener("keyup", handleKeyup)
    window.addEventListener("keydown", handleKeydown)
  })
  onUnmounted(() => {
    game.ticker.remove(handleTicker)
    window.removeEventListener("keyup", handleKeyup)
    window.removeEventListener("keyup", handleKeydown)
  })
}