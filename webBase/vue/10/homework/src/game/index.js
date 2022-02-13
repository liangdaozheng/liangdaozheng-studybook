
import {Application} from 'pixi.js'

export const game=new Application({
  width:800,
  height:600
})

document.body.append(game.view);

export function getRootConstainer(){
  return game.stage;
}