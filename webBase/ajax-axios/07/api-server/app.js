const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const jsonwebtoken = require('jsonwebtoken');

const databaseMiddleware = require('./middlewares/database');
const tplMiddleware = require('./middlewares/tpl');
const userMiddleware = require('./middlewares/user');
const authMiddleware = require('./middlewares/auth');

const config = require('./config');


const server = new Koa();
const router = new KoaRouter();

// cookie sign key
server.keys = config.user.cookieSignKey;

// 静态资源
server.use(koaStaticCache(config.static));

// 用户
server.use(userMiddleware());

// 数据库中间件
server.use(databaseMiddleware(config.database));

// 模板引擎中间件
server.use(tplMiddleware(config.template));

// 路由
// 分类
router.get('/categories', async (ctx, next) => {
    let categoryService = ctx.state.services.category;
    let categories = await categoryService.getCategories();

    ctx.body = categories;
})
// 首页
router.get('/', async (ctx, next) => {

    let categoryService = ctx.state.services.category;
    let itemService = ctx.state.services.item;

    let categories = await categoryService.getCategories();
    let categoryItems = [];

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let { items } = await itemService.getItems(category.id);
        categoryItems.push({
            categoryId: category.id,
            categoryName: category.name,
            items
        })
    }

    // ctx.render('index.html', {
    //     user: ctx.state.user,
    //     categories,
    //     categoryItems
    // });

    ctx.body = categoryItems;
});

// 列表 
router.get('/list/:categoryId', async (ctx, next) => {
    let { categoryId } = ctx.params;
    let { page, limit } = ctx.query;
    categoryId = Number(categoryId);
    page = Number(page) || 1;
    limit = Number(limit) || 4;

    // let categoryService = ctx.state.services.category;
    // let categories = await categoryService.getCategories();

    // let category = categories.find(c => c.id == categoryId);

    let itemService = ctx.state.services.item;

    let items = await itemService.getItems(categoryId, page, limit);

    // ctx.render('list.html', {
    //     user: ctx.state.user,
    //     categories,
    //     category,
    //     items
    // })

    ctx.body = items;
});

// 详情 
router.get('/detail/:itemId', async (ctx, next) => {
    let { itemId } = ctx.params;
    // let { page, limit } = ctx.query;
    // itemId = Number(itemId);
    // page = Number(page) || 1;
    // limit = Number(limit) || 4;

    // let categoryService = ctx.state.services.category;
    // let categories = await categoryService.getCategories();

    let itemService = ctx.state.services.item;

    let item = await itemService.getItem(itemId);
    // let category = categories.find(c => c.id == item.categoryId);

    // let commentService = ctx.state.services.comment;
    //
    // let comments = await commentService.getComments(item.id, page, limit);
    //
    // comments.comments = comments.comments.map(comment => {
    //     let d = new Date(comment.createdAt);
    //     return {
    //         ...comment,
    //         createAtByDate: `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    //     }
    // })


    // ctx.render('detail.html', {
    //     user: ctx.state.user,
    //     categories,
    //     category,
    //     item,
    //     comments
    // })

    ctx.body = item;
});

