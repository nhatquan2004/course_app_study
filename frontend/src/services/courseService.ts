import { API_BASE_URL } from '@/config/api';
import instance from '@/common/interceptor';

const COURSES_URL = `${API_BASE_URL}/courses`;

export async function getCourses() {
	try {
		const res = await instance.get(COURSES_URL);
		console.log('res getCourses', res.data);
		return res.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

export async function getCourseById(id: string) {
	try {
		const res = await instance.get(`${COURSES_URL}/${id}`);
		return res.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

export async function updateCourse(id: string, updateData: any) {
	const res = await instance.patch(`${COURSES_URL}/${id}`, updateData);
	return res.data;
}
