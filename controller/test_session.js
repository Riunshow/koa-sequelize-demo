const Sequelize = require('sequelize')

const WxUserModel = require('../models').WxUser
const TestSessionModel = require('../models').TestSession

class TestSession {

	// 获取做测试人数
	async getTestSessionCount (ctx) {
		const data = await TestSessionModel.findAll({
			attributes: [
				[Sequelize.literal('DISTINCT `to_user_id`'), 'to_user_id']
			]
		})
		
		ctx.body = {
			success: true,
			data
		}
	}
}

module.exports = new TestSession()
