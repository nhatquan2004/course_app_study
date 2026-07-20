'use server';

import {
	getChapters,
	createChapter,
	deleteChapter,
	updateChapter,
	getLessons,
	createLesson,
	deleteLesson,
	updateLesson,
	saveSyllabusBatch,
} from '@/services/chapterService';
import { getCourseById, updateCourse } from '@/services/courseService';
import { revalidatePath } from 'next/cache';

export async function getChaptersAction(courseId: string) {
	try {
		const res = await getChapters(courseId);
		return res;
	} catch (err: any) {
		const errorMessage = err.response?.data?.message || err.message || 'Không thể tải danh sách chương';
		return { success: false, message: errorMessage };
	}
}

export async function getCourseAction(courseId: string) {
	try {
		const res = await getCourseById(courseId);
		return res;
	} catch (err: any) {
		const errorMessage = err.response?.data?.message || err.message || 'Không thể tải thông tin khóa học';
		return null;
	}
}

export async function createChapterAction(courseId: string, name: string) {
	try {
		const res = await createChapter(courseId, name);
		revalidatePath(`/admin/course/${courseId}/syllabus_management`);
		return res;
	} catch (err: any) {
		const errorMessage = err.response?.data?.message || err.message || 'Thêm chương thất bại';
		return { success: false, message: errorMessage };
	}
}

export async function deleteChapterAction(courseId: string, chapterId: string) {
	try {
		const res = await deleteChapter(courseId, chapterId);
		revalidatePath(`/admin/course/${courseId}/syllabus_management`);
		return res;
	} catch (err: any) {
		const errorMessage = err.response?.data?.message || err.message || 'Xóa chương thất bại';
		return { success: false, message: errorMessage };
	}
}

export async function updateChapterAction(courseId: string, chapterId: string, name: string) {
	try {
		const res = await updateChapter(courseId, chapterId, name);
		revalidatePath(`/admin/course/${courseId}/syllabus_management`);
		return res;
	} catch (err: any) {
		const errorMessage = err.response?.data?.message || err.message || 'Cập nhật chương thất bại';
		return { success: false, message: errorMessage };
	}
}

export async function getLessonsAction(courseId: string, chapterId: string) {
	try {
		const res = await getLessons(courseId, chapterId);
		return res;
	} catch (err: any) {
		const errorMessage = err.response?.data?.message || err.message || 'Không thể tải danh sách bài học';
		return { success: false, message: errorMessage };
	}
}

export async function createLessonAction(courseId: string, chapterId: string, lessonName: string, isPreviewable: boolean) {
	try {
		const res = await createLesson(courseId, chapterId, lessonName, isPreviewable);
		revalidatePath(`/admin/course/${courseId}/syllabus_management`);
		return res;
	} catch (err: any) {
		const errorMessage = err.response?.data?.message || err.message || 'Thêm bài học thất bại';
		return { success: false, message: errorMessage };
	}
}

export async function deleteLessonAction(courseId: string, chapterId: string, lessonId: string) {
	try {
		const res = await deleteLesson(courseId, chapterId, lessonId);
		revalidatePath(`/admin/course/${courseId}/syllabus_management`);
		return res;
	} catch (err: any) {
		const errorMessage = err.response?.data?.message || err.message || 'Xóa bài học thất bại';
		return { success: false, message: errorMessage };
	}
}

export async function updateLessonAction(courseId: string, chapterId: string, lessonId: string, updateData: any) {
	try {
		const res = await updateLesson(courseId, chapterId, lessonId, updateData);
		revalidatePath(`/admin/course/${courseId}/syllabus_management`);
		return res;
	} catch (err: any) {
		const errorMessage = err.response?.data?.message || err.message || 'Cập nhật bài học thất bại';
		return { success: false, message: errorMessage };
	}
}

export async function updateCourseStatusAction(courseId: string, status: 'draft' | 'published') {
	try {
		const res = await updateCourse(courseId, { status });
		revalidatePath('/admin/course');
		revalidatePath(`/admin/course/${courseId}/syllabus_management`);
		return { success: true, data: res };
	} catch (err: any) {
		const errorMessage = err.response?.data?.message || err.message || 'Cập nhật trạng thái thất bại';
		return { success: false, message: errorMessage };
	}
}

export async function saveSyllabusBatchAction(courseId: string, chapters: any[]) {
	try {
		const res = await saveSyllabusBatch(courseId, chapters);
		revalidatePath(`/admin/course/${courseId}/syllabus_management`);
		revalidatePath('/admin/course');
		return { success: true, data: res };
	} catch (err: any) {
		const errorMessage = err.response?.data?.message || err.message || 'Lưu giáo trình thất bại';
		return { success: false, message: errorMessage };
	}
}
