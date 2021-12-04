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
        and: [
          {
            name: "status",
            key: status,
          },
        ],
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
      info.whereJson.and.forEach((item, key) => {
        if (item.name === "status") delete info.whereJson.and[key];
      });
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
      base,
    };
    if (!keyword) {
      delete info.name;
    }
    return await this.Model.countAll(info);
  }
  /**
   * 验证用户是否存在
   * @param {用户名} info
   * @returns
   */
  async checkInfo(info) {
    const row = await super.getRow(info);
    return !!row;
  }
  /**
   * 添加账户
   * @param {*} info
   * @returns
   */
  async addInfo(info) {
    return await this.Model.add(utils.deleteEmptyProperty(info));
  }
  /**
   * 账户详情
   * @param {*} id
   * @returns
   */
  async getInfoByJson(id) {
    return await super.getInfo(id);
  }
  /**
   * 更新账户
   * @param {*} id
   * @param {*} info
   * @returns
   */
  async uploadUserInfo(id, info) {
    return await super.edit(id, utils.deleteEmptyProperty(info));
  }
  /**
   * 删除账户
   * @param {*} id
   * @returns
   */
  async delUserInfo(id) {
    return await super.del(id);
  }
}

module.exports = new AdminAction(AdminModel);
