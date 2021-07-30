const path = require('path')

module.exports = {
  port: '3001',
  secret: 'secret',
  publicDir: path.resolve(__dirname, './public'),
  logPath: path.resolve(__dirname, './logs/koa-template.log'),
  mysql: {
    host: '47.101.179.109',
    user: 'kefu',
    password: 'NejjBPsYSpMLa6DT',
    port: '3306',
    database: 'kefu',
  },
  redis: {
    host: '47.101.179.109',
    port: '45777',
    password: '7364484'
  }
}
