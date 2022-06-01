const adminAction = require("../action/admin.action");
const accountAction = require("../action/account.action");
const roleAction = require("../action/role.action");
const regular = require("../lib/regular");
const { onFileDefault } = require("../lib/upload");
const admin = {};

/**
 * 系统用户列表
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
admin.get_admin = async (ctx, next) => {
	const { page = 1, size = 10, username, phone, status } = ctx.request.query;
	const pageIndex = parseInt(page);
	const pageSize = parseInt(size);

	let params = { pageIndex, pageSize };
	if (username) params = Object.assign(params, { username });
	if (phone) params = Object.assign(params, { phone });
	if (status) params = Object.assign(params, { status });

	const list = await adminAction.getAdminJson(params);
	const count = await adminAction.countAdmin(params);
	ctx.result = {
		list: list,
		total: count,
		total_page: Math.ceil(count / pageSize),
	};
	return next();
};

/**
 * 系统用户详情
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
admin.info_admin = async (ctx, next) => {
	const { id } = ctx.request.query;
	if (!id) {
		ctx.code = 10001;
		ctx.msg = "请传递参数";
		return next();
	}
	const info = await adminAction.getInfoByJson(id);
	if (!info) {
		ctx.code = 10001;
		ctx.msg = "未获取到用户信息";
	}
	delete info.password;
	ctx.result = info;
	return next();
};

/**
 * 添加系统用户
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
admin.add_admin = async (ctx, next) => {
	const { username, password, phone, name, expire_time, avatar, role_id } =
		ctx.request.body;

	if (!username && !password && !phone && !name) {
		ctx.code = 10001;
		ctx.msg = "请传递参数";
		return next();
	}

	if (!regular.isEmpty(username) && !regular.isRegisterUserName(username)) {
		ctx.code = 10001;
		ctx.msg = "用户名不能为空";
		return next();
	}

	if (!regular.isMobile(phone)) {
		ctx.code = 10001;
		ctx.msg = "手机号不正确";
		return next();
	}

	if (!password.length > 6 && !regular.isPass(password)) {
		ctx.code = 10001;
		ctx.msg = "密码不正确";
		return next();
	}

	const checkUserName = await accountAction.checkInfo({ username });
	if (!!checkUserName) {
		ctx.code = 10001;
		ctx.msg = "账户已存在";
		return next();
	}

	const info = await adminAction.addInfo({
		username,
		password: accountAction.cryptPass(password),
		phone,
		name,
		expire_time,
		avatar,
		role_id,
		add_time: Math.round(new Date() / 1000),
	});
	if (!info.insertId) {
		ctx.code = 10002;
		ctx.msg = "添加失败";
		return next();
	}

	ctx.msg = "添加成功";
	ctx.result = true;
	return next();
};

/**
 * 编辑系统用户
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
admin.edit_admin = async (ctx, next) => {
	const { username, phone, name, avatar, role_id, expire_time, status, id } =
		ctx.request.body;

	if (!id) {
		ctx.code = 10001;
		ctx.msg = "请传递参数";
		return next();
	}

	const info = { username, phone, name, avatar, role_id, expire_time, status };

	const rs = await adminAction.uploadUserInfo(id, info);

	if (rs.affectedRows != 1) {
		ctx.code = 10002;
		ctx.msg = "更新失败";
		return next();
	}

	ctx.msg = "更新成功";
	ctx.result = true;
	return next();
};

/**
 * 删除系统用户
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
admin.del_admin = async (ctx, next) => {
	const { id } = ctx.request.body;
	if (!id) {
		ctx.code = 10001;
		ctx.msg = "请传递参数";
		return next();
	}

	const user = await adminAction.getInfoByJson(id);
	if (user.role_id === 0) {
		ctx.code = 10001;
		ctx.msg = "系统用户禁止删除";
		return next();
	}

	const info = await adminAction.delUserInfo(id);
	if (!info.affectedRows) {
		ctx.code = 10001;
		ctx.msg = "删除失败";
	}
	ctx.msg = "删除成功";
	ctx.result = true;
	return next();
};

/**
 * 上传系统用户头像
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
admin.upload_admin = async (ctx, next) => {
	if (!ctx.request.files) {
		ctx.code = 10001;
		ctx.msg = "上传失败";
	}

	const file = ctx.request.files.file;
	const fileName = onFileDefault(file);

	ctx.msg = "上传成功";
	ctx.result = {
		file: fileName,
	};
	return next();
};

/**
 * 系统用户角色
 * @param {*} ctx
 * @param {*} next
 */
admin.role_admin = async (ctx, next) => {
	const role = await roleAction.getRows({ status: 1 });
	const roleAdmin = [];
	if (role.length > 0)
		role.forEach((item) => {
			const roles = { title: item.title, value: item.id, key: item.id };
			if (item.id == 0) {
				roles.disabled = true;
			}
			roleAdmin.push(roles);
		});
	ctx.result = roleAdmin;
	return next();
};

admin.pass_admin = async (ctx, next) => {
	const { id } = ctx.request.body;
	return next();
};

module.exports = admin;
