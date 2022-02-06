
import { createRenderer } from "vue";
import App from "./App.vue";
import { Application, Graphics } from "pixi.js";

const game = new Application({
  width: 500,
  height: 500,
});

document.body.append(game.view);

const renderer = createRenderer({
  createElement(type) {
    let element;
    if (type === "rect") {
      element = new Graphics();
      element.beginFill(0xff0000);
      element.drawRect(0, 0, 50, 50);
      element.endFill();
    } else if (type === "circle") {
      element = new Graphics();
      element.beginFill(0xffff00);
      element.drawCircle(0, 0, 50);
      element.endFill();
    }

    return element;
  },
  insert(el, parent) {
    parent.addChild(el);
  },
  patchProp(el, key, prevValue, nextValue) {
    console.log(el, key);
    console.log(prevValue, nextValue);
    //     if(key === "x") el.x = nextValue
    //     if(key === "y") el.y = nextValue
    el[key] = nextValue;
  },
  //   setElementText(node, text) {
  //     node.append(document.createTextNode(text));
  //   },
});

renderer.createApp(App).mount(game.stage);

// custom renderer























// import { createApp,createRenderer } from 'vue'
// import App from './App.vue'
// console.log(createApp,'createApp vue demo');
// const renderer=createRenderer({
//   createElement(type){
//     console.log(type);
//     const element=document.createElement(type);
//     return element;
//   },
//   insert(el,parent){
//     console.log(el,parent);
//     parent.append(el)
//   },
//   setElementText(node,text){
//     // console.log(node,'node');
//     // console.log(text);
//     node.append(document.createTextNode(text));
//   }
// });

// console.log(renderer);

// renderer.createApp(App).mount(document.querySelector('#app'))

                       
// // createApp(App)
// // .mount
// // ('#app') =>  // #app vue渲染浏览器平台处理过的实现的

// import * as PIXI from 'pixi.js';

// console.log(PIXI);

// import {Application,Graphics,Sprite,Texture,Text,Container} from 'pixi.js';

// import logo from './assets/logo.png'

// const game=new Application({
//   width:500,
//   height:500,
// });

// const box1=new Container();

// game.stage.addChild(box1);



// const rect=new Graphics();
// rect.beginFill(0xff0000);
// rect.drawRect(0,0,50,50);
// rect.endFill();

// rect.interactive=true;
// rect.on("pointertap",()=>{
//   console.log("click");
//   game.ticker.remove(handleTicker)

// })

// game.stage.addChild(rect);


// const img=new Sprite();

// img.texture=Texture.from(logo)

// // game.stage.addChild(img)
// box1.addChild(img)


// const text=new Text('hello');

// // game.stage.addChild(text)
// box1.addChild(text);

// box1.x=100;
// box1.y=100;

// function handleTicker(){
//   box1.x++;
// }

// game.ticker.add(handleTicker)




// document.body.append(game.view)

