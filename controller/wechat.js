const superagent = require('superagent')
const logger = require('koa-log4').getLogger('wechat')

const { wechat_config } = require('../config/wechat_config')
const { sign } = require('../utils/wechat_lib')

class Wechat {

	// 跳转登录引导页
	async goLogin(ctx) {
		// 配前端页面地址就好  重定向示例 http://ip/xx.html?code=xxxx
		const REDIRECT_URI = 'http://22kgsd.natappfree.cc/test.html'
		const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wechat_config.appid +
			'&redirect_uri=' + REDIRECT_URI +
			'&response_type=code' +
			'&scope=snsapi_userinfo' +
			'&state=STATE#wechat_redirect'
		ctx.redirect(url)
	}

	// 获取 access_token openid
	async getAccessToken (ctx) {
		const { code } = ctx.query

		const req_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wechat_config.appid}&secret=${wechat_config.appsecret}&code=${code}&grant_type=authorization_code`
		
		const res = await superagent.get(req_url)
		const result = JSON.parse(res.text)

		ctx.body = {
			success: true,
			data: result
		}
	}

	// 获取用户信息
	async getWechatUserInfo (ctx) {
		const { access_token, openid } = ctx.query

		const req_url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`

		const res = await superagent.get(req_url)
		let info = JSON.parse(res.text)

		ctx.body = {
			success: true,
			data: info
		}
	}

	// 校验 access_token 是否有效
	async validateAccessToken (ctx) {
		const { access_token, openid } = ctx.query

		const req_url = `https://api.weixin.qq.com/sns/auth?access_token=${access_token}&openid=${openid}`
		
		const res = await superagent.get(req_url)
		let info = JSON.parse(res.text)

		ctx.body = {
			success: true,
			data: info
		}
	}

	// 刷新 access_token
	async refreshAccessToken (ctx) {
		const { refresh_token } = ctx.query

		const req_url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${wechat_config.appid}&grant_type=refresh_token&refresh_token=${refresh_token}`
		
		const res = await superagent.get(req_url)
		let info = JSON.parse(res.text)

		ctx.body = {
			success: true,
			data: info
		}
	}

	// 获取 ticket 所需要的 access_token 
	// sb wx
	// https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183
	async getAccessTokenForTicket (ctx) {
		const req_url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wechat_config.appid}&secret=${wechat_config.appsecret}`
		
		const res = await superagent.get(req_url)
		let info = JSON.parse(res.text)

		ctx.body = {
			success: true,
			data: info
		}
	}

	// 获取 jsapi_ticket
	async getTicket (ctx) {
		const { access_token } = ctx.query
		const req_url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`

		const res = await superagent.get(req_url)
		let info = JSON.parse(res.text)

		ctx.body = {
			success: true,
			data: info
		}
	}

	// 获取签名
	async getSignature (ctx) {
		const { ticket, url } = ctx.query

		const data = {
			...sign(ticket, url),
			appid: wechat_config.appid
		}

		ctx.body = {
			success: true,
			data
		}
	}


}

module.exports = new Wechat()