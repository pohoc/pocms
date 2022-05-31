const Mysql = require("../lib/mysql");
const RD = require("../lib/redis");
const crypto = require("../lib/crypto");
const config = require("../config");
const base = config.mysql.base + "admin";
const DB = new Mysql(base);
const AccountModel = require("../models/account.model")(DB);
const { logger } = require("../middlewares/logger");
const { retry } = require("async");

const UserAction = {
	/**
	 * 验证用户是否存在
	 * @param {用户名} info
	 * @returns
	 */
	checkInfo: async (info) => {
		const row = await AccountModel.getInfoByJson(info);
		return !!row;
	},
	/**
	 * 验证用户密码
	 * @param {用户名} username
	 * @param {密码} password
	 * @returns
	 */
	checkPass: async (username, password) => {
		const row = await AccountModel.getInfoByJson({ username });
		if (Boolean(row)) {
			return row.password === password ? row : null;
		} else {
			logger.info(`验证密码时找不到用户信息：${username}`);
			return;
		}
	},
	cryptPass: (password) => {
		return crypto.md5(password).toString();
	},
	cryptSession: (hash) => {
		return crypto.md5(hash).toString();
	},
	/**
	 * 是否锁住
	 * @param name
	 * @returns {Promise<boolean>}
	 */
	isLoginLock: async (name) => {
		const val = (await RD.get(name)) || 0;
		return val >= 20;
	},
	/**
	 * 登陆错误
	 * @param name
	 * @returns {Promise<number>}
	 */
	setTimeRedis: async (name) => {
		let val = (await RD.get(name)) || 0;
		await RD.set(name, ++val);
		await RD.pexpireat(name, Date.parse(new Date()) + config.errLogin * 60000);
		return 1;
	},
	/**
	 * 注册用户
	 * @param info
	 * @returns {Promise<*>}
	 */
	registerUser: async (info) => {
		info = Object.assign(
			{},
			{
				email: "",
				sex: 0,
			},
			info
		);

		return await AccountModel.add(info);
	},
	uploadUserInfo: async (id, info) => {
		return await AccountModel.update(id, info);
	},
	getInfoById: async (id) => {
		return await AccountModel.getByUserId(id);
	},
	getInfoByPhone: async (phone) => {
		return await AccountModel.getInfoByJson({ phone });
	},
	getInfoByJson: async (id) => {
		return await AccountModel.getInfoByJson({ id });
	},
};

module.exports = UserAction;
