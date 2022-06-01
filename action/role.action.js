const Mysql = require("../lib/mysql");
const config = require("../config");
const base = config.mysql.base + "role";
const DB = new Mysql(base);
const Role = require("../models/role.model");
const RoleModel = new Role(DB);
const BaseAction = require("./base.action.class");

class RoleAction extends BaseAction {
	constructor(model) {
		super(model);
	}
	/**
	 * 获取用户路由权限
	 * @param {接口名称} name
	 * @returns
	 */
	async getRoleInfoJson(id) {
		const where = `SELECT * FROM po_permission WHERE find_in_set(id,(SELECT role.permission_id FROM po_admin admin JOIN po_role_permission role ON role.role_id in (admin.role) AND admin.id=${id}))`;
		return await this.Model.roleJson(where);
	}

	/**
	 * 获取指定用户角色
	 * @param {*} str
	 * @returns
	 */
	async getAdminRoleName(str) {
		const where = `SELECT title FROM po_role WHERE id in (${str})`;
		return await super.queryArr(where);
	}
}

module.exports = new RoleAction(RoleModel);
