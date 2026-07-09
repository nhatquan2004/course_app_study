'use server';
import { createCourse, deleteCourse, updateCourse } from '@/services/courseService';
import { CreateCoursePayload } from '../types';

export async function createCourseAction(courseData: CreateCoursePayload) {
	return await createCourse(courseData);
}

export async function updateCourseAction(courseId: string, formData: FormData) {
	const courseUpdateData = {
		name: formData.get('name')?.toString() || '',
		description: formData.get('description')?.toString() || '',
		coverImage: formData.get('coverImage')?.toString() || '',
		price: Number(formData.get('price')),
		categoryIds: formData.getAll('categoryIds').map(id => id.toString()),
	};

	return await updateCourse(courseId, courseUpdateData);
}

export async function deleteCourseAction(courseId: string) {
	return await deleteCourse(courseId);
}
