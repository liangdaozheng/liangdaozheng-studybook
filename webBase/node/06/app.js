const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');

const app = new Koa();

// 路由
const router = new KoaRouter();
// 登录
router.get('/', async (ctx, next) => {
  ctx.body = 'index';
})


app.use(router.routes());

app.listen(8888);