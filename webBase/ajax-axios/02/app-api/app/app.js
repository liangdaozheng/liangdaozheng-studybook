const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const proxy = require('koa-server-http-proxy');

const app = new Koa();

app.use(koaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

app.use(proxy(
    // 转发的url规则，以 /api 开头的 url 进行代理转发
    // http://localhost:9999/api/users
    '/api', {
        // 代理的目标服务器地址
        // http://localhost:9999/api/users => http://localhost:8888/api/users
        target: 'http://localhost:8888',
        pathRewrite: {
            // 对 path 部分的内容进行重写，以满足目标服务器的url
            // http://localhost:8888/api/users => http://localhost:8888/users
            '^/api': ''
        }
    }
));


app.listen(9999, () => {
    console.log(`服务器启动成功：http://localhost:9999`);
});