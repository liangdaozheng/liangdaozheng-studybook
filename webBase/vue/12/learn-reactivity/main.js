
import {ref,reactive,effect} from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.js"

// console.log(ref);
// 核心 收集依赖 触发依赖

// const a=ref(10);

// let b;


// effect(()=>{
//   b=a.value+10;
//   console.log(b);
// })
// a.value=20


// const view =(content)=>{
//   document.getElementById("app").textContent=''
//   const div=document.createElement("div");
//   div.textContent=content.a.value;
//   document.getElementById("app").append(div);
// };
// const content={
//   a:ref(10)
// };
// effect(()=>{
//   view(content);
// })

// window.content=content;



const App = {
  render(content){
    effect(()=>{
      document.getElementById("app").textContent=''
      const div=document.createElement("div");
      div.textContent=content.a.value;
      document.getElementById("app").append(div);
    })
  },
  setup(props) {
    const a =ref(10)
    window.a=a;
    return {
      a
    }
  }
}
App.render(App.setup())