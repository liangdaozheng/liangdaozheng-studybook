

interface Iobj {
  [key:string]:any
}

function merge(target:Iobj,...args:Array<Iobj>){
  return Object.assign(target,...args);
}


let newObj=merge({a:1},{b:1},{c:1})




