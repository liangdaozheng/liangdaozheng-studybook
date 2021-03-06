
module.exports=()=>{
  return async (ctx,next)=>{
    try {
      await next();
      ctx.body={
        code:0,
        message:'',
        result:ctx.body
      }
    } catch (error) {
      ctx.status=err.status || 500
      ctx.body={
        code:err.code,
        message:err.message,
        result:err.errors
      }
      ctx.app.emit('err',err,ctx)
    }
  }
}