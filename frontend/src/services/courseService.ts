import { API_BASE_URL } from "@/config/api";
import type {
  CreateCoursePayload,
  UpdateCoursePayload,
} from "@/modules/courses/types";
import { revalidatePath } from "next/cache";
import instance from "@/common/interceptor";

const COURSES_URL = `${API_BASE_URL}/courses`;

export async function getCourses() {
  try {
    const res = await instance.get(COURSES_URL);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function createCourse(courseData: CreateCoursePayload) {
  const res = await instance.post(COURSES_URL, courseData);
  return res.data;
}

export async function updateCourse(id: string, courseData: UpdateCoursePayload) {
  const res = await instance.patch(`${COURSES_URL}/${id}`, courseData);
  // revalidatePath(COURSES_URL);
  return res;
}

export async function deleteCourse(id: string) {
  const res = await instance.delete(`${COURSES_URL}/${id}`);
  revalidatePath(COURSES_URL);
  return res;
}
