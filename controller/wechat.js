const superagent = require('superagent')
const log = require('log4js').getLogger('wechat')

const {
	wechat_config
} = require('../config/wechat_config')

class Wechat {

	async goLogin(ctx) {
		// 配前端页面地址就好  重定向示例 http://ip/xx.html?code=xxxx
		const REDIRECT_URI = 'http://weufg9.natappfree.cc/api/wechat/wxcallback'
		const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wechat_config.APPID +
			'&redirect_uri=' + REDIRECT_URI +
			'&response_type=code' +
			'&scope=snsapi_userinfo' +
			'&state=STATE#wechat_redirect'
		ctx.response.redirect(url)
	}

	// 获取 access_token openid
	async getAccessToken(ctx) {
		const {
			code
		} = ctx.query
		logger.trace(`getAccessToken: ${ctx.query}`)

		const req_callback_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wechat_config.APPID}&secret=${wechat_config.appsecret}&code=${code}&grant_type=authorization_code`

		const res = await superagent.get(req_callback_url)

		const result = JSON.parse(res.text)

		console.log('result', result)

		ctx.response.body = {
			success: true,
			data: result
		}
	}

	// 获取用户信息
	async getWechatUserInfo(ctx) {
		const { access_token, openid } = ctx.query

		const req_userinfo_url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`

		const res_user_info = await superagent.get(req_userinfo_url)
		let info = JSON.parse(res_user_info.text)

		console.log('info', info)

		ctx.response.body = {
			success: true,
			data: info
		}
	}

	// 校验 access_token 是否有效
	async validateAccessToken(ctx) {
		const {
			access_token,
			openid
		} = ctx.query

		const req_url = `https://api.weixin.qq.com/sns/auth?access_token=${access_token}&openid=${openid}`
		const validate_data = await superagent.get(req_url)

		ctx.response.body = {
			success: true,
			data: validate_data
		}
	}

	// 刷新 access_token
	async refreshAccessToken(ctx) {
		const {
			appid,
			refresh_token
		} = ctx.query

		const req_url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${appid}&grant_type=refresh_token&refresh_token=${refresh_token}`
		const access_token_data = await superagent.get(req_url)

		ctx.response.body = {
			success: true,
			data: access_token_data
		}
	}

}

module.exports = new Wechat()