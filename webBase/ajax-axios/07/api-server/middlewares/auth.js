module.exports = () => {
    return async (ctx, next) => {
        if (!ctx.state.user || ctx.state.user.id < 1) {
            // ctx.redirect('/signin');
            ctx.throw(401, {
                message: '没有登录'
            })
            return;
        }
        await next();
    }
}
