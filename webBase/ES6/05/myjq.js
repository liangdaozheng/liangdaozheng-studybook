

class Jq{
  constructor(arg,root){
    if(typeof root === "undefined"){
      this.prevObject=[document]
    }else{
      this.prevObject=root
    }
    if(typeof arg ==='string'){
      // this.ele=document.querySelector(arg);
      let eles=document.querySelectorAll(arg);
      // console.log(eles,'222')
      this.#addEles(eles)
    }else if(typeof arg==='function'){
      document.addEventListener('DOMContentLoaded',arg);
    }else{
      if(typeof arg.length !== "undefined"){
        // console.log(111)
        this.#addEles(arg)
      }else{
        // console.log(222)
        this[0]=arg;
        this.length=1;
      }
    }
    
  }
  #addEles(eles){
    console.log(eles);
    for (let index = 0; index < eles.length; index++) {
      this[index] = eles[index];
      
    }
    this.length=eles.length;
  }
  click(cb){
    // this.ele.addEventListener('click',cb);
    for (let index = 0; index < this.length; index++) {
      this[index].addEventListener('click',cb);
      
    }
  }
  on(eventName,cb){
    let eventArr=eventName.split(" ");
    // console.log(eventArr);
    for (let index = 0; index < this.length; index++) {
      for (let j = 0; j < eventArr.length; j++) {
        this[index].addEventListener(eventArr[j],cb);
        
      }
      
    }
    return this;
  }
  eq(index){
    // return this[index];
    return new Jq(this[index],this);
  }
  end(){
    return this.prevObject;
  }
  get(index){
    return this[index];
  }
  css(...args){
    // console.log(args);
    if(args.length === 1){
      // 一个参数
      if(typeof args[0]==='object'){
        // 对象1 设置多个样式
        for (let index = 0; index < this.length; index++) {
          for (let key in args[0]) {
            this.#setStyle(this[index],key,args[0][key])
          }
        }
      }else{
        // 3 获取样式 多个元素处理第一个样式
       return this.#getStyle(this[0],args[0])
      }
    }else{
      // 两个参数2 设置一个样式
      for (let index = 0; index < this.length; index++) {
        this.#setStyle(this[index],args[0],args[1])
      }
    }
    return this;
  }
  #getStyle(ele,styleName){
    if(styleName in $.cssHooks){
     return $.cssHooks[styleName].get(ele);
    }
    return getComputedStyle(ele,null)[styleName]
  }
  #setStyle(ele,styleName,styleValue){
    if(typeof styleValue==='number' && !$.cssNumber[styleName]){
      styleValue=styleValue+'px'
    }
    if(styleName in $.cssHooks){
      $.cssHooks[styleName].set(ele,styleValue);
     }
    ele.style[styleName]=styleValue;
  }


}//end

$.cssNumber={
  key:true
}
$.cssHooks={}
function $(arg){
  return new Jq(arg)
}