'use server';

import { deleteUser, registerUser } from '@/services/userService';
import { revalidatePath } from 'next/cache';

export async function deleteUserAction(userId: string) {
	try {
		const res = await deleteUser(userId);
		revalidatePath('/admin/user_management');
		return res;
	} catch (err: any) {
		const errorMessage = err.response?.data?.message || err.message || 'Xóa người dùng thất bại';
		return { status: 400, message: errorMessage };
	}
}

export async function createUserAction(userData: { fullName: string; email: string; password?: string; role?: string }) {
	try {
		const res = await registerUser(userData);
		revalidatePath('/admin/user_management');
		return res;
	} catch (err: any) {
		const errorMessage = err.response?.data?.message || err.message || 'Tạo người dùng thất bại';
		return { status: 400, message: errorMessage };
	}
}
