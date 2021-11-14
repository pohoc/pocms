const path = require('path')
const dotenv = require('dotenv');
const configs = dotenv.config();

module.exports = {
  port: process.env.APP_PORT,
  secret: process.env.APP_SECRET,
  publicDir: path.resolve(__dirname, './public'),
  logPath: path.resolve(__dirname, './logs/koa-template.log'),
  errLogin: 180,
  mysql: {
    host: process.env.APP_MYSQL_HOST,
    user: process.env.APP_MYSQL_USER,
    password: process.env.APP_MYSQL_PASS,
    port: process.env.APP_MYSQL_PORT,
    database: process.env.APP_MYSQL_DATABASE,
    base: process.env.APP_MYSQL_BASE,
  },
  redis: {
    host: process.env.APP_REDIS_HOST,
    port: process.env.APP_REDIS_PORT,
    password: process.env.APP_REDIS_PASS
  }
}
