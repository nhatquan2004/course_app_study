'use client';

import { useState } from 'react';
import type { Category } from '../types';
import { deleteCategoryAction } from '../actions/categoryActions';
import EditCategoryModal from './EditCategoryModal';
import SearchBar from '@/common/components/SearchBar';

export default function CategoryList({ categoryList }: { categoryList: Category[] }) {
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);
	const [searchQuery, setSearchQuery] = useState('');

	const filteredCategories = categoryList.filter((cat) =>
		cat.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="w-full flex flex-col gap-4">
			<div className="flex justify-start">
				<SearchBar
					value={searchQuery}
					onChange={setSearchQuery}
					placeholder="Tìm kiếm danh mục..."
					className="w-full md:w-80"
				/>
			</div>

			{filteredCategories.length === 0 ? (
				<div className="tactile-card p-16 text-center bg-white flex flex-col items-center justify-center">
					<div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-3 border border-slate-100">
						<svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
						</svg>
					</div>
					<p className="text-xs font-bold text-[var(--color-muted)]">Không tìm thấy danh mục nào.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
					{filteredCategories.map((cat) => (
						<div
							key={cat._id}
							className="tactile-card p-5 bg-white flex flex-col justify-between h-40"
						>
							<div className="flex items-start gap-3.5">
								<div className="h-10 w-10 rounded-xl bg-[var(--color-accent-2)]/10 border border-[var(--color-accent-2)]/20 flex items-center justify-center text-[var(--color-accent-2)] font-black text-sm shrink-0 uppercase">
									{cat.categoryName.charAt(0)}
								</div>
								<div className="min-w-0 flex-1">
									<h4 className="text-xs font-black text-[var(--color-ink)] truncate leading-snug tracking-tight">
										{cat.categoryName}
									</h4>
									<p className="text-[10px] text-[var(--color-muted)] mt-1.5 font-bold">
										Tạo ngày: {cat.createdAt ? new Date(cat.createdAt).toLocaleDateString('vi-VN') : 'Không rõ'}
									</p>
								</div>
							</div>

							<div className="flex justify-end gap-2 pt-3 border-t border-[var(--color-rule)]">
								<button
									type="button"
									onClick={() => setEditingCategory(cat)}
									className="btn-push btn-push-soft !py-1.5 !px-3.5 text-[11px]"
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
									className="btn-push btn-push-coral !py-1.5 !px-3.5 text-[11px]"
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
