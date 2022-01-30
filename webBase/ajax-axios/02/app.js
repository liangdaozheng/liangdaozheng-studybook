const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");
const koaBody = require("koa-body");
let app = new Koa();
app.use(static(__dirname + "/static"));

app.use(koaBody({
  multipart: true
}));
let router = new Router();
router.get("/1", (ctx, next) => {
  ctx.body = "hello";
})


app.use(router.routes());
app.listen(3000);