const path = require("path");
const dotenv = require("dotenv");
const configs = dotenv.config();

module.exports = {
	port: process.env.APP_PORT,
	secret: process.env.APP_SECRET,
	iv: process.env.APP_IV,
	loginSecret: process.env.APP_LOGIN_SECRET,
	publicDir: path.resolve(__dirname, "./public"),
	logPath: path.resolve(__dirname, "./logs/koa-template.log"),
	errLogin: 600,
	wechat: {
		id: process.env.APP_WECHAT_ID,
		secret: process.env.APP_WECHAT_SECRET,
	},
	mysql: {
		host: process.env.APP_MYSQL_HOST,
		user: process.env.APP_MYSQL_USER,
		password: process.env.APP_MYSQL_PASS,
		port: process.env.APP_MYSQL_PORT,
		database: process.env.APP_MYSQL_DATABASE,
		base: process.env.APP_MYSQL_BASE,
		timezone: "08:00",
	},
	redis: {
		host: process.env.APP_REDIS_HOST,
		port: process.env.APP_REDIS_PORT,
		password: process.env.APP_REDIS_PASS,
	},
	qiniu: {
		accessKey: "v3YvjTm9-xhQHIZG8iij9pOzhNcsK24DsdQJG_us",
		secretKey: "Y5s_AvMRb7lH92YezaBjLPQZ-ilJGMrPVXfro5UW",
		scope: "ponuxt",
		domain: "http://cdn.penghui.org",
	},
	app: {
		isHost: process.env.APP_IS_HOST,
		isChannel: process.env.APP_IS_CHANNEL,
		isSign: process.env.APP_IS_SIGN,
		isSms: process.env.APP_IS_SMS,
	},
};
