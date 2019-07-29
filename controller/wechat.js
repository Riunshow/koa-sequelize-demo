const superagent = require('superagent')

const { wechat_config } = require('../config/wechat_config')

class Wechat {

	async goLogin(ctx, next) {
		// 配前端页面地址就好  重定向示例 http://ip/xx.html?code=xxxx
		const REDIRECT_URI = 'http://weufg9.natappfree.cc/api/wechat/wxcallback'
		const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wechat_config.APPID +
			'&redirect_uri=' + REDIRECT_URI +
			'&response_type=code' +
			'&scope=snsapi_userinfo' +
			'&state=STATE#wechat_redirect'
		ctx.response.redirect(url)
	}

	async wxCallBack(ctx, next) {
		const code = ctx.query.code
		const res = await superagent.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + wechat_config.APPID +
			'&secret=' + wechat_config.appsecret +
			'&code=' + code +
			'&grant_type=authorization_code')

		const result = JSON.parse(res.text)

		console.log('result', result)

		const access_token = result.access_token
		const openid = result.openid

		const res_user_info = await superagent.get(
			'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token +
			'&openid=' + openid +
			'&lang=zh_CN')
		let info = JSON.parse(res_user_info.text)

		console.log('info', info)

		ctx.response.body  = {
			success: true,
			data: info
		}

	}

}

module.exports = new Wechat()