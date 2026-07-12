'use server';

import { deleteUser } from '@/services/userService';
import { revalidatePath } from 'next/cache';

export async function deleteUserAction(userId: string) {
	const res = await deleteUser(userId);
	revalidatePath('/admin/user_management');
	return res;
}