// 评论
router.get('/comments/:itemId', async (ctx, next) => {
    let {itemId } = ctx.params;
    let { page, limit } = ctx.query;
    itemId = Number(itemId);
    page = Number(page) || 1;
    limit = Number(limit) || 4;

    let commentService = ctx.state.services.comment;

    let comments = await commentService.getComments(itemId, page, limit);

    comments.comments = comments.comments.map(comment => {
        let d = new Date(comment.createdAt);
        return {
            ...comment,
            createAtByDate: `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
        }
    })

    ctx.body = comments;
})

// 注册页面
// router.get('/signup', async (ctx, next) => {
//     let categoryService = ctx.state.services.category;
//     let categories = await categoryService.getCategories();
//
//     ctx.render('signup.html', {
//         user: ctx.state.user,
//         categories
//     })
// });

// 注册提交处理
router.post('/signup', koaBody(), async (ctx, next) => {
    let { username, password, repassword } = ctx.request.body;

    let categoryService = ctx.state.services.category;
    let categories = await categoryService.getCategories();

    if (!username || !password || !repassword) {
        // return ctx.render('message.html', {
        //     user: ctx.state.user,
        //     categories,
        //     message: '注册失败',
        //     reasons: ['注册信息填写不正确'],
        //     url: 'javascript:window.history.back();'
        // })
        ctx.throw(400, {
            message: '注册信息填写不正确'
        })
    }

    if (password != repassword) {
        // return ctx.render('message.html', {
        //     user: ctx.state.user,
        //     categories,
        //     message: '注册失败',
        //     reasons: ['两次输入密码不一致'],
        //     url: 'javascript:window.history.back();'
        // })

        ctx.throw(400, {
            message: '两次输入密码不一致'
        })
    }

    let userService = ctx.state.services.user;

    let user = await userService.getUserByUsername(username);

    if (user) {
        // return ctx.render('message.html', {
        //     user: ctx.state.user,
        //     categories,
        //     message: '注册失败',
        //     reasons: ['用户名已经被注册了'],
        //     url: 'javascript:window.history.back();'
        // })

        ctx.throw(400, {
            message: '用户名已经被注册了'
        })
    }

    let loginUser = await userService.signup(username, password);

    if (!loginUser) {
        // return ctx.render('message.html', {
        //     user: ctx.state.user,
        //     categories,
        //     message: '注册失败',
        //     reasons: [''],
        //     url: 'javascript:window.history.back();'
        // })

        ctx.throw(400, {
            message: '注册失败'
        })
    }

    // ctx.render('message.html', {
    //     user: ctx.state.user,
    //     categories,
    //     message: '注册成功',
    //     url: '/signin'
    // });

    ctx.body = '注册成功'
});

// 登录
// router.get('/signin', async (ctx, next) => {
//     let categoryService = ctx.state.services.category;
//     let categories = await categoryService.getCategories();
//
//     ctx.render('signin.html', {
//         user: ctx.state.user,
//         categories
//     })
// });

// 登录提交处理
router.post('/signin', koaBody(), async (ctx, next) => {
    let { username, password } = ctx.request.body;

    let categoryService = ctx.state.services.category;

    if (!username || !password) {
        // return ctx.render('message.html', {
        //     user: ctx.state.user,
        //     categories,
        //     message: '登录失败',
        //     reasons: ['登录信息填写不正确'],
        //     url: 'javascript:window.history.back();'
        // })

        ctx.throw(400, {
            message: '登录失败'
        });
    }

    let userService = ctx.state.services.user;

    let user = await userService.getUserByUsername(username);

    // 验证密码是否一致
    if (!user || user.password != password) {
        // return ctx.render('message.html', {
        //     user: ctx.state.user,
        //     categories,
        //     message: '登录失败',
        //     reasons: ['用户不存在', '密码错误'],
        //     url: 'javascript:window.history.back()'
        // })
        ctx.throw(400, {
            message: '用户不存在或密码错误'
        });
    }

    // ctx.cookies.set('user', JSON.stringify({
    //     id: user.id,
    //     username: user.username
    // }), {
    //     signed: true
    // });


    let token = jsonwebtoken.sign({
        id: user.id,
        username: user.username
    }, config.user.jwtSignKey);

    ctx.set('authorization', token);


    // ctx.render('message.html', {
    //     user: ctx.state.user,
    //     categories,
    //     message: '登录成功',
    //     url: '/'
    // })

    ctx.body = {
        id: user.id,
        username: user.username
    }
});

// 个人中心
router.get('/user', authMiddleware(), async (ctx, next) => {
    let categoryService = ctx.state.services.category;
    let categories = await categoryService.getCategories();

    let userService = ctx.state.services.user;
    let user = await userService.getUserByUsername(ctx.state.user.username);

    ctx.render('user.html', {
        user: { ...ctx.state.user, avatar: user.avatar },
        categories
    })
});

// 头像上传
router.post('/avatar', koaBody({
    multipart: true,
    formidable: {
        uploadDir: './public/avatar',
        keepExtensions: true
    }
}), async (ctx, next) => {
    let avatar = ctx.request.files.avatar;
    console.log(avatar.path);
    let userService = ctx.state.services.user;

    let rs = await userService.postAvatar(ctx.state.user.id, avatar.path);

    // ctx.redirect('/user');

    ctx.body = `${avatar.path}`;
});

// 评论
router.post('/comment', authMiddleware(), koaBody(), async (ctx, next) => {
    let { itemId, content } = ctx.request.body;


    if (!content) {
        // return ctx.render('message.html', {
        //     user: ctx.state.user,
        //     categories,
        //     message: '评论失败',
        //     reasons: ['评论内容不能为空'],
        //     url: 'javascript:window.history.back()'
        // })
        ctx.throw(400, {
            message: '评论内容不能为空'
        })
    }

    let commentService = ctx.state.services.comment;
    let commentId = await commentService.postComment(itemId, ctx.state.user.id, content);

    // return ctx.render('message.html', {
    //     user: ctx.state.user,
    //     categories,
    //     message: '评论成功',
    //     reasons: [''],
    //     url: `/detail/${itemId}`
    // })

    ctx.body = {
        id: commentId
    }
});


server.use(router.routes());




server.listen(config.server.port, () => {
    console.log(`服务启动成功：http://localhost:${config.server.port}`);
});
