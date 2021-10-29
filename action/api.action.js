const Mysql = require('../lib/mysql');
const DB = new Mysql('pophp_api');
const ApiModel = require('../models/api.model')(DB);

const ApiControl = {
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

module.exports = ApiControl;