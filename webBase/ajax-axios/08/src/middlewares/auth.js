const jsonwebtoken = require('jsonwebtoken');
const config=require("../configs/config");

module.exports=()=>{
  return async (ctx,next)=>{
    try {
      let user=jsonwebtoken.verify(ctx.header.authorization,config.auth.secretkey);
      ctx.state.user=user;

    } catch (error) {
      ctx.throw(401,{
        code:-1,
        message:"请登录"
      })
      
    }

    await next();

  }
}