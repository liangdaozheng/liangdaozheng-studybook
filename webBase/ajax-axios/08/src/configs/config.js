const path=require("path")

module.exports = {
  server: {
      port: 8888
  },
  router:{
    prefix:'/api'
  },
  static: {
      prefix: '/public',
      dir: path.resolve(__dirname,'../../public'),
      gzip: true,
      dynamic: true
  },
  database: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'liangdaozheng2022',
      database: 'cnode'
  },
  template: {
      dir: './template'
  },
  user: {
      cookieSignKey: ['kkb-mall'],
      jwtSignKey: 'kkb-mall',
      passwordSalt:'kkb'
  },
  auth:{
    secretkey:'cnode'
  },
  upload:{
    dir: path.resolve(__dirname,'../../public/avtar'),
  }
}

