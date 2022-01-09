export default class KPromise{
  constructor(handle){
    this['[[PromiseState]]']= 'pending';
    this['[[PromiseResult]]']=undefined;
    this.resolveFn=undefined;
    this.rejectFn=undefined;
    handle(this.#resolve.bind(this),this.#reject.bind(this))
  }
  #resolve(val){
    this['[[PromiseState]]']= 'fulfilled';
    this['[[PromiseResult]]']=val;
    this.resolveFn&&this.resolveFn(val);
  }
  #reject(err){
    this['[[PromiseState]]']= 'rejected';
    this['[[PromiseResult]]']=err;
    this.rejectFn && this.rejectFn(err)
  }
  then(onResolved,onRejected){
    // if(this['[[PromiseState]]']=== 'fulfilled'){
    //    onResolved && onResolved(this['[[PromiseResult]]']);
    // }else{
    //   onRejected && onRejected(this['[[PromiseResult]]'])
    // }
    console.log(onResolved)
   this.resolveFn=onResolved;
   this.rejectFn=onRejected;
    
  }
}
