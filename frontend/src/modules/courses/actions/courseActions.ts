'use server';

import instance from '@/common/interceptor';
import { API_BASE_URL } from '@/config/api';
import type { CreateCoursePayload, UpdateCoursePayload } from '../types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const COURSES_URL = `${API_BASE_URL}/courses`;

export async function createCourseAction(courseData: CreateCoursePayload) {
	const res = await instance.post(COURSES_URL, courseData);

	revalidatePath('/');
	redirect('/');

	// Unreachable because redirect() throws
	// return res.data;
}

export async function updateCourseAction(courseId: string, courseData: UpdateCoursePayload) {
	const res = await instance.patch(`${COURSES_URL}/${courseId}`, courseData);

	revalidatePath('/');

	return res.data;
}

export async function deleteCourseAction(courseId: string) {
	const res = await instance.delete(`${COURSES_URL}/${courseId}`);

	revalidatePath('/');

	return res.data;
}
