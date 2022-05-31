const utils = require("../lib/utils");
const {
	InvalidQueryError,
	ForbiddenError,
	IllegalServicesError,
	InvalidMethodError,
	UnauthorizedChannelsError,
	InvalidSignatureError,
	PlatformCloseError,
} = require("../lib/error");
const ApiAction = require("../action/api.action");
const config = require("../config");
const md5 = require("js-md5");

// API方法拦截
const UserFilter = async (ctx, next) => {
	await next();
	let url = ctx._matchedRoute ? ctx._matchedRoute : ctx.originalUrl;
	let method = ctx.request.method;

	// 校验请求头域名
	const host = ["localhost:3001"];
	if (config.app.isHost) {
		if (host.indexOf(ctx.request.header.host) == -1) {
			throw new IllegalServicesError();
		}
	}

	// 校验请求渠道
	const allowChannel = ["channel/pocms platform/pocms"];
	if (config.app.isChannel) {
		if (allowChannel.indexOf(ctx.request.header["x-user-agent"]) == -1) {
			throw new UnauthorizedChannelsError();
		}
	}

	// 校验Sign参数
	if (config.app.isSign) {
		const sign = ctx.request.header["sign"];
		const host_timestamp = ctx.request.header["timestamp"];
		const timestamp = new Date(host_timestamp).getTime() / 1000;
		const nowTimestamp = Math.floor(Date.now() / 1000);
		if (!sign || !host_timestamp) {
			throw new InvalidSignatureError();
		}
		if (nowTimestamp - timestamp > 60) {
			throw new InvalidSignatureError("签名过期");
		}

		if (
			md5(sign) !==
			md5(md5(host_timestamp + ctx.request.header["x-user-agent"]))
		) {
			throw new InvalidSignatureError("签名错误");
		}
	}

	// 校验API正确性
	if (utils.stringArr(url, 1) === "restful") {
		const allowEntitles = utils.api_array_maps(await ApiAction.getEnTitles());
		const allowEnNames = utils.api_array_maps(await ApiAction.getEnNames());
		const allowEnOff = utils.api_array_maps(await ApiAction.getByOffRouter());

		let Titles = utils.stringArr(url, 3);
		let Names = utils.stringArr(url, 4);

		// 检测api是否符合要求
		if (allowEntitles.indexOf(Titles) == -1) {
			throw new InvalidQueryError();
		}

		// 检测api是否符合要求
		if (allowEnNames.indexOf(Names) == -1) {
			throw new InvalidQueryError();
		}

		// 检测api请求方法是否复合要求
		if (method !== (await ApiAction.getEnMethod(Names))) {
			throw new InvalidMethodError();
		}

		// 检测api是否被禁用
		if (allowEnOff.indexOf(Names) !== -1) {
			throw new ForbiddenError();
		}
	}
};

module.exports = {
	UserFilter,
};
