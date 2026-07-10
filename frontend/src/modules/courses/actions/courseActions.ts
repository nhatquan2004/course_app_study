'use server';
import { createCourse, deleteCourse, updateCourse } from '@/services/courseService';
import { CreateCoursePayload, UpdateCoursePayload } from '../types';
import { revalidatePath } from 'next/cache';

export async function createCourseAction(courseData: CreateCoursePayload) {
	const res = await createCourse(courseData);
	revalidatePath('/');
	return res;
}

export async function updateCourseAction(courseId: string, courseUpdateData: UpdateCoursePayload) {
	const res = await updateCourse(courseId, courseUpdateData);
	revalidatePath('/');
	return res;
}

export async function deleteCourseAction(courseId: string) {
	const res = await deleteCourse(courseId);
	revalidatePath('/');
	return res;
}
