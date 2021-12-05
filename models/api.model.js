const { logger } = require("../middlewares/logger");
const Model = require("./base.model.class");

/**
 * 登录相关的数据库操作
 * @param DB
 */
class api extends Model {
  constructor(DB) {
    super(DB);
  }
  /**
   * 获取接口状态
   * @param {接口名称} name
   * @returns
   */
  async getState(name) {
    try {
      return await this.DB.fetchRow({ name });
    } catch (err) {
      logger.error(err);
    }
  }
  /**
   * 获取接口json
   * @returns
   */
  async getByApiJson(info) {
    try {
      const {
        tableName,
        selectStr = "*",
        whereJson,
        orderByJson = "",
        limitArr = "",
      } = info;
      return await this.DB.fetchAll(
        tableName,
        selectStr,
        whereJson,
        orderByJson,
        limitArr
      );
    } catch (err) {
      logger.error(err);
    }
  }
  async getRouterAll() {
    try {
      return await this.DB.getAll();
    } catch (err) {
      logger.error(err);
    }
  }
  /**
   * 数据分页模型
   * @param {*} info
   * @returns
   */
  async fetchAll(info) {
    try {
      const {
        tableName,
        selectStr = "*",
        whereJson,
        orderByJson = "",
        limitArr = "",
      } = info;
      return await this.DB.fetchAll(
        tableName,
        selectStr,
        whereJson,
        orderByJson,
        limitArr
      );
    } catch (err) {
      logger.error(err);
    }
  }

  /**
   * 统计数据模型
   * @param {*} info
   * @returns
   */
  async countAll(info) {
    try {
      let where = "WHERE pid is null",
        tableName = info.base;
      const sqlMod = `SELECT COUNT(*) as count FROM ${tableName} ${where}`;
      const rs = await this.DB.queryStr(sqlMod);
      return !!rs ? rs.count : 0;
    } catch (err) {
      logger.error(err);
    }
  }
  async getRowsByJson(where) {
    try {
      return await super.getRows(where);
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = api;
