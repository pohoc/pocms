const Mysql = require('../lib/mysql');
const config = require("../config");
const base = config.mysql.base+'role'
const DB = new Mysql(base);
const RoleModel = require('../models/role.model')(DB);

const RoleAction = {
  /**
   * 获取用户路由权限
   * @param {接口名称} name 
   * @returns 
   */
   getInfoByRoleJson: async (id) => {
    return await RoleModel.getRowsByJson({id})
  }
};

module.exports = RoleAction;