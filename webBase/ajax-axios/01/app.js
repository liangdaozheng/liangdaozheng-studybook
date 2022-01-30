const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");
const koaBody = require("koa-body");
const fs = require("fs");
const usersData = require("./data/users.json");
let app = new Koa();
app.use(static(__dirname + "/static"));
// app.use(koaBody({
//   multipart: true
// }));
let router = new Router();
router.get("/", (ctx, next) => {
  ctx.body = "hello";
})
router.get("/checkUserName", (ctx, next) => {
  console.log(ctx.query.username);
  let res = usersData.find(v => v.username == ctx.query.username);
  if (res) {
    ctx.body = {
      status: 1,
      info: "用户名正确"
    };
  } else {
    ctx.body = {
      status: 2,
      info: "用户名错误"
    };
  }
})
router.post("/checkUser", (ctx, next) => {
  console.log(ctx.request.body);
  let res = usersData.find(v => v.username == ctx.query.username&&v.password == ctx.query.password);
  if (res) {
    ctx.body = {
      status: 1,
      info: "hello"
    };
  } else {
    ctx.body = {
      status: 2,
      info: "密码错误"
    };
  }
})
router.get("/get/:id", (ctx, next) => {
  console.log(ctx.params);
  return new Promise((rel,rej)=>{ // 模拟同步数据的处理
    setTimeout(() => {
      ctx.body = {
        status: 1,
        info: "请求成功"
      }
      rel();
    }, 3000);
  })
})
router.post("/post", (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = {
    status: 1,
    info: "post请求成功"
  }
})

router.get("/xml", (ctx, next) => {
  // ctx.set("content-type","text/xml");
  ctx.body = `<?xml version='1.0' encoding='utf-8' ?>
          <books>
              <nodejs>
                  <name>nodejs实战</name>
                  <price>56元</price>
              </nodejs>
              <react>
                  <name>react入门</name>
                  <price>50元</price>
              </react>
          </books>
      `
})
router.post("/upload", (ctx, next) => {
  console.log(ctx.request.body);
  console.log(ctx.request.files.img);
  let fileData = fs.readFileSync(ctx.request.files.img.path);
  fs.writeFileSync("static/imgs/" + ctx.request.files.img.name, fileData);
  ctx.body = "请求成功";
})
router.post("/fileUpload", (ctx, next) => {
  console.log(ctx.request.files);
  let fileData = fs.readFileSync(ctx.request.files.myfile.path);
  fs.writeFileSync("static/imgs/" + ctx.request.files.myfile.name, fileData);
  ctx.body = "请求成功";
})
router.post('/attachment', koaBody({
  multipart: true,
  formidable: {
      uploadDir: './static/imgs',
      keepExtensions: true,
      maxFileSize: 100000000
  }
}), async (ctx, next) => {
  let {attachment} = ctx.request.files;

  let path = attachment.path;

  ctx.body = {
      code: 0,
      message: '上传成功',
      data: path
  }
});
app.use(router.routes());
app.listen(3000);