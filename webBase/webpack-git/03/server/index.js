const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/user', ctx => {
	ctx.body = {
		a: 1,
		b: 2
	}
})

app.use(router.routes())
app.listen(4567, () => {
	console.log('启动成功')
})
