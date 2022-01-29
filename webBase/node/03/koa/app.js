// 引入 koa
const Koa=require('koa');
// const static=require('./middlewares/static');
// const router=require('./middlewares/router');
const koaStaticCache=require("koa-static-cache");
const KoaRouter = require('@koa/router');
const koaBody = require('koa-body');
const nunjucks = require('nunjucks');

nunjucks.configure('templates', { autoescape: true, watch: true, noCache: true });

let maxUserId = 2;
let users = [
    {id: 1, username: 'haizi'},
    {id: 2, username: 'zMouse'}
]
// 初始化 app
const app=new Koa();

// 注册中间件


app.use(koaStaticCache({
  prefix:'/static',
  dir:'./public',
  dynamic:true,
  gzip:true
}));

// 动态资源
let router=new KoaRouter();

router.get('/', async (ctx, next) => {
  ctx.body = '首页';
});
router.get('/users', async (ctx, next) => {
  ctx.body = nunjucks.render('users.html', {users});
});
router.get('/add', async (ctx, next) => {
  ctx.body = nunjucks.render('add.html', {});
});
// 默认情况下，koaBody 中间件会解析提交过来的正文数据，并把解析后的数据转成对象存储到 ctx.request.body 属性中
router.post('/add', koaBody(), async (ctx, next) => {
  // console.log(ctx.request.body);
  let {username} = ctx.request.body;
  users.push({
      id: ++maxUserId,
      username
  });
  ctx.body = '添加成功';
});


app.use(router.routes());







// 静态资源中间件

// app.use(static({
//   prefix:'/public'
// }));

// // 动态资源路由中间件

// app.use(router());

// app.use((ctx,next)=>{
//   console.log("中间件 -1 ");
//   ctx.body="这是返回的值11";
//   next();
// })
// app.use((ctx,next)=>{
//   console.log("中间件 -2 ");
//   ctx.body+="这是返回的值22";
//   next();
// })
// app.use((ctx,next)=>{
//   console.log("中间件 -3 ");
//   ctx.body+="这是返回的值33"
// })







app.listen(8888);




















