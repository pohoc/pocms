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
    const where = `SELECT per.* FROM po_admin su JOIN po_role_permission ro on su.role_id=ro.role_id or su.id=ro.admin_id JOIN po_permission per on ro.permission_id = per.id and su.id=${id}`;
    return await this.Model.roleJson(where);
  }
}

module.exports = new RoleAction(RoleModel);
