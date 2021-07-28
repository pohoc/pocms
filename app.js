const Koa = require('koa')
const bodyParser = require('koa-bodyparser')()
const staticCache = require('koa-static-cache')
const cors = require('koa2-cors')
const helmet = require("koa-helmet")
const render = require('koa-art-template')
const path = require('path')


const config = require('./config')
const adminRouter = require('./routes/admin')
const apiRouter = require('./routes/api')
const { loggerMiddleware } = require('./middlewares/logger')
const { errorHandler, responseHandler } = require('./middlewares/response')
const { corsHandler } = require('./middlewares/cors')


const app = new Koa()

// Template
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

// Logger
app.use(loggerMiddleware)

// Error Handler
app.use(errorHandler)

// Global Middlewares
app.use(bodyParser)
app.use(staticCache(config.publicDir))

// Helmet
app.use(helmet())

// Cors
app.use(cors(corsHandler))

// Routes
app.use(adminRouter.routes(), adminRouter.allowedMethods())
app.use(apiRouter.routes(), apiRouter.allowedMethods())

// Response
app.use(responseHandler)

module.exports = app
