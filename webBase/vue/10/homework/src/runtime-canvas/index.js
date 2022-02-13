
import { createRenderer } from 'vue'

import {Graphics} from 'pixi.js'

const renderer=createRenderer({
  createElement(type){
    console.log(type);
    const element =new Graphics();
    element.beginFill(0xff0000);
    element.drawCircle(0,0,50);
    element.endFill();
    return element;
  },
  insert(el,parent){
    parent.addChild(el);
  },
  patchProp(el,key,prevValue,nextValue){
    el[key]=nextValue;
  },
  parentNode(node){
    if(node)
    return node.parent;
  },
  nextSibling(){
    
  }

})

export function createApp (rootComponent){
  return renderer.createApp(rootComponent)
}