const { ADMIN_ROLE, FORBIDDEN } = require('../config');
const jwt = require('jsonwebtoken');

function authorization(...roles) {
	return function (req, res, next) {
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({
				message: 'Bạn không có quyền truy cập trang này!',
			});
		}

		next();
	};
}

module.exports = authorization;
