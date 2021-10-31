const path = require('path')

module.exports = {
  port: '3001',
  secret: 'secret',
  publicDir: path.resolve(__dirname, './public'),
  logPath: path.resolve(__dirname, './logs/koa-template.log'),
  errLogin: 180,
  mysql: {
    host: '10.10.10.180',
    user: 'kefu',
    password: 'wMGBNKdG25KxTAW7',
    port: '3306',
    database: 'kefu',
  },
  redis: {
    host: '10.10.10.180',
    port: '6379',
    password: '7364484'
  }
}
