const _ = require('lodash')

const WxUserModel = require('../models').WxUser

class User {

	// 绑定用户
	async bindUser (ctx) {
		const { openid, nickname, avatar, gender = '', city = '', province = '', country = '' } = ctx.request.body 

		if (!openid || !nickname || !avatar) {
			return ctx.throw(400)
		}

		const new_user_data = {
			openid,
			nickname,
			avatar,
			gender,
			city,
			province,
			country
		}
		// 用户存在则更新
		await WxUserModel.upsert(new_user_data)
		
		ctx.body = {
			success: true,
			message: '更新用户成功'
		}
	}

	// 获取单个用户
	async getUser (ctx) {
		const { user_id } = ctx.params

		if (!user_id || !_.isFinite(parseInt(user_id))) {
			return ctx.throw(400)
		}

		const user_find_data = await WxUserModel.findOne({
			where: {
				id: parseInt(user_id)
			},
			attributes: ['id', 'openid', 'nickname', 'avatar', 'gender', 'city', 'province', 'country', 'created_at', 'updated_at']
		})

		ctx.body = {
			success: true,
			data: user_find_data
		}
	}

	// 获取全部用户
	async getAllUsers (ctx) {
		const all_users_data = await WxUserModel.findAll({
			attributes: ['id', 'openid', 'nickname', 'avatar', 'gender', 'city', 'province', 'country', 'created_at', 'updated_at']
		})

		ctx.body = {
			success: true,
			data: all_users_data
		}
	}

}

module.exports = new User()