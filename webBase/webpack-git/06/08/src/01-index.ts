

namespace k1 {
  let a = 10;
  export let obj={
    a
  }
}



namespace k2 {
  let a = 20;
  console.log(k1.obj)
}
