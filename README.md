### 一、背景



### 二、目录结构

下面的目录是该模板基础目录结构，后面的章节会对每一个目录的配置进行介绍，让大家在开发中对项目的结构比较清晰，出了问题容易定位。


```
├─.gitignore                // 忽略文件配置
├─app.js                    // 应用入口
├─config.js                 // 公共配置文件
├─ecosystem.config.js       // pm2配置文件
├─package.json              // 依赖文件配置
├─README.md                 // README.md文档
├─routes                    // 路由

├─models                    // 数据库配置及模型
|   ├─index.js                  // 数据库配置
|   └user.js                    // 用户的schema文件
├─middlewares               // 中间件
|      ├─cors.js                // 跨域中间件
|      ├─jwt.js                 // jwt中间件
|      ├─logger.js              // 日志打印中间件
|      └response.js             // 响应及异常处理中间件
├─logs                      // 日志目录
|  ├─koa-template.log
|  └koa-template.log-2019-05-28
├─lib                       // 工具库
|  ├─error.js                   // 异常处理
|  └mongoDB.js                  // mongoDB配置
├─controllers               // 操作业务逻辑

├─services               // 操作数据库
|      ├─index.js               // 配置
|      ├─user.js               // 用户
├─bin                       // 启动目录
|  └www                         // 启动文件配置
```
# Kefu
# pocms
