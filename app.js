const Koa = require("koa");
const path = require("path");
const cors = require("koa2-cors");
const helmet = require("koa-helmet");
const favicon = require("koa-favicon");
const koaStatic = require("koa-static");
const staticCache = require("koa-static-cache");

const getUploadFileExt = require('./lib/body/getUploadFileExt');
const getUploadFileName = require('./lib/body/getUploadFileName');
const checkDirExist = require('./lib/body/checkDirExist');
const getUploadDirName = require('./lib/body/getUploadDirName');

const bodyParser = require("koa-body")({
  multipart: true, // 允许上传多个文件
  formidable: {
    uploadDir: path.join(__dirname, "/public/uploads"), //设置图片上传的目录
    keepExtensions: true, //图片上传后不改变扩展名
    multipart: true,
    onFileBegin: (name, file) => {
      // console.log(file);
      // 获取文件后缀
      const ext = getUploadFileExt(file.name);
      // 最终要保存到的文件夹目录
      const dirName = getUploadDirName();
      const dir = `public/uploads/${dirName}`;
      // 检查文件夹是否存在如果不存在则新建文件夹
      checkDirExist(dir);
      // 获取文件名称
      const fileName = getUploadFileName(ext);
      // 重新覆盖 file.path 属性
      file.path = `${dir}/${fileName}`;
      // app.context.uploadPath = app.context.uploadPath ? app.context.uploadPath : {};
      // app.context.uploadPath[name] = `${dirName}/${fileName}`;
    },
  },
  jsonLimit: '5mb',
  formLimit: '4096kb',
});

const config = require("./config");
const ApiV1Router = require("./routes/v1");
const { loggerMiddleware } = require("./middlewares/logger");
const { errorHandler, responseHandler } = require("./middlewares/response");
const { corsHandler } = require("./middlewares/cors");
const database = require("./middlewares/database");
const { UserFilter } = require("./middlewares/Filter");
const jwtMiddleware = require("./middlewares/jwt");
const app = new Koa();

// Logger
app.use(loggerMiddleware);

// Error Handler 错误拦截中间件
app.use(errorHandler);

// Global Middlewares

// 解析资源
app.use(bodyParser);

// 静态资源中间件
app.use(staticCache(config.publicDir));

// 静态目录
app.use(koaStatic("./", { maxAge: 60000 * 1440 * 30 }));

// 网站图标
app.use(favicon(path.join(__dirname, "./public/images/favicon.ico")));

// Helmet 提升安全性
app.use(helmet());

// Cors 跨域配置
app.use(cors(corsHandler));

// API中间件
app.use(UserFilter);

// 权限中间件
jwtMiddleware(app);

// Routes 路由中间件
app.use(ApiV1Router.routes(), ApiV1Router.allowedMethods()); // RESTFUL API V1

// Response 数据响应
app.use(responseHandler);

// Database 数据库连接
database(app);

module.exports = app;
