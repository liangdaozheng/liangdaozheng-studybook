const Koa = require('koa');
const http = require('http');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const koaStaticCache = require('koa-static-cache');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cookie = require('cookie');

const key = 'kkb';

let users = [{
        id: 1,
        username: 'DaHai',
        password: '123'
    },
    {
        id: 2,
        username: 'zMouse',
        password: '123'
    },
    {
        id: 3,
        username: '111',
        password: '123'
    },
    {
        id: 4,
        username: '222',
        password: '123'
    },
    {
        id: 5,
        username: '333',
        password: '123'
    },
];

// io => 构建websocket服务器的方法
const io = require("socket.io");

const app = new Koa();


app.use(koaStaticCache({
    prefix: '/public',
    dir: './public',
    dynamic: true,
    gzip: true
}));

const router = new KoaRouter();
router.post('/login', koaBody(), async (ctx, next) => {
    let {
        username,
        password
    } = ctx.request.body;

    let user = users.find(u => u.username == username);

    if (!user) {
        ctx.throw(401, '用户不存在或密码错误');
    }
    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, key);
    // ctx.set('Authorization', token);
    ctx.cookies.set('auth', token);
    ctx.body = {
        id: user.id,
        username: user.username
    }
});

router.get('/chat', async (ctx, next) => {
    try {
        let auth = ctx.cookies.get('auth');
        let user = jwt.verify(auth, key);
    } catch (e) {
        ctx.redirect('/public/login.html');
    }
    const content = fs.readFileSync('./template/chat.html', 'utf-8');
    ctx.body = content;
})

// router.get('/users', async (ctx, next) => {
//     let users = users;

//     ctx.set('Content-Type', 'text/event-stream');

//     // ctx.body = users;

//     let eventStreamData = JSON.stringify(users);

//     ctx.body = `event: users\ndata:${eventStreamData}\n\n`;
// })

app.use(router.routes());
// app.listen(8888);
// 重写 koa 的listen 过程
const server = http.createServer(app.callback());
// 构建
const webSocket = io(server);
// 监听事件
// 每一个独立的客户端和服务器建立连接以后，会生成一个 对象，该对象保存了两个独立连接的相关信息和对应的方法，当前这个客户端与服务器的通信都是基于给对象来进行的
let sockets = [];
let socketMap = new Map();
webSocket.on('connection', (socket) => {
    console.log(`有客户端通过websocket连接了`);
    // 获取到当前登录的用户 - cookie
    // let cookie = socket.request.headers.cookie;
    // console.log('cookie', cookie);
    const cookies = cookie.parse(socket.request.headers.cookie || "");
    // console.log('cookies', cookies);
    const user = jwt.verify(cookies.auth, key);
    // console.log(socketMap,'111')
    console.log(user)
    socketMap.set(user.id, socket);

    sockets.push(socket);
    // console.log(sockets,'socket')
    // 监听 chat message 事件
    socket.on('chat message - client', (msg) => {
        console.log('message: ' + msg);
        // 组织一下返回的聊天数据
        let chatMessage = {
            msg,
            userId: user.id,
            username: user.username,
            datetime: Date.now()
        }
        // 对当前这个 socket 进行 emit
        socket.emit('chat message - server', chatMessage);
        // sockets.filter(s => s==socket);
        socket.broadcast.emit('chat message - server', chatMessage);
        // sockets.forEach(s => {
        //     s.emit('chat message - server', msg);
        // })
    })
    // 私聊
    socket.on('private message - client', (data) => {
        // zMouse => DaHai
        // zMouse => data => {msg: '你好', userId: 2}
        // socket(zMouse) => socket(DaHai)

        //  获取目标用户的socket
        let toUserSocket = socketMap.get(data.userId);
        console.log(toUserSocket)
        toUserSocket.emit('private chat message - server', {
            formUserId: user.id,
            formUserName: user.username,
            msg: data.msg
        });
    })

})

server.listen(8888);