import { API_BASE_URL } from '@/config/api';
import instance from '@/common/interceptor';

export async function getChapters(courseId: string) {
	const res = await instance.get(`${API_BASE_URL}/courses/${courseId}/chapters`);
	return res.data;
}

export async function createChapter(courseId: string, name: string) {
	const res = await instance.post(`${API_BASE_URL}/courses/${courseId}/chapters`, {
		name,
		totalDuration: 0,
		totalLessons: 0,
	});
	return res.data;
}

export async function deleteChapter(courseId: string, chapterId: string) {
	const res = await instance.delete(`${API_BASE_URL}/courses/${courseId}/chapters/${chapterId}`);
	return res.data;
}

export async function updateChapter(courseId: string, chapterId: string, name: string) {
	const res = await instance.patch(`${API_BASE_URL}/courses/${courseId}/chapters/${chapterId}`, { name });
	return res.data;
}

export async function getLessons(courseId: string, chapterId: string) {
	const res = await instance.get(`${API_BASE_URL}/courses/${courseId}/chapters/${chapterId}/lessons`);
	return res.data;
}

export async function createLesson(courseId: string, chapterId: string, lessonName: string, isPreviewable: boolean) {
	const res = await instance.post(`${API_BASE_URL}/courses/${courseId}/chapters/${chapterId}/lessons`, {
		lessonName,
		duration: 0,
		isPreviewable,
	});
	return res.data;
}

export async function deleteLesson(courseId: string, chapterId: string, lessonId: string) {
	const res = await instance.delete(`${API_BASE_URL}/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`);
	return res.data;
}

export async function updateLesson(courseId: string, chapterId: string, lessonId: string, updateData: any) {
	const res = await instance.patch(`${API_BASE_URL}/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`, updateData);
	return res.data;
}
