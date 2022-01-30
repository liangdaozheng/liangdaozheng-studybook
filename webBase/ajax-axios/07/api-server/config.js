module.exports = {
    server: {
        port: 8888
    },
    static: {
        prefix: '/public',
        dir: './public',
        gzip: true,
        dynamic: true
    },
    database: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'liangdaozheng2022',
        database: 'kkb-mall'
    },
    template: {
        dir: './template'
    },
    user: {
        cookieSignKey: ['kkb-mall'],
        jwtSignKey: 'kkb-mall'
    }
}
