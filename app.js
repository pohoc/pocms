const Koa = require("koa");
const path = require("path");
const cors = require("koa2-cors");
const helmet = require("koa-helmet");
const favicon = require("koa-favicon");
const koaStatic = require("koa-static");
const staticCache = require("koa-static-cache");

const bodyParser = require("koa-body")({
	multipart: true, // 允许上传多个文件
	formidable: {
		keepExtensions: true, //图片上传后不改变扩展名
		multipart: true,
	},
	jsonLimit: "5mb",
	formLimit: "4096kb",
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
app.use(koaStatic("./public", { maxAge: 60000 * 1440 * 30 }));

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
