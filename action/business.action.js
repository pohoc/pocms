const Mysql = require("../lib/mysql");
const DB = new Mysql("pophp_business");

const { logger } = require("../middlewares/logger");
const Business = require("../models/business.model");
const BusinessModel = new Business(DB);
const BaseAction = require("./base.action.class");
const utils = require("../lib/utils");

class BusinessAction extends BaseAction {
  constructor(model) {
    super(model);
  }
  /**
   * 获取企业列表
   * @param {页码} pageIndex
   * @param {大小} pageSize
   * @param {关键词} keyword
   * @returns
   */
  async getInfoByList({ pageIndex, pageSize, keyword }) {
    const info = {
      tableName: "pophp_business",
      whereJson: {
        and: {
          is_delete: 0,
        },
        like: {
          business_name: `%${keyword}%`,
        },
      },
      limitArr: [(pageIndex - 1) * pageSize, pageSize],
    };
    if (!keyword) {
      delete info.whereJson.and.business_name;
    }
    return await this.Model.fetchAll(info);
  }
  /**
   * 统计数量
   * @param {关键词} keyword
   * @returns
   */
  async countBusiness({ keyword }) {
    const info = {
      business_name: `%${keyword}%`,
    };
    if (!keyword) {
      delete info.business_name;
    }
    return await this.Model.countAll(info);
  }

  async getInfoById(id) {
    return await this.Model.getInfoById(id);
  }

  async delInfoById(id) {
    return await this.Model.delete(id);
  }

  async addInfoById(info) {
    return await this.Model.add(utils.deleteEmptyProperty(info));
  }

  async upInfoById(id, info) {
    return await this.Model.update(id, utils.deleteEmptyProperty(info));
  }
}

module.exports = new BusinessAction(BusinessModel);
