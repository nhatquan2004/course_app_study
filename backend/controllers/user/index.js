const userService = require('../../services/user');

async function getUser(req, res) {
	const user = await userService.getUser();
	res.send(user);
}

async function createUser(req, res) {
	const { fullName, username, email, password, role } = req.body;

	const user = await userService.createUser(
		fullName,
		username,
		email,
		password,
		role
	);

	res.send({
		status: 200,
		message: 'Tạo người dùng thành công',
		data: user,
	});
}

module.exports = {
	getUser,
	createUser,
};
