const User = require('../../schemas/userSchemas');
const bcrypt = require('bcryptjs');
async function login(username, password) {
	try {
		const user = await User.findOne({ username: username });

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
		console.log('Login unsuccessful', err);
	}
}

async function getProfile(userId) {
	try {
		const user = await User.findOne({ _id: userId });

		return user;
	} catch (err) {
		console.log('Lỗi /me', err);
	}
}

module.exports = {
	login,
	getProfile,
};
