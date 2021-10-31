const Koa = require("koa");
const bodyParser = require("koa-body")({
  multipart: true, // 允许上传多个文件
});
const cors = require("koa2-cors");
const path = require("path");
const helmet = require("koa-helmet");
const favicon = require("koa-favicon");
const koaStatic = require("koa-static");
const staticCache = require("koa-static-cache");

const config = require("./config");
const apiRouter = require("./routes/api");
const { loggerMiddleware } = require("./middlewares/logger");
const { errorHandler, responseHandler } = require("./middlewares/response");
const { corsHandler } = require("./middlewares/cors");
const database = require("./middlewares/database");
const { UserFilter } = require("./middlewares/Filter");
const app = new Koa();

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

// Database
database(app);

// Routes
app.use(apiRouter.routes(), apiRouter.allowedMethods());
app.use(UserFilter)
// // 静态目录
// app.use(koaStatic(path.join(__dirname, '../public/'), { maxAge: 60000 * 1440 * 30 }));

// // 网站图标
// app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')));

// Response
app.use(responseHandler);

module.exports = app;
