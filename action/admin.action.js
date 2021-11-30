const Mysql = require("../lib/mysql");
const config = require("../config");
const base = config.mysql.base + "admin";
const DB = new Mysql(base);
const Admin = require("../models/Admin.model");
const AdminModel = new Admin(DB);
const BaseAction = require("./base.action.class");
const utils = require("../lib/utils");

class AdminAction extends BaseAction {
  constructor(model) {
    super(model);
  }
  /**
   * 获取管理员列表
   * @param {页码} pageIndex
   * @param {大小} pageSize
   * @param {关键词} keyword
   * @returns
   */
  async getAdminJson({ pageIndex, pageSize, username, phone, status }) {
    const info = {
      tableName: base,
      whereJson: {
        like: {
          username: `%${username}%`,
          phone: `%${phone}%`,
        },
        and: {
          status,
        }
      },
      limitArr: [(pageIndex - 1) * pageSize, pageSize],
    };
    if (!username) {
      delete info.whereJson.like.username;
    }
    if (!phone) {
      delete info.whereJson.like.phone;
    }
    if (!status) {
      delete info.whereJson.and.status;
    }

    return await this.Model.fetchAll(info);
  }
  /**
   * 统计数量
   * @param {关键词} keyword
   * @returns
   */
  async countAdmin({ keyword }) {
    const info = {
      name: `%${keyword}%`,
      base
    };
    if (!keyword) {
      delete info.name;
    }
    return await this.Model.countAll(info);
  }
  
  async addInfo(info) {
    return await this.Model.add(utils.deleteEmptyProperty(info));
  }
  
}

module.exports = new AdminAction(AdminModel);
