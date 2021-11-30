const { logger } = require('../middlewares/logger')

/**
 * 登录相关的数据库操作
 * @param DB
 */
const api = DB => {
  return {
    /**
     * 获取接口状态
     * @param {接口名称} name 
     * @returns 
     */
    async getState(name) {
      try {
        return res = await DB.fetchRow({name})
      } catch (err) {
        logger.error(err)
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
        logger.error(err)
      }
    },
  }
}

module.exports = api;