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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-slate-800 shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        <h2 className="mb-5 text-lg font-bold text-slate-900">Sửa danh mục</h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Tên danh mục</label>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Nhập tên danh mục..."
              required
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition shadow-xs"
            />
          </div>

          {message && <p className="text-xs text-red-500 font-medium text-center">{message}</p>}
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t pt-4 border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition active:scale-95 cursor-pointer"
          >
            Hủy
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm shadow-blue-500/10 hover:shadow active:scale-95 cursor-pointer"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </form>
  );
}
