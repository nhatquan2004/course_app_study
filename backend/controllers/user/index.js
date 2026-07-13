const userService = require('../../services/user');

async function getUser(req, res) {
	const user = await userService.getUser();
	res.send(user);
}

async function createUser(req, res) {
	const { fullName, username, email, password, role } = req.body;

	const user = await userService.createUser(fullName, username, email, password, role);

	if (!user) {
		res.send({ status: 409, message: 'Tên đăng nhập đã được sử dụng' });
	}

	res.send({ status: 200, message: 'Tạo người dùng thành công', data: user });
}

async function deleteUser(req, res) {
	await userService.deleteUser(req.params.id);

	res.send({
		status: 204,
		message: 'Đã xóa người dùng',
	});
}

module.exports = {
	getUser,
	createUser,
	deleteUser,
};
