class KVue extends EventTarget{
  constructor(options){
    super();
    this.$options=options;
    this._data=options.data;
    this.observe(this._data);
    this.compile();
  }
  observe(data){
    let keys=Object.keys(data);
    let _this=this;
    keys.forEach(key=>{
      let value=data[key];
      Object.defineProperty(data,key,{
        configurable:true,
        enumerable:true,
        get(){
          console.log('get');
          return value;
        },
        set(newVal){
          console.log('set');
          _this.dispatchEvent(new CustomEvent(key,{
            detail:newVal
          }))
          value=newVal;
        }
      })
    })
  }
  compile(){
    let ele =document.querySelector(this.$options.el);
    this.compileNodes(ele);
  }
  compileNodes(ele){
    let childNodes=ele.childNodes;
    childNodes.forEach(node => {
      if(node.nodeType===1){
        // 元素节点
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
          this.addEventListener($1,(e)=>{
            console.log('视图更新');
            let oldValue=this._data[$1];
            let newValue=e.detail;
            node.textContent=node.textContent.replace(oldValue,newValue);
          })
        }
      }
    });
  }
}