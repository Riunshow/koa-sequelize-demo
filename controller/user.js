const { UserModel } = require('../models/user')
const { GroupModel } = require('../models/group')

class User  {

	async getAllUser(ctx, next) {
		const data = await UserModel.findAll()
		ctx.response.body  = {
			success: true,
			data
		}
	}

}

module.exports = new User()