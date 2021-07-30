const Koa = require("koa");
const bodyParser = require("koa-body")({
  multipart: true,  // 允许上传多个文件
});
const staticCache = require("koa-static-cache");
const cors = require("koa2-cors");
const helmet = require("koa-helmet");

const config = require("./config");
const apiRouter = require("./routes/api");
const { loggerMiddleware } = require("./middlewares/logger");
const { errorHandler, responseHandler } = require("./middlewares/response");
const { corsHandler } = require("./middlewares/cors");
const database = require("./middlewares/database");

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

// Response
app.use(responseHandler);

module.exports = app;
