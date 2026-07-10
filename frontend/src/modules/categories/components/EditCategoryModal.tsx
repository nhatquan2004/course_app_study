"use client";

import { useState } from "react";
import type { Category } from "../types";
import { updateCategoryAction } from "../actions/categoryActions";

type Props = {
  category: Category;
  onClose: () => void;
};

export default function EditCategoryModal({ category, onClose }: Props) {
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [message, setMessage] = useState("");

  return (
    <form
      action={async () => {
        setMessage("");
        try {
          await updateCategoryAction(category._id, { categoryName });
          onClose();
        } catch (err: unknown) {
          const error = err as { response?: { data?: { message?: string } } };
          setMessage(error.response?.data?.message || "Có lỗi xảy ra khi sửa.");
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-stone-800 shadow-2xl relative">
        <h2 className="mb-5 text-xl font-semibold">Sửa danh mục</h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Tên danh mục</label>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Nhập tên danh mục..."
              required
              className="w-full rounded-md border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
            />
          </div>

          {message && <p className="text-sm text-red-500 text-center">{message}</p>}
        </div>

        <div className="mt-5 flex justify-end gap-2 border-t pt-4 border-stone-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition active:scale-95"
          >
            Hủy
          </button>

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700 transition shadow-sm shadow-blue-500/10 hover:shadow active:scale-95"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </form>
  );
}
