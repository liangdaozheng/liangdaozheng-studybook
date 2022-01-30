const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');

module.exports = () => {
    return async (ctx, next) => {
        try {
            // ctx.state.user = JSON.parse(ctx.cookies.get('user', {
            //     signed: true
            // }));

            let token = ctx.get('authorization');
            ctx.state.user = jsonwebtoken.verify(token, config.user.jwtSignKey);
        } catch (e) { }
        await next();
    }
}
