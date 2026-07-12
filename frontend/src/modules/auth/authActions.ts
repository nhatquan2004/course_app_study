'use server';

import { redirect } from 'next/navigation';
import { registerUser } from '@/services/userService';

export async function registerAction(
	prevState: {
		success: boolean;
		message: string;
	},
	formData: FormData,
) {
	const fullName = formData.get('fullName') as string;
	const username = formData.get('username') as string;
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const confirmPassword = formData.get('confirmPassword') as string;

	if (password !== confirmPassword) {
		return {
			success: false,
			message: 'Mật khẩu xác nhận không khớp',
		};
	}

	const response = await registerUser({
		fullName,
		username,
		email,
		password,
	});

	if (response.status !== 200) {
		return {
			success: false,
			message: response.message,
		};
	}

	redirect('/auth/login');

	// Alternatively, instead of redirect:
	// return {
	//     success: true,
	//     message: response.message,
	// };
}
