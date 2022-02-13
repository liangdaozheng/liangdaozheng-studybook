import {game} from '../game'
import { onMounted, onUnmounted } from 'vue'
import {hitTextObject} from '../utils'
export function useFighting({enemys,bullets,planeInfo,gameover,distoryBullet,hitEnemy}){
  // fighting
  function handleTick(){
    // hitTextObject
    enemys.forEach((enemy) => {
      if(hitTextObject(planeInfo,enemy)){
        // console.log('game over');
        // emit("change-page","EndPage")
        gameover()
      }
    });
    enemys.forEach((enemy,eIndex) => {
      bullets.forEach((bullet,bIndex) => {
        // console.log(eIndex,bIndex)
        if(hitTextObject(enemy,bullet)){
          // enemys.splice(eIndex,1)
          // distoryEnemy(eIndex)
          
          hitEnemy(enemy,eIndex)
          // bullets.splice(bIndex,1)
          distoryBullet(bIndex);
        }
      });
    });
  }
  onMounted(()=>{
    game.ticker.add(handleTick)
  })
  onUnmounted(()=>{
    game.ticker.remove(handleTick)
  })
}