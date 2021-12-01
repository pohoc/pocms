const Router = require('koa-router')
const controllers = require('../controllers')


let ApiRouter = new Router({
  prefix:'/restful/v1'
});

ApiRouter.post('/account/login', controllers.account.login)
ApiRouter.post('/account/register', controllers.account.register)
ApiRouter.get('/account/get_admin_info', controllers.account.get_admin_info)

ApiRouter.get('/admin/get_admin', controllers.admin.get_admin)
ApiRouter.get('/admin/info_admin', controllers.admin.info_admin)
ApiRouter.post('/admin/add_admin', controllers.admin.add_admin)
ApiRouter.post('/admin/edit_admin', controllers.admin.edit_admin)
ApiRouter.post('/admin/del_admin', controllers.admin.del_admin)
ApiRouter.post('/admin/upload_admin', controllers.admin.upload_admin)



ApiRouter.get('/business/get_business', controllers.business.get_business)
ApiRouter.post('/business/update_business', controllers.business.update_business)
ApiRouter.post('/business/del_business', controllers.business.del_business)
ApiRouter.post('/business/add_business', controllers.business.add_business)
ApiRouter.get('/business/get_business_info', controllers.business.get_business_info)

module.exports = ApiRouter;