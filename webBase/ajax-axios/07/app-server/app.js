const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const proxy = require('koa-server-http-proxy');

const app = new Koa();


app.use(koaStaticCache({
    prefix: '/',
    dir: './public',
    gzip: true,
    dynamic: true
}));

app.use(proxy('/api', {
    target: 'http://localhost:8888',
    pathRewrite: {
        '^/api': ''
    }
}));

app.listen(9999);
