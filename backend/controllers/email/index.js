const emailService = require('../../services/email/emailService');

async function sendEmail(req, res) {
	try {
		const { to, subject, html } = req.body;

		if (!to || !subject || !html) {
			return res.status(400).json({ message: 'Missing recipient, subject, or content' });
		}

		const result = await emailService.sendEmail({ to, subject, html });
		return res.status(200).json({ message: 'Email process completed successfully', result });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
}

module.exports = {
	sendEmail,
};
