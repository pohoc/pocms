const Router = require("koa-router");
const controllers = require("../controllers");
const ApiAction = require("../action/api.action");

let ApiRouter = new Router({
  prefix: "/restful/v1",
});

ApiAction.getAllRouter().then((res) => {
  res.forEach((item) => {
    item.children.forEach((items) => {
      const url = `/${item.name}/${items.name}`; // 组合真正链接
      const handler = `controllers.${item.name}.${items.name}`;
      ApiRouter[items.method](url, handler); // 创建路由
    });
  });
});

// ApiRouter.post("/account/login", controllers.account.login);
// ApiRouter.post("/account/register", controllers.account.register);
// ApiRouter.get("/account/get_admin_info", controllers.account.get_admin_info);

// ApiRouter.get("/admin/get_admin", controllers.admin.get_admin);
// ApiRouter.get("/admin/info_admin", controllers.admin.info_admin);
// ApiRouter.post("/admin/add_admin", controllers.admin.add_admin);
// ApiRouter.post("/admin/edit_admin", controllers.admin.edit_admin);
// ApiRouter.post("/admin/del_admin", controllers.admin.del_admin);
// ApiRouter.post("/admin/upload_admin", controllers.admin.upload_admin);

// ApiRouter.get("/role/get_role", controllers.role.get_role);
// ApiRouter.get("/role/info_role", controllers.role.info_role);
// ApiRouter.post("/role/add_role", controllers.role.add_role);
// ApiRouter.post("/role/edit_role", controllers.role.edit_role);
// ApiRouter.post("/role/del_role", controllers.role.del_role);

// ApiRouter.get("/business/get_business", controllers.business.get_business);
// ApiRouter.post(
//   "/business/update_business",
//   controllers.business.update_business
// );
// ApiRouter.post("/business/del_business", controllers.business.del_business);
// ApiRouter.post("/business/add_business", controllers.business.add_business);
// ApiRouter.get(
//   "/business/get_business_info",
//   controllers.business.get_business_info
// );

module.exports = ApiRouter;
