const Koa=require("koa");
const Router=require("koa-router");
const nunjucks=require("koa-nunjucks-2");
let app=new Koa();
let router=new Router();
app.use(nunjucks({
  ext:'html',// .njk
  path:__dirname+"/views",
  nunjucksConfig:{
    trimBlocks:true //防止xss漏洞
  }
}));
router.get("/",async ctx=>{
  // ctx.body="hello";
  let users=[{name:1},{name:2},{name:3},{name:4},]
  await ctx.render("index",{
    data:'我是数据',
    users,
    num:2
  })
})

app.use(router.routes());
app.listen(3000)