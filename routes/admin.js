const Router = require('koa-router')
const controllers = require('../controllers')
const { adminMiddleware } = require("../middlewares/admin")
let adminRouter = new Router({
  prefix:'/admin'
});

adminRouter.use(adminMiddleware)

adminRouter.get('/home', controllers.admin.home)

adminRouter.get('/login', controllers.admin.login)

module.exports = adminRouter;