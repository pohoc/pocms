const glob = require('glob');
const path = require('path');
const routesPath = path.resolve(__dirname, '../routes');
const ApiRouter = require("../routes/api")
/**
 * 路由中间件
 * @param app
 */
const router = app => {
  // // 把路由表文件夹的路由拼接
  // glob.sync(path.resolve(routesPath, './*.js')).forEach(path => {

  //   console.log(path)
  //   const router = require(path);
    
    app.use(ApiRouter.routes()).use(ApiRouter.allowedMethods());
 // });
};

module.exports = router;