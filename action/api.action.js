const Mysql = require("../lib/mysql");
const config = require("../config");
const base = config.mysql.base + "api";
const DB = new Mysql(base);
const Api = require("../models/api.model");
const ApiModel = new Api(DB)
const BaseAction = require("./base.action.class");
const utils = require("../lib/utils");

/*
 * list 结构转 树型
 * @param {*} menuTree
 * @param {*} tree
 * @param {*} parentId
 */
const treeMap = (menuTree, tree, parentId) => {
  menuTree.forEach((item) => {
    if (item.pid == parentId) {
      const child = {
        name: item.name,
        method: item.method,
        children: [],
      };
      treeMap(menuTree, child.children, item.id);
      if (child.children.length == 0) {
        delete child.children;
      }
      tree.push(child);
    }
  });
};
class ApiAction extends BaseAction {
  constructor(model) {
    super(model);
  }
  /**
   * 验证接口是否开启
   * @param {接口名称} name
   * @returns
   */
  async checkState(name) {
    const row = await this.Model.getState(name);
    return row.status ? true : false;
  }
  /**
   * 获取接口title
   * @returns
   */
  async getEnTitles() {
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
            mark: "is null",
            key: "null",
          },
        ],
      },
    };
    return await this.Model.getByApiJson(info);
  }
  /**
   * 获取接口name
   * @returns
   */
  async getEnNames() {
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
            key: "",
          },
        ],
      },
    };
    return await this.Model.getByApiJson(info);
  }
  /**
   * 获取api白名单
   * @returns
   */
  async getWhite() {
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
    return await this.Model.getByApiJson(info);
  }
  /**
   * 获取全局路由
   * @returns
   */
  async getAllRouter() {
    const data = await this.Model.getRouterAll();
    const addRouter = [];
    treeMap(data, addRouter, null);
    return addRouter;
  }
  /**
   * 获取API 一级 JSON
   * @param {*} pageIndex
   * @param {*} pageSize
   * @returns
   */
  async getApisJson({ pageIndex, pageSize }) {
    const info = {
      tableName: base,
      whereJson: {
        and: [
          {
            name: "pid",
            mark: "is null",
            key: "null",
          },
        ],
      },
      limitArr: [(pageIndex - 1) * pageSize, pageSize],
    };

    return await this.Model.fetchAll(info);
  }
  /**
   * 获取API 二级 JSON
   * @param {*} pageIndex
   * @param {*} pageSize
   * @returns
   */
  async getApisByJson(pid) {
    return await this.Model.getRowsByJson({ pid });
  }
  /**
   * 统计数量
   * @param {关键词} keyword
   * @returns
   */
  async countApi() {
    const info = {
      base,
    };
    return await this.Model.countAll(info);
  }
  /**
   * 添加api
   * @param {*} info
   * @returns
   */
  async addInfo(info) {
    return await super.add(utils.deleteEmptyProperty(info));
  }
  /**
   * 账户详情
   * @param {*} id
   * @returns
   */
  async getInfo(id) {
    return await super.getInfo(id);
  }
  /**
   * 更新账户
   * @param {*} id
   * @param {*} info
   * @returns
   */
  async uploadInfo(id, info) {
    return await super.edit(id, utils.deleteEmptyProperty(info));
  }
  /**
   * 删除账户
   * @param {*} id
   * @returns
   */
  async delInfo(id) {
    return await super.del(id);
  }
}

module.exports = new ApiAction(ApiModel);
