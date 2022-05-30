const Router = require("koa-router");
const controllers = require("../controllers");
const ApiAction = require("../action/api.action");

let ApiRouter = new Router({
	prefix: "/restful/v1",
});

ApiAction.getAllRouter().then((res) => {
	res.forEach((item) => {
		item.children.forEach((items) => {
			const url = `/${item.name}/${items.name}`; // 组合链接
			ApiRouter[items.method](url, controllers[item.name][items.name]); // 动态创建路由
		});
	});
});

module.exports = ApiRouter;
