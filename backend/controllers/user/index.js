const userService = require('../../services/user');
const emailService = require('../../services/email/emailService');
const crypto = require('crypto');

async function getUser(req, res) {
	const user = await userService.getUser();
	res.send(user);
}

async function createUser(req, res) {
	try {
		const { fullName, email, password, role } = req.body;

		if (password) {
			const user = await userService.createUser(fullName, email, password, role);
			if (!user) {
				return res.status(409).json({ message: 'Tạo người dùng thất bại' });
			}
			return res.status(200).json({ status: 200, message: 'Tạo người dùng thành công', data: user });
		}

		const user = await userService.createUser(fullName, email, null, role);
		if (!user) {
			return res.status(409).json({ message: 'Tạo người dùng thất bại' });
		}

		const token = crypto.randomBytes(32).toString('hex');
		user.invitationToken = token;
		user.invitationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
		user.isVerified = false;
		await user.save();

		const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
		const inviteLink = `${frontendUrl}/auth/set-password?token=${token}`;

		const htmlContent = `
			<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 12px;">
				<h2 style="color: #1e293b; text-align: center;">Chào mừng đến với Course App</h2>
				<p>Xin chào ${fullName},</p>
				<p>Bạn đã được mời tham gia hệ thống Course App với vai trò là <strong>${role || 'user'}</strong>.</p>
				<p>Vui lòng nhấp vào nút bên dưới để xác nhận tài khoản và thiết lập mật khẩu của bạn:</p>
				<div style="text-align: center; margin: 30px 0;">
					<a href="${inviteLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Kích hoạt tài khoản</a>
				</div>
				<p style="color: #64748b; font-size: 12px;">Đường liên kết kích hoạt này sẽ hết hạn sau 24 giờ.</p>
				<hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
				<p style="color: #94a3b8; font-size: 11px; text-align: center;">Đây là email tự động, vui lòng không phản hồi.</p>
			</div>
		`;

		await emailService.sendEmail({
			to: email,
			subject: '[Course App] Lời mời tham gia hệ thống và thiết lập mật khẩu',
			html: htmlContent,
		});

		return res.status(200).json({ status: 200, message: 'Gửi lời mời kích hoạt thành công', data: user });
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
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
