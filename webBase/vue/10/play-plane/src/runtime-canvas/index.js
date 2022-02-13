
import { createRenderer } from 'vue';
import {Container,Sprite,Texture} from 'pixi.js';

const renderer=createRenderer({
  createElement(type){
    // console.log(type);
    let element;
    switch (type) {
      case 'container':
        element=new Container();
        break;
      case 'sprite':
        element=new Sprite();
        break;
      
    }
    return element;
  },
  insert(el,parent){
    el && parent.addChild(el)
  },
  patchProp(el,key,prevValue,nextValue){
    // console.log(prevValue);
    switch (key) {
      case 'texture':
        el.texture=Texture.from(nextValue)
        break;
      case 'onClick':
        el.on("pointertap",nextValue)
        break;
      default:
        el[key]=nextValue;
        break;
    }
  },
  createComment(){},
  parentNode(node){
    return node.parent;
  },
  nextSibling(){},
  remove(el){
    if(el && el.parent){
      el.parent.removeChild(el)
    }
  },
 createText (){

  }
});

export function createApp(rootCompent){
  return renderer.createApp(rootCompent);
}