const Router = require('koa-router')
const controllers = require('../controllers')

let ApiRouter = new Router({
  prefix:'/restful/v1'
});

ApiRouter.post('/account/login', controllers.account.login)
ApiRouter.post('/account/register', controllers.account.register)
ApiRouter.get('/account/get_user_info', controllers.account.get_user_info)
ApiRouter.get('/account/get_user_role', controllers.account.get_user_role)

ApiRouter.get('/business/get_business', controllers.business.get_business)
ApiRouter.post('/business/update_business', controllers.business.update_business)
ApiRouter.post('/business/del_business', controllers.business.del_business)
ApiRouter.post('/business/add_business', controllers.business.add_business)
ApiRouter.get('/business/get_business_info', controllers.business.get_business_info)

module.exports = ApiRouter;