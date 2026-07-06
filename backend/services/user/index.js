const User = require('../../schemas/userSchemas');
const bcrypt = require('bcryptjs');
const logger = require('../../utils/logger');
async function getUser() {
	try {
		const users = await User.find();

		return users;
	} catch (err) {
		console.log('Cannot get users', err);
	}
}

async function createUser(fullName, username, email, password, role) {
	try {
		const salt = await bcrypt.genSalt(10);

		const hashedPassword = await bcrypt.hash(password, salt);
		const user = await User.create({
			fullName,
			username,
			email,
			password: hashedPassword,
			role: role || 'user',
		});

		logger.info(`Tạo người dùng thành công: ${username}`);
		return user;
	} catch (err) {
		logger.error(`Lỗi tạo người dùng: ${err.message}`);
	}
}

module.exports = {
	getUser,
	createUser,
};
