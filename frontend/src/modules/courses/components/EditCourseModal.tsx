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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        // Vì chúng ta dùng các input type="hidden" name="categoryIds" cho các danh mục được chọn,
        // formData.getAll('categoryIds') sẽ lấy được đầy đủ mảng danh mục.
        await updateCourseAction(course._id, formData);
        onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-stone-800 shadow-2xl relative">
        <h2 className="mb-5 text-xl font-semibold">Sửa khóa học</h2>

        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">Tên khóa học</p>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tên khóa học"
              className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">Mô tả</p>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Mô tả"
              className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">Giá (VNĐ)</p>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Giá"
                className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">Ảnh cover</p>
              <input
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="Ảnh cover"
                className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Hidden inputs to pass categoryIds to Form Server Action */}
          {selectedCategoryIds.map((id) => (
            <input key={id} type="hidden" name="categoryIds" value={id} />
          ))}

          {/* Custom Multi-Select Dropdown/Tag Input */}
          <div className="relative">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500">Phân loại khóa học (Chọn nhiều)</p>
            
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="min-h-[40px] w-full rounded-md border border-stone-200 bg-white px-3 py-1.5 text-sm text-stone-800 outline-none transition focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20 shadow-xs flex flex-wrap items-center gap-2 cursor-pointer select-none"
            >
              {selectedCategoryIds.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {selectedCategoryIds.map((id) => {
                    const cat = categories.find((c) => c._id === id);
                    if (!cat) return null;
                    return (
                      <span
                        key={cat._id}
                        className="inline-flex items-center gap-1 rounded bg-blue-50 pl-2 pr-1 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10"
                      >
                        {cat.categoryName}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryToggle(cat._id);
                          }}
                          className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-800 transition"
                        >
                          ✕
                        </button>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <span className="text-stone-400">Chọn phân loại...</span>
              )}

              <div className="ml-auto pointer-events-none text-stone-400 text-[9px] font-bold">
                {isDropdownOpen ? "▲" : "▼"}
              </div>
            </div>

            {/* Dropdown Options */}
            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-1.5 rounded-md border border-stone-200 bg-white shadow-xl max-h-48 overflow-y-auto p-1.5 space-y-0.5">
                {categories.map((cat) => {
                  const isSelected = selectedCategoryIds.includes(cat._id);
                  return (
                    <div
                      key={cat._id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryToggle(cat._id);
                      }}
                      className={`flex items-center justify-between px-3 py-2 text-sm rounded cursor-pointer select-none transition ${
                        isSelected
                          ? "bg-blue-50/60 text-blue-700 font-semibold"
                          : "text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      <span>{cat.categoryName}</span>
                      {isSelected && (
                        <span className="text-blue-600 font-bold">✓</span>
                      )}
                    </div>
                  );
                })}
                {categories.length === 0 && (
                  <p className="text-xs text-stone-400 italic p-3 text-center">Chưa có danh mục nào.</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2 border-t pt-4 border-stone-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Hủy
          </button>

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white text-sm"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </form>
  );
}
