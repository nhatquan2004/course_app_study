const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
	// Log the full error for debugging
	logger.error(err);

	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		success: false,
		message: err.message || 'Internal Server Error',
	});
}

module.exports = errorHandler;
