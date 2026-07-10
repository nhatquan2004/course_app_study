'use client';

import { useState } from 'react';
import type { Category } from '../types';
import { deleteCategoryAction } from '../actions/categoryActions';
import EditUserModal from './';

export default function CategoryList({ categoryList }: { categoryList: Category[] }) {
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);

	return (
		<div className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
			<h3 className="text-base font-bold text-slate-800 mb-4">Phân loại hiện có</h3>
			<ul className="divide-y divide-slate-100">
				{categoryList?.map(cat => (
					<li
						key={cat._id}
						className="py-3.5 flex justify-between items-center text-slate-700 hover:bg-slate-50/30 px-3 rounded-lg transition duration-150">
						<div className="flex flex-col">
							<span className="text-sm font-bold text-slate-800">{cat.categoryName}</span>
							<span className="text-xs text-slate-400 mt-0.5">
								Tạo ngày:{' '}
								{cat.createdAt ? new Date(cat.createdAt).toLocaleDateString('vi-VN') : 'Không rõ'}
							</span>
						</div>

						<div className="flex gap-2">
							<button
								type="button"
								onClick={() => setEditingCategory(cat)}
								className="rounded-lg border border-slate-200 hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 transition active:scale-95">
								Sửa
							</button>
							<button
								type="button"
								onClick={async () => {
									if (confirm(`Bạn có chắc chắn muốn xóa danh mục "${cat.categoryName}" không?`)) {
										await deleteCategoryAction(cat._id);
									}
								}}
								className="rounded-lg border border-red-100 bg-red-50/50 hover:bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition active:scale-95">
								Xóa
							</button>
						</div>
					</li>
				))}
				{categoryList.length === 0 && (
					<li className="py-4 text-center text-sm text-slate-400 italic">
						Chưa có danh mục nào trên hệ thống.
					</li>
				)}
			</ul>

			{editingCategory && (
				<EditCategoryModal category={editingCategory} onClose={() => setEditingCategory(null)} />
			)}
		</div>
	);
}
