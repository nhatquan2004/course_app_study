'use client';

import type { Category } from '../types';

export default function CategoryList({ categoryList }: { categoryList: Category[] }) {
	return (
		<div className="w-full max-w-2xl bg-white rounded-lg shadow-sm border border-stone-200 p-6">
			<h3 className="text-lg font-semibold text-stone-900 mb-4">Danh sách danh mục</h3>
			<ul className="divide-y divide-stone-200">
				{categoryList?.map(cat => (
					<li key={cat._id} className="py-3 flex justify-between items-center text-stone-700">
						<span>{cat.categoryName}</span>
						<span className="text-xs text-stone-400">
							{cat.createdAt ? new Date(cat.createdAt).toLocaleDateString('vi-VN') : ''}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
