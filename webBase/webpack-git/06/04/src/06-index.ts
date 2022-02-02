


interface T {
    a: number;
    fn: (x: number) => void;
  }
  
  let obj: T = {
    a: 1,
    fn(this: T) {
      return ()=>{
        console.log(this)
      }
    }
  }












