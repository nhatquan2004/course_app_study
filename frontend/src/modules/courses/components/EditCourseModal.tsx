"use client";

import { useState } from "react";
import type { Course } from "../types";
import { updateCourseAction } from "../actions/courseActions";

type Props = {
  course: Course;
  onClose: () => void;
};

export default function EditCourseModal({ course, onClose }: Props) {
  const [form, setForm] = useState({
    name: course.name,
    description: course.description,
    price: String(course.price),
    coverImage: course.coverImage ?? "",
    categoryId: String(course.categoryId ?? ""),
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  return (
    <form
      action={async (formData) => {
        await updateCourseAction(course._id, formData);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-5 text-xl font-semibold">Sửa khóa học</h2>

        <div className="flex flex-col gap-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên khóa học"
            className="rounded-md border p-2"
          />

          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Mô tả"
            className="rounded-md border p-2"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Giá"
            className="rounded-md border p-2"
          />

          <input
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="Ảnh cover"
            className="rounded-md border p-2"
          />

          <input
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            placeholder="Category ID"
            className="rounded-md border p-2"
          />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border px-4 py-2"
          >
            Hủy
          </button>

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white"
          >
            Lưu
          </button>
        </div>
      </div>
    </form>
  );
}
