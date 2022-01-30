const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");
let app = new Koa();
let router = new Router();
app.use(static(__dirname+"/static"));
router.get("/",(ctx,next)=>{
    ctx.body = "hello run at 4000";
})
router.get("/getAjax",(ctx,next)=>{
    console.log("4000 run ");
    // console.log(ctx.query.name);
    // ctx.body = {
    //     name:"李四4000",
    //     age:20
    // }
    let cb = ctx.query.callback;
    // ctx.body = "var a = 20";
    let obj = {
        a:20,
        b:20
    }
    ctx.body = `${cb}(${JSON.stringify(obj)})`;
})
app.use(router.routes());
app.listen(4000);