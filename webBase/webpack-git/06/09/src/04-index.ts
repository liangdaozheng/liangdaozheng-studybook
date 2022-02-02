

// function L(type:string){
//   return function(target:Function){
//     target.prototype.type=type;
//   }
// }

// function log(type?: string) {
//   return function (target: any, name: string, descriptor: PropertyDescriptor) {
//     let fn = descriptor.value;
//     descriptor.value = (a: number, b: number) => {
//       let res = fn(a, b);

//       let _type=type;
//       if(!_type){
//         _type=typeof target === "function" ? target.prototype.type : target.type
//       }


//       console.log("日志", { 
//         name, 
//         res ,
//         type:_type
//       });


//       return res

//     }

//   }
// }


// @L('log')
// class M {

//   @log()
//   static add(a: number, b: number) {
//     return a + b;
//   }
//   @log("storage")
//   static sub(a: number, b: number) {
//     return a - b;
//   }
// }

// let v1 = M.add(1, 2)
// console.log(v1)
// let v2 = M.sub(1, 2)
// console.log(v2)

