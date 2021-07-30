const Mysql = require('../lib/mysql');
const RD = require('../lib/redis');
const crypto = require('../lib/crypto');
const DB = new Mysql('user');
const AccountModel = require('../models/account.model')(DB);

const userControl = {
  /**
   * 验证用户是否存在
   * @param {用户名} info 
   * @returns 
   */
  checkInfo: async (info) => {
    const row = await AccountModel.getInfoByJson(info);
    return !!row;
  },
  /**
   * 
   * @param {用户名} name 
   * @param {密码} password 
   * @returns 
   */
  checkPass: async (name, password) => {
    const row = await userModel.getInfoByJson({name});
    if (Boolean(row)) {
      return row.password === password ? row : null;
    } else {
      logger.console(`验证密码时找不到用户信息：${name}`);
      return;
    }
  },
  cryptPass: (password) => {
    return crypto.md5(crypto.aesDecrypt(password)).toString();
  },
  cryptSession: (hash) => {
    return crypto.md5(hash).toString();
  },
  /**
   * 是否锁住
   * @param name
   * @returns {Promise<boolean>}
   */
  isLoginLock: async (name) => {
    const val = await RD.get(name) || 0;
    return val >= 20;
  },
  /**
   * 登陆错误
   * @param name
   * @returns {Promise<number>}
   */
  setTimeRedis: async (name) => {
    let val = await RD.get(name) || 0;
    await RD.set(name, ++val);
    await RD.pexpireat(name, Date.parse(new Date()) + errLogin * 60000);
    return 1;
  },
  /**
   * 注册用户
   * @param info
   * @returns {Promise<*>}
   */
  registerUser: async (info) => {
    info = Object.assign({}, {
      email: '',
      sex: 0
    }, info);

    return await AccountModel.add(info);
  },
  uploadUserInfo: async (id, info) => {
    return await AccountModel.update(id, info);
  },
  getInfoById: async (id) => {
    return await AccountModel.getByUserId(id);
  },
  getInfoByPhone: async (phone) => {
    return await AccountModel.getInfoByJson({phone});
  },
};

module.exports = userControl;