const UserModel = require('../models').User
const GroupModel = require('../models').Group

class User  {

	async getAllUser(ctx, next) {
		const data = await UserModel.findAll()
		ctx.response.body = {
			success: true,
			data
		}
	}

}

module.exports = new User()