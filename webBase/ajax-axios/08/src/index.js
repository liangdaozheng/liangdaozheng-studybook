const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
// const koaBody = require('koa-body');

const configs = require('./configs/config');

const {routes}=require("./routes/index");
const resHandler=require('./middlewares/res_handler');

const dataBaseConnection=require("./middlewares/database-connection");

const server = new Koa();
const router = new KoaRouter({
  prefix:configs.router.prefix
});

// cookie sign key
// server.keys = configs.user.cookieSignKey;

// 静态资源
server.use(koaStaticCache(configs.static));

server.use(dataBaseConnection(configs.database))

// 用户
// server.use(userMiddleware());

// 数据库中间件
// server.use(databaseMiddleware(config.database));


routes.map(route=>{
  router[route.method](route.url,resHandler(),...route.middlewares)
})



server.use(router.routes());

server.listen(configs.server.port, () => {
    console.log(`服务启动成功：http://localhost:${configs.server.port}`);
});
