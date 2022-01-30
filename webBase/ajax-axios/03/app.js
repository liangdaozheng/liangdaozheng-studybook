const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');

let users = [
    {
        id: 1,
        username: 'DaHai'
    },
    {
        id: 2,
        username: 'zMouse'
    }
];

const app = new Koa();

app.use(koaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

const router = new KoaRouter();


router.get('/users', async (ctx, next) => {
    ctx.body = users;
});

app.use(router.routes());

app.listen(8888, () => {
    console.log(`服务启动成功：http://localhost:8888`);
})
