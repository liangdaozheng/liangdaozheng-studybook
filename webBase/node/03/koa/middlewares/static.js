const url = require('url');
const fs = require('fs');
module.exports = function (options) {
  let opts = Object.assign({}, {
    prefix: '/static',
    // dir:"/public"
  }, options);
  return async function (ctx, next) {
    console.log(ctx.request.url);
    console.log(ctx.url);
    const urlObj = url.parse(ctx.url);
    if (urlObj.pathname.startsWith(opts.prefix)) {
      // 静态资源
      try {
        // 获取当前文件的后缀
        // /static/1.html
        let lastPointIndexOf = urlObj.pathname.lastIndexOf('.');
        let suffix = urlObj.pathname.substring(lastPointIndexOf);
        let content = fs.readFileSync(`.${urlObj.pathname}`);
        // 设置响应头
        // {'.html': 'text/html;charset=utf-8'}
        switch (suffix) {
          case '.html':
            // res.setHeader('Content-Type', 'text/html;charset=utf-8');
            ctx.set('Content-Type', 'text/html;charset=utf-8');
            break;
          case '.css':
            ctx.set('Content-Type', 'text/css;charset=utf-8');
            break;
          case '.png':
            ctx.set('Content-Type', 'image/png');
            break;
          default:
            ctx.set('Content-Type', 'text/plain');
            break;
        }
        ctx.body = content;
      } catch (e) {
        ctx.status = 404;
        ctx.set('Content-Type', 'text/html;charset=utf-8');
        ctx.body = '<h1>页面丢失了</h1>';
      }
    } else {
      await next();
    }
  }
}