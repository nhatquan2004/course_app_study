'use client';

import { useState } from 'react';
import type { Category } from '../types';
import { deleteCategoryAction } from '../actions/categoryActions';
import EditCategoryModal from './EditCategoryModal';

export default function CategoryList({ categoryList }: { categoryList: Category[] }) {
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);

	return (
		<div className="w-full">
			{categoryList.length === 0 ? (
				<div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200/60 p-16 text-center shadow-xs">
					<div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-3 border border-slate-100">
						<svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
						</svg>
					</div>
					<p className="text-sm font-semibold text-slate-500">Chưa có danh mục nào trên hệ thống.</p>
					<p className="text-xs text-slate-400 mt-1">Hãy nhấp vào nút &quot;Thêm danh mục&quot; ở trên để bắt đầu.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
					{categoryList.map((cat) => (
						<div
							key={cat._id}
							className="bg-white rounded-2xl border border-slate-200/60 p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition duration-150 h-36"
						>
							<div className="flex items-start gap-3.5">
								<div className="h-10 w-10 rounded-xl bg-linear-to-tr from-blue-500/10 to-indigo-500/10 flex items-center justify-center text-blue-600 font-extrabold text-sm shrink-0 uppercase">
									{cat.categoryName.charAt(0)}
								</div>
								<div className="min-w-0 flex-1">
									<h4 className="text-sm font-bold text-slate-800 truncate leading-snug">
										{cat.categoryName}
									</h4>
									<p className="text-[10px] text-slate-400 mt-1.5 font-medium">
										Tạo ngày: {cat.createdAt ? new Date(cat.createdAt).toLocaleDateString('vi-VN') : 'Không rõ'}
									</p>
								</div>
							</div>

							<div className="flex justify-end gap-1.5 pt-3.5 border-t border-slate-100/70">
								<button
									type="button"
									onClick={() => setEditingCategory(cat)}
									className="rounded-lg border border-slate-200 hover:bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-800 transition active:scale-95 cursor-pointer"
								>
									Sửa
								</button>
								<button
									type="button"
									onClick={async () => {
										if (confirm(`Bạn có chắc chắn muốn xóa danh mục "${cat.categoryName}" không?`)) {
											await deleteCategoryAction(cat._id);
										}
									}}
									className="rounded-lg border border-red-100 bg-red-50/50 hover:bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition active:scale-95 cursor-pointer"
								>
									Xóa
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{editingCategory && (
				<EditCategoryModal
					category={editingCategory}
					onClose={() => setEditingCategory(null)}
				/>
			)}
		</div>
	);
}
