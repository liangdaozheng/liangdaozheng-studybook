// function log(type: string) {
//   return function (target: Function, name: string, descriptor: PropertyDescriptor) {
//     let fn = descriptor.value;
//     descriptor.value = (a: number, b: number) => {
//       let res = fn(a, b);
//       console.log("日志", { name, res ,type});
//       return res
//     }
//   }
// }
// class M {
//   @log('log')
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
