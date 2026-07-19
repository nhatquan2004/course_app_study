const User = require('../../schemas/userSchemas');
const bcrypt = require('bcryptjs');
const logger = require('../../utils/logger');

async function getUser() {
	try {
		const users = await User.find();
		return users;
	} catch (err) {
		logger.error('Cannot get users', err);
	}
}

async function createUser(fullName, email, password, role) {
	try {
		const existingUser = await User.findOne({ email: email });

		if (existingUser) {
			throw new Error(`Email này đã được sử dụng: ${email}`);
		}

		const userData = {
			fullName,
			email,
			role: role || 'user',
		};

		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			userData.password = hashedPassword;
		}

		const user = await User.create(userData);

		logger.info(`Tạo người dùng thành công: ${email}`);
		return user;
	} catch (err) {
		logger.error(`Lỗi tạo người dùng: ${err.message}`);
		throw err;
	}
}

async function deleteUser(id) {
	try {
		const deletedUser = await User.findByIdAndDelete(id);
		return deletedUser;
	} catch (err) {
		logger.error('Error: không thể xóa người dùng', err);
	}
}

module.exports = {
	getUser,
	createUser,
	deleteUser,
};
