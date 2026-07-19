const jwt = require('jsonwebtoken');
const authService = require('../../services/auth');
const User = require('../../schemas/userSchemas');
const bcrypt = require('bcryptjs');

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
	return res.sendStatus(500);
}

async function login(req, res) {
	const { email, password } = req.body;
	const user = await authService.login(email, password);

	if (!user) {
		return res.status(401).json({
			message: 'Email hoặc mật khẩu không đúng',
		});
	}

	const payload = {
		id: user.id,
		email: user.email,
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

async function verifyInvite(req, res) {
	try {
		const { token } = req.query;

		if (!token) {
			return res.status(400).json({ message: 'Token is required' });
		}

		const user = await User.findOne({
			invitationToken: token,
			invitationTokenExpires: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ message: 'Liên kết kích hoạt không hợp lệ hoặc đã hết hạn.' });
		}

		return res.status(200).json({
			message: 'Token hợp lệ',
			email: user.email,
			fullName: user.fullName,
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
}

async function setPassword(req, res) {
	try {
		const { token, password } = req.body;

		if (!token || !password) {
			return res.status(400).json({ message: 'Missing token or password' });
		}

		const user = await User.findOne({
			invitationToken: token,
			invitationTokenExpires: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ message: 'Liên kết không hợp lệ hoặc đã hết hạn.' });
		}

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		user.isVerified = true;
		user.invitationToken = undefined;
		user.invitationTokenExpires = undefined;
		await user.save();

		return res.status(200).json({ message: 'Thiết lập mật khẩu thành công.' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
}

module.exports = { login, me, verifyInvite, setPassword };
