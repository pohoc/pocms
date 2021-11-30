const Mysql = require("../lib/mysql");
const config = require("../config");
const base = config.mysql.base + "api";
const DB = new Mysql(base);
const ApiModel = require("../models/api.model")(DB);

const ApiAction = {
  /**
   * 验证接口是否开启
   * @param {接口名称} name
   * @returns
   */
  checkState: async (name) => {
    const row = await ApiModel.getState(name);
    return row.status ? true : false;
  },
  /**
   * 获取接口title
   * @returns 
   */
  getEnTitles: async () => {
    const info = {
      tableName: base,
      whereJson: {
        and: [
          {
            name: "status",
            key: 1,
          },
          {
            name: "pid",
            key: 0,
          },
        ],
      },
    };
    return await ApiModel.getByApiJson(info);
  },
  /**
   * 获取接口name
   * @returns 
   */
  getEnNames: async () => {
    const info = {
      tableName: base,
      whereJson: {
        and: [
          {
            name: "status",
            key: 1,
          },
          {
            name: "pid",
            mark: "<>",
            key: 0,
          },
        ],
      },
    };
    return await ApiModel.getByApiJson(info);
  },
  /**
   * 获取api白名单
   * @returns 
   */
  getWhite: async () => {
    const info = {
      tableName: base,
      whereJson: {
        and: [
          {
            name: "status",
            key: 1,
          },
          {
            name: "token",
            mark: "<>",
            key: 1,
          },
        ],
      },
    };
    return await ApiModel.getByApiJson(info);
  }
};

module.exports = ApiAction;
