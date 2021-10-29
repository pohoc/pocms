const Router = require('koa-router')
const controllers = require('../controllers')
let ApiRouter = new Router({
  prefix:'/restful/v1'
});

ApiRouter.post('/account/login', controllers.api.login)
ApiRouter.post('/account/register', controllers.api.register)

module.exports = ApiRouter;