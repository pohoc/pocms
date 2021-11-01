const Router = require('koa-router')
const controllers = require('../controllers')

let ApiRouter = new Router({
  prefix:'/restful/v1'
});

ApiRouter.post('/account/login', controllers.account.login)
ApiRouter.post('/account/register', controllers.account.register)

module.exports = ApiRouter;