const jwt = require('jsonwebtoken');
const authService = require('../../services/auth');

const users = [
	{ id: 1, email: 'user1@gmail.com', password: 'password1', role: 'user' },
	{ id: 2, email: 'user2@gmail.com', password: 'password2', role: 'admin' },
	{ id: 3, email: 'user3@gmail.com', password: 'password3', role: 'user' },
];

async function me(req, res) {
	if (req.headers && req.headers.authorization) {
		const authorization = req.headers.authorization.split(' ')[1];
		try {
			decoded = jwt.verify(authorization, process.env.JWT_SECRET);
		} catch (e) {
			return res.status(401).send('unauthorized');
		}
		const userId = decoded.id;
		const user = await authService.getProfile(userId);

		return res.status(200).send({ user });
	}
	return res.send(500);
}

async function login(req, res) {
	const { username, password } = req.body;
	const user = await authService.login(username, password);

	if (!user) {
		return res.status(401).json({
			message: 'Tên đăng nhập hoặc mật khẩu không đúng',
		});
	}

	const payload = {
		id: user.id,
		username: user.username,
		role: user.role,
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: '5h',
	});

	res.json({
		token: token,
		status: 200,
		message: 'Successfully logged in',
		role: user.role,
	});
}

module.exports = { login, me };
