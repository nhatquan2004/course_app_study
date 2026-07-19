import { API_BASE_URL } from '@/config/api';
import instance from '@/common/interceptor';

type RegisterPayload = {
	fullName: string;
	email: string;
	password?: string;
	role?: string;
};

type LoginPayload = {
	email: string;
	password: string;
};

export async function getUserList() {
	const res = await instance.get(`${API_BASE_URL}/user`);
	return res.data;
}

export async function deleteUser(id: string) {
	const res = await instance.delete(`${API_BASE_URL}/user/${id}`);
	return res;
}

export async function registerUser(userData: RegisterPayload) {
	const res = await instance.post(`${API_BASE_URL}/user/create`, userData);
	return res.data;
}

export async function loginUser(userData: LoginPayload) {
	try {
		const res = await instance.post(`${API_BASE_URL}/auth/login`, userData);
		return res;
	} catch (err) {
		console.log(err);
	}
}
