const Mysql = require('../lib/mysql');
const config = require("../config");
const base = config.mysql.base +'api'
const DB = new Mysql(base);
const ApiModel = require('../models/api.model')(DB);

const ApiAction = {
  /**
   * 验证接口是否开启
   * @param {接口名称} name 
   * @returns 
   */
  checkState: async (name) => {
    const row = await ApiModel.getState(name);
    return row.state ? true : false;
  },
};

module.exports = ApiAction;