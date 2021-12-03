const { logger } = require("../middlewares/logger");

/**
 * 登录相关的数据库操作
 * @param DB
 */
const api = (DB) => {
  return {
    /**
     * 获取接口状态
     * @param {接口名称} name
     * @returns
     */
    async getState(name) {
      try {
        return (res = await DB.fetchRow({ name }));
      } catch (err) {
        logger.error(err);
      }
    },
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
        return await DB.fetchAll(
          tableName,
          selectStr,
          whereJson,
          orderByJson,
          limitArr
        );
      } catch (err) {
        logger.error(err);
      }
    },
    async getRouterAll() {
      try {
        return await DB.getAll();
      } catch (err) {
        logger.error(err);
      }
    },
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
        return await DB.fetchAll(
          tableName,
          selectStr,
          whereJson,
          orderByJson,
          limitArr
        );
      } catch (err) {
        logger.error(err);
      }
    },

    /**
     * 统计数据模型
     * @param {*} info
     * @returns
     */
    async countAll(info) {
      try {
        let where = 'WHERE pid is null',
          tableName = info.base;
        const sqlMod = `SELECT COUNT(*) as count FROM ${tableName} ${where}`;
        const rs = await DB.queryStr(sqlMod);
        return !!rs ? rs.count : 0;
      } catch (err) {
        logger.error(err);
      }
    },
    async getRowsByJson(where) {
      try {
        return (res = await DB.fetchRows(where));
      } catch (err) {
        logger.error(err);
      }
    },
    /**
     * 删除账户
     * @param {*} id
     * @returns
     */
    async delUserInfo(id) {
      try {
        return await DB.del(id);
      } catch (err) {
        logger.error(err);
      }
    },
  };
};

module.exports = api;
