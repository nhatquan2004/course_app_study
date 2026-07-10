const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: 'No toekn' });
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = decoded;

		next();
	} catch {
		return res.status(401).send({
			message: 'Token không hợp lệ hoặc hết hạn',
		});
	}
}

module.exports = authentication;
