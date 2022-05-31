const adminAction = require("../action/admin.action");
const accountAction = require("../action/account.action");
const users = {};

users.get_users = async (ctx, next) => {
	return next();
};

users.edit_users = async (ctx, next) => {
	return next();
};

/**
 * 更新密码
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
users.edit_pass = async (ctx, next) => {
	const { passWord, oldPassWord } = ctx.request.body;
	const username = ctx.jwtData.data.username;
	const user = await accountAction.checkPass(
		username,
		accountAction.cryptPass(oldPassWord)
	);
	if (!user) {
		ctx.code = 10001;
		ctx.msg = "旧密码错误";
		return next();
	}

	const rs = await adminAction.uploadUserInfo(user.id, {
		password: accountAction.cryptPass(passWord),
	});
	if (rs.affectedRows != 1) {
		ctx.code = 10002;
		ctx.msg = "修改失败";
		return next();
	}
	ctx.msg = "修改成功";
	ctx.result = true;

	return next();
};

module.exports = users;
