const Mysql = require('../lib/mysql');
const DB = new Mysql('pophp_log');
const LogModel = require('../models/log.model')(DB);

const LogControl = {
  /**
   * 日志新增记录
   * @param {接口名称} name 
   * @returns 
   */
  SetInfo: async (info) => {
    info = Object.assign({}, {
      add_time: Math.round(new Date() / 1000)
    }, info);

    return await LogModel.Set(info);
  },
};

module.exports = LogControl;