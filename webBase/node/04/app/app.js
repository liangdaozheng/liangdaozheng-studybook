const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const nunjucks = require('nunjucks');
const mysql = require('mysql2/promise');

nunjucks.configure('templates', {
  autoescape: true,
  watch: true,
  noCache: true
});

const app = new Koa();

// 静态代理
app.use(koaStaticCache({
  prefix: '/static',
  dir: './public',
  dynamic: true,
  gzip: true
}));

// 数据链接
let connection = null;
app.use(async (ctx, next) => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'liangdaozheng2022',
      database: 'study'
    });
  }
  await next();
})
// 路由
const router = new KoaRouter();
router.get('/users', async (ctx, next) => {
  let {
    gender,
    age,
    page
  } = ctx.request.query;
  let where = '';
  let prepared = [];
  if (gender) {
    // where = ' where `gender`=?';
    prepared.push(gender);
  }
  if (age) {
    age = Number(age);
    // where += where ? ' and `age`<?' : ' where `age`<?';
    prepared.push(age);
  }

  // 分页
  // 每页显示的条数
  let limit = 10;
  page = page || 1;
  // 起始查询条数
  let offset = (page - 1) * limit;
  // 查询所有的数据总数，并计算出总的页数
  let sql = "select count(`id`) as `count` from `users`";
  let [
    [{
      count
    }]
  ] = await connection.query(sql);
  let pages = Math.ceil(count / limit);
  sql = "select `id`, `username`, `age`, `gender` from `users` limit ? offset ?";
  prepared = [limit, offset];
  let [users] = await connection.query(
    sql,
    // [] 中的值对应着 sql 语句中的 ？
    prepared
  );
  ctx.body = nunjucks.render('users.html', {
    users,
    page,
    pages,
    limit,
    offset
  });
});

router.get('/add', async (ctx, next) => {
  ctx.body = nunjucks.render('add.html');
});

router.post('/add', koaBody(), async (ctx, next) => {
  let {
    username,
    age,
    gender
  } = ctx.request.body;

  let [{
    affectedRows,
    insertId
  }] = await connection.query(
    "insert into `users` (`username`, `age`, `gender`) values (?, ?, ?)",
    // 下面数组中的每一个值对应替换sql语句中每一个？
    [username, age, gender]
  )

  ctx.set('Content-Type', 'text/html;charset=utf-8');
  ctx.body = '添加成功 <br> <a href="/add">继续添加</a> <br> <a href="/users">返回用户列表页面</a>';
})

router.get('/edit', async (ctx, next) => {
  let {
    id
  } = ctx.request.query;
  let sql = "select * from `users` where `id`=? limit 1";
  let [
    [user]
  ] = await connection.query(sql, [id]);
  ctx.body = nunjucks.render('edit.html', {
    user
  });
})

router.post('/edit', koaBody(), async (ctx, next) => {
  // let {id} = ctx.request.query;
  let {
    id,
    username,
    age,
    gender
  } = ctx.request.body;
  let sql = "update `users` set `username`=?, `age`=?, `gender`=? where `id`=?";
  let res = await connection.query(sql, [username, age, gender, id]);
  console.log(res);
  ctx.set('Content-Type', 'text/html;charset=utf-8');
  ctx.body = `编辑成功 <br> <a href="/edit?id=${id}">继续编辑</a> <br> <a href="/users">返回用户列表页面</a>`;
})

router.get('/delete', async (ctx, next) => {
  let {
    id
  } = ctx.request.query;
  // let sql = "delete from `users` where `id`=?";
  let sql = "update `users` set `deletestatus`=? where `id`=?";
  let res = await connection.query(sql, [1,id]);
  console.log(res);
  ctx.set('Content-Type', 'text/html;charset=utf-8');
  ctx.body = `删除成功 <br> <a href="/users">返回用户列表页面</a>`;
})

app.use(router.routes());

app.listen(8888);