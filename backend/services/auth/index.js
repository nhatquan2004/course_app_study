const User = require('../../schemas/userSchemas');
const bcrypt = require('bcryptjs');

async function login(email, password) {
	try {
		const user = await User.findOne({ email: email });

		if (!user) {
			return null;
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) {
			return user;
		} else {
			return null;
		}
	} catch (err) {
		logger.info('Login unsuccessful', err);
	}
}

async function getProfile(userId) {
	try {
		const user = await User.findOne({ _id: userId });

		return user;
	} catch (err) {
		logger.info('Lỗi /me', err);
	}
}

module.exports = {
	login,
	getProfile,
};
