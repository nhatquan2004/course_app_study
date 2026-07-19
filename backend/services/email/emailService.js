const nodemailer = require('nodemailer');
const logger = require('../../utils/logger');

async function sendEmail({ to, subject, html }) {
	try {
		const user = process.env.EMAIL_USER;
		const pass = process.env.EMAIL_PASS;

		if (!user || !pass) {
			logger.warn(
				`EMAIL_USER or EMAIL_PASS not configured. Logging email instead: to=${to}, subject=${subject}`,
			);
			return { success: true, logged: true };
		}

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: user,
				pass: pass,
			},
		});

		const mailOptions = {
			from: `"Course App" <${user}>`,
			to: to,
			subject: subject,
			html: html,
		};

		const info = await transporter.sendMail(mailOptions);
		logger.info(`Email sent: ${info.messageId}`);
		return { success: true, messageId: info.messageId };
	} catch (err) {
		logger.error(`Email send failed: ${err.message}`);
		throw err;
	}
}

module.exports = {
	sendEmail,
};
