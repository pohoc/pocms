const fs = require("fs");
const path = require("path");

const utils = require("./utils");

/**
 * 校验文件是否存在，否则新建
 * @param {*} p
 */
function checkDirExist(p) {
	if (!fs.existsSync(p)) {
		try {
			fs.mkdirSync(p, { recursive: true });
		} catch (error) {
			console.log(error);
		}
	}
}

/**
 * 获取文件名
 * @returns
 */
function getUploadDirName() {
	const date = new Date();
	let month = Number.parseInt(date.getMonth()) + 1;
	month = month.toString().length > 1 ? month : `0${month}`;
	const dir = `${date.getFullYear()}${month}${date.getDate()}`;
	return dir;
}

/**
 * 获取文件扩展名
 * @param {*} name
 * @returns
 */
function getUploadFileExt(name) {
	let ext = name.split(".");
	return ext[ext.length - 1];
}

/**
 * 生成文件名
 * @param {*} ext
 * @returns
 */
function getUploadFileName(ext) {
	return `${Date.now()}${Number.parseInt(Math.random() * 10000)}.${ext}`;
}

/**
 * 单文件上传
 * @param {*} file
 * @returns
 */
function onFile(file) {
	// 创建可读流
	const reader = fs.createReadStream(file.path);
	// 获取文件后缀
	const ext = getUploadFileExt(file.name);
	// 最终要保存到的文件夹目录
	const dirName = getUploadDirName();
	const dir = `public/uploads/${dirName}`;
	// 检查文件夹是否存在如果不存在则新建文件夹
	checkDirExist(dir);
	// 获取文件名称
	const fileName = getUploadFileName(ext);
	// 定义文件写入路径
	const filePath = path.join(__dirname, `../${dir}/${fileName}`);
	// 创建可写流
	const upStream = fs.createWriteStream(filePath);
	// 可读流通过管道写入可写流
	reader.pipe(upStream);

	return `${dir}/${fileName}`;
}

/**
 * 多文件上传
 * @param {*} files
 * @returns
 */
function onFiles(files) {
	const list = [];
	for (let file of files) {
		// 创建可读流
		const reader = fs.createReadStream(file.path);
		// 获取文件后缀
		const ext = getUploadFileExt(file.name);
		// 最终要保存到的文件夹目录
		const dirName = getUploadDirName();
		const dir = `public/uploads/${dirName}`;
		// 检查文件夹是否存在如果不存在则新建文件夹
		checkDirExist(dir);
		// 获取文件名称
		const fileName = getUploadFileName(ext);
		// 定义文件写入路径
		const filePath = path.join(__dirname, `../${dir}/${fileName}`);
		// 创建可写流
		const upStream = fs.createWriteStream(filePath);
		// 可读流通过管道写入可写流
		reader.pipe(upStream);
		list.push(`${dir}/${fileName}`);
	}

	return list;
}

function onFileDefault(file) {
	if (utils.isArray(file.length)) {
		return onFiles(file);
	}
	return onFile(file);
}

module.exports = {
	onFileDefault,
};
