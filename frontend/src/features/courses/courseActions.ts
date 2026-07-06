"use server";
import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "@/services/courseService";
import { CreateCoursePayload, UpdateCoursePayload } from "./types";

export async function createCourseAction(courseData: CreateCoursePayload) {
  return await createCourse(courseData);
}

export async function updateCourseAction(courseId: any, formData: FormData) {
  const courseUpdateData = {
    name: formData.get("name"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage"),
    price: Number(formData.get("price")),
    categoryId: Number(formData.get("categoryId")),
  };

  return await updateCourse(courseId, courseUpdateData);
}

export async function deleteCourseAction(courseId: string) {
  return await deleteCourse(courseId);
}
