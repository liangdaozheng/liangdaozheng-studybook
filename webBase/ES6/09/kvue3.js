

class KVue {
  constructor(options){
    this.$options=options;
    this._data=options.data;
    this.observe(this._data);
    this.compile();
  }
  observe(data){
    let temp={};

    this._data=new Proxy(data,{
      get(target,key){
        temp[key]=new Dep();
        if(Dep.target){
          temp[key].addSub(Dep.target)
        }
        return Reflect.get(target,key)
      },
      set(target,key,newVal){
        temp[key].notify(newVal);
        return Reflect.set(target,key,newVal)
      }
    })
  }
  // observe(data){
  //   let keys=Object.keys(data);
  //   let dep=new Dep();
  //   keys.forEach(key=>{
  //     let value=data[key];
  //     Object.defineProperty(data,key,{
  //       configurable:true,
  //       enumerable:true,
  //       get(){
  //         console.log('get');
  //         if(Dep.target){
  //           dep.addSub(Dep.target);
  //         };
  //         return value;
  //       },
  //       set(newVal){
  //         console.log('set');
  //         // _this.dispatchEvent(new CustomEvent(key,{
  //         //   detail:newVal
  //         // }))
  //         dep.notify(newVal);
  //         value=newVal;
  //       }
  //     })
  //   })
  // }
  compile(){
    let ele =document.querySelector(this.$options.el);
    this.compileNodes(ele);
  }
  compileNodes(ele){
    let childNodes=ele.childNodes;
    childNodes.forEach(node => {
      if(node.nodeType===1){
        // 元素节点
        // 查找指令
        let attrs=node.attributes;
        // console.log(attrs);
        [...attrs].forEach(attr=>{
          let attrName=attr.name;
          let attrValue=attr.value;
          if(attrName === 'v-module'){
            node.value=this._data[attrValue];
            node.addEventListener('input',e=>{
              let newValue=e.target.value;
              this._data[attrValue]=newValue
            })
          }
        })

        if(node.childNodes.length>0){
          this.compileNodes(node);
        }
      }else if(node.nodeType===3){
        // 文本节点
        let reg=/\{\{\s*([^{}\s]+)\s*\}\}/g;
        let textContent=node.textContent;
        // console.log(textContent);
        if(reg.test(textContent)){
          // console.log('you {{}}');
          let $1=RegExp.$1;
          // console.log(RegExp)
          node.textContent=node.textContent.replace(reg,this._data[$1]);
          // this.addEventListener($1,(e)=>{
          //   console.log('视图更新');
          //   let oldValue=this._data[$1];
          //   let newValue=e.detail;
          //   node.textContent=node.textContent.replace(oldValue,newValue);
          // })
          new Watcher(this._data,$1,(newVal)=>{
            console.log('视图更新');
            let oldValue=this._data[$1];
            node.textContent=node.textContent.replace(oldValue,newVal);
          })
        }
      }
    });
  }
}





class Dep{
  constructor(){
    this.subs=[];

  }
  addSub(sub){
    this.subs.push(sub)
  }
  notify(newVal){
    this.subs.forEach(sub=>{
      sub.update(newVal);
    })
  }
}

class Watcher{
  constructor(data,key,cb){
    Dep.target=this;
    data[key];//触发get 收集watcher
    this.cb=cb;
    // Dep.target=null;
  }
  update(newVal){
    this.cb(newVal);
  }
}