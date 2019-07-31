const sha1 = require('sha1')

// 生成随机字符串
function _createNonce() {
	return Math.random().toString(36).substr(2, 15)
}

// 创建时间戳
function _createTimestamp() {
	return parseInt(new Date().getTime() / 1000, 0) + ''
}

/**
 * 排序拼接
 * @param {*} args 
 */
function raw(args) {
	let keys = Object.keys(args)
	let newArgs = {}
	let str = ''

	keys = keys.sort()
	keys.forEach((key) => {
		newArgs[key.toLowerCase()] = args[key]
	})

	for (let k in newArgs) {
		str += '&' + k + '=' + newArgs[k]
	}

	return str.substr(1)
}

/**
 * 签名算法
 * @param {*} nonce 
 * @param {*} ticket 
 * @param {*} timestamp 
 * @param {*} url 
 */
function _signIt(nonce, ticket, timestamp, url) {
	const ret = {
		jsapi_ticket: ticket,
		nonceStr: nonce,
		timestamp: timestamp,
		url: url
	}

	const string = raw(ret)
	console.log('sign url: ', string)

	const sha = sha1(string)

	return sha
}

/**
 * 调用签名算法
 * @param {*} ticket 
 * @param {*} url 
 */
function sign(ticket, url) {
	const nonce = _createNonce()
	const timestamp = _createTimestamp()
	const signature = _signIt(nonce, ticket, timestamp, url)

	return {
		noncestr: nonce,
		timestamp: timestamp,
		signature: signature
	}
}

module.exports = {
	sign
}