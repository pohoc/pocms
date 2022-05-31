class CodedError extends Error {
	constructor(message = "未知错误", code = -1) {
		super(message);
		this.code = code;
	}
}

module.exports = {
	CodedError,
	/**
	 * 无效服务构造函数
	 */
	IllegalServicesError: class IllegalServicesError extends CodedError {
		constructor(message = "未授权域名") {
			super(message, 90003);
		}
	},
	/**
	 * 拒绝访问构造函数
	 */
	ForbiddenError: class ForbiddenError extends CodedError {
		constructor(message = "接口未启用") {
			super(message, 90010);
		}
	},
	/**
	 * 无效参数构造函数
	 */
	InvalidQueryError: class InvalidQueryError extends CodedError {
		constructor(message = "无效参数") {
			super(message, 90012);
		}
	},
	/**
	 * 暂无权限构造函数
	 */
	AuthenticationError: class AuthenticationError extends CodedError {
		constructor(message = "暂无权限") {
			super(message, 90011);
		}
	},

	/**
	 * 无效方法构造函数
	 */
	InvalidMethodError: class InvalidMethodError extends CodedError {
		constructor(message = "请求方法不允许") {
			super(message, 90001);
		}
	},

	/**
	 * 无效服务构造函数
	 */
	UnauthorizedChannelsError: class UnauthorizedChannelsError extends CodedError {
		constructor(message = "未授权渠道") {
			super(message, 90004);
		}
	},

	/**
	 * 无效签名构造函数
	 */
	InvalidSignatureError: class InvalidSignatureError extends CodedError {
		constructor(message = "签名错误") {
			super(message, 90006);
		}
	},

	/**
	 * 平台关停构造函数
	 */
	PlatformCloseError: class PlatformCloseError extends CodedError {
		constructor(message = "平台关停") {
			super(message, 90013);
		}
	},
};
