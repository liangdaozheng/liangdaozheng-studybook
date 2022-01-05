

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



}//end

function $(arg){
  return new Jq(arg)
}