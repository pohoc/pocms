const apiState = require("../action/api.action");
const roleAction = require("../action/role.action");
const { ForbiddenError } = require("../lib/error");
const role = {};

role.get_role = async (ctx, next) => {
	const { page = 1, size = 10 } = ctx.request.query;
	const pageIndex = parseInt(page);
	const pageSize = parseInt(size);

	let params = { pageIndex, pageSize };

	const list = await roleAction.getRoleJson(params);
	const count = await roleAction.countRole(params);
	ctx.result = {
		list: list,
		total: count,
		total_page: Math.ceil(count / pageSize),
	};
	return next();
};

role.info_role = async (ctx, next) => {};

role.add_role = async (ctx, next) => {
	return next();
};

role.edit_role = async (ctx, next) => {
	return next();
};

role.del_role = async (ctx, next) => {
	const { id } = ctx.request.body;
	if (!id) {
		ctx.code = 10001;
		ctx.msg = "请传递参数";
		return next();
	}
	const info = await roleAction.delRoleInfo(id);
	if (!info.affectedRows) {
		ctx.code = 10001;
		ctx.msg = "删除失败";
	}
	ctx.msg = "删除成功";
	ctx.result = true;
	return next();
};

module.exports = role;
