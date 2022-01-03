export default class MyEvent{
  constructor(){
      this.handles = {};
  }
  addEvent(eventName,fn){
      // {myevent1:[fn1,fn2...],myevent2:[fn1,fn2...]}
      if(typeof this.handles[eventName]==="undefined"){
          this.handles[eventName] = [];
      }
      this.handles[eventName].push(fn);
  }
  trigger(eventName){
      if(!(eventName in this.handles)){
          return ;
      }
      this.handles[eventName].forEach(fn=>{
          fn();
      })
  }
  removeEvent(eventName,fn){
      if(typeof this.handles[eventName] === "undefined"){
          throw new Error ("not found " + eventName);
          return ;
      }
      for(let i=0;i<this.handles[eventName].length;i++){
          if(this.handles[eventName][i]===fn){
              this.handles[eventName].splice(i,1);
              break;
          }
      }
  }
}