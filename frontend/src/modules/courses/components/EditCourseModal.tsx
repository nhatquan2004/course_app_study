"use client";

import { useState, useEffect } from "react";
import type { Course } from "../types";
import { updateCourseAction } from "../actions/courseActions";
import { getCategories } from "@/services/categoryService";
import type { Category } from "@/modules/categories/types";

type Props = {
  course: Course;
  onClose: () => void;
};

export default function EditCourseModal({ course, onClose }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    course.categoryIds || []
  );

  const [form, setForm] = useState({
    name: course.name,
    description: course.description,
    price: String(course.price),
    coverImage: course.coverImage ?? "",
  });

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data || []);
    }
    loadCategories();
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleCategoryToggle(id: string) {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  return (
    <form
      action={async (formData) => {
        // formData.getAll('categoryIds') sẽ được server action tự động thu thập từ các checkbox có checked
        await updateCourseAction(course._id, formData);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-stone-800">
        <h2 className="mb-5 text-xl font-semibold">Sửa khóa học</h2>

        <div className="flex flex-col gap-3">
          <div>
            <p className="mb-1 text-sm font-medium text-stone-600">Tên khóa học</p>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tên khóa học"
              className="w-full rounded-md border p-2"
            />
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-stone-600">Mô tả</p>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Mô tả"
              className="w-full rounded-md border p-2"
            />
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-stone-600">Giá</p>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Giá"
              className="w-full rounded-md border p-2"
            />
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-stone-600">Ảnh cover</p>
            <input
              name="coverImage"
              value={form.coverImage}
              onChange={handleChange}
              placeholder="Ảnh cover"
              className="w-full rounded-md border p-2"
            />
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-stone-600">Phân loại khóa học (Chọn nhiều)</p>
            <div className="space-y-2 max-h-40 overflow-y-auto rounded-md border p-3 bg-stone-50">
              {categories.map((cat) => {
                const isChecked = selectedCategoryIds.includes(cat._id);
                return (
                  <label key={cat._id} className="flex items-center gap-3 cursor-pointer select-none text-stone-700">
                    <input
                      type="checkbox"
                      name="categoryIds"
                      value={cat._id}
                      checked={isChecked}
                      onChange={() => handleCategoryToggle(cat._id)}
                      className="w-4 h-4 rounded border-stone-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{cat.categoryName}</span>
                  </label>
                );
              })}
              {categories.length === 0 && (
                <p className="text-sm text-stone-400 italic">Chưa có danh mục nào.</p>
              )}
            </div>
          </div>
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
