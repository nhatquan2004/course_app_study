import { API_BASE_URL } from '@/config/api';
import instance from '@/common/interceptor';

const COURSES_URL = `${API_BASE_URL}/courses`;

export async function getCourses() {
	try {
		const res = await instance.get(COURSES_URL);
		return res.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
}
