const Router = require('koa-router')
const controllers = require('../controllers')
let ApiRouter = new Router({
  prefix:'/restful/v1'
});

ApiRouter.get('/login', controllers.api.login)
ApiRouter.get('/register', controllers.api.register)

module.exports = ApiRouter;