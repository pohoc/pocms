const bodyParser = require("koa-body")({
  multipart: true, // 允许上传多个文件
  formLimit: "1mb",
  enableTypes: ["json", "form", "text"],
});
const staticCache = require("koa-static-cache");
const cors = require("koa2-cors");
const helmet = require("koa-helmet");
const json = require('koa-json');
const favicon = require('koa-favicon');
const koaStatic = require('koa-static');
const path = require('path');

const config = require("../config");
const { loggerMiddleware } = require("../middlewares/logger");
const { errorHandler, responseHandler } = require("../middlewares/response");
const { corsHandler } = require("../middlewares/cors");


const connect = app => {
  // JSON
  app.use(bodyParser);

  // 可接收json content-type
  // app.use(json());

  // Logger
  app.use(loggerMiddleware);

  // Error Handler
  app.use(errorHandler);

  // Global Middlewares
  app.use(bodyParser);
  app.use(staticCache(config.publicDir));

  // Helmet
  app.use(helmet());

  // Cors
  app.use(cors(corsHandler));

  // // 静态目录
  // app.use(koaStatic(path.join(__dirname, '../public/'), { maxAge: 60000 * 1440 * 30 }));

  // // 网站图标
  // app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')));

  // Response
  // app.use(responseHandler);
};

module.exports = connect;