const Koa = require("koa");

const Router = require("koa-router");

const serve = require("koa-static");
const fs = require("fs");

const app = new Koa();

app.use(serve(__dirname + "/static"));

// index.html
app.use((ctx) => {
  console.log("heiheihei");
  // index.html
  const indexTemplate = fs.readFileSync("./static/index.html");
  ctx.set("content-type", "text/html; charset=utf-8");
  ctx.body = indexTemplate.toString();
});

const router = new Router();
router.get("/", (ctx) => {
  ctx.body = "hello server";
});
app.use(router.routes());

app.listen(8080, () => {
  console.log("open server localhost:8080");
});
