const { ADMIN_ROLE, FORBIDDEN } = require('../config');
const jwt = require('jsonwebtoken');

function authorization(req, res, next) {
	const authHeader = req.headers.authorization;

	const token = authHeader.split(' ')[1];

	try {
		const userData = jwt.verify(token, process.env.JWT_SECRET);
		console.log('userData', userData);
		next();
	} catch (err) {
		console.log(err);
		return res.status(403).send({
			message: 'Bạn không có quyền truy cập trang',
		});
	}
}

module.exports = authorization;
