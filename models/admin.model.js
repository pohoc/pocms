const { logger } = require("../middlewares/logger");
const Model = require("./base.model.class");

class admin extends Model {
  constructor(DB) {
    super(DB);
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
      let where = "",
        tableName = info.base;
      if (info.name) where = `WHERE name like '%${info.name}%'`;
      const sqlMod = `SELECT COUNT(*) as count FROM ${tableName} ${where}`;
      const rs = await super.query(sqlMod);
      return !!rs ? rs.count : 0;
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = admin;
