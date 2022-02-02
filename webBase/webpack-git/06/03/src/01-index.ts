

interface Point {
 readonly x:number;
  y:number;
  color?:string;
  [prop:number]:number;
}

let p1:Point ={
  x:100,
  y:200
}



// function fn1(x:number,y:number):number{
//   return x+y;
// }

interface IFunc {
  (x:number,y:number):number
}

let fn1:IFunc = function(a:number,b:number):number{
  return a+b;
}




