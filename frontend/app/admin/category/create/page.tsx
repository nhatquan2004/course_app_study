'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createCategoryAction } from '@/modules/categories/actions/categoryActions';

export default function CreateCategoryPage() {
	const [categoryName, setCategoryName] = useState('');
	const [message, setMessage] = useState('');
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setMessage('');

		try {
			const res = await createCategoryAction({ categoryName });
			if (res.status === 201) {
				setMessage('Tạo danh mục thành công!');
				setCategoryName('');
				router.push('/admin/category');
			} else {
				setMessage(res.message || 'Tạo danh mục thất bại.');
			}
		} catch (err: unknown) {
			const error = err as { response?: { data?: { message?: string } } };
			setMessage(error.response?.data?.message || 'Có lỗi xảy ra.');
		}
	}

	return (
		<div className="min-h-screen w-full bg-linear-to-tr from-slate-50 via-blue-50/20 to-slate-100 px-6 py-6 md:py-0 md:h-screen md:overflow-hidden flex items-center justify-center text-slate-800">
			<div className="w-full max-w-md rounded-4xl border border-slate-200/60 bg-white/70 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-md">
				<h1 className="text-3xl font-light mb-6 text-center text-slate-900">Thêm danh mục mới</h1>

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
							Tên danh mục
						</label>
						<input
							type="text"
							value={categoryName}
							onChange={e => setCategoryName(e.target.value)}
							placeholder="Nhập tên danh mục..."
							required
							className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-sm"
						/>
					</div>

					{message && <p className="text-sm text-blue-600 text-center">{message}</p>}

					<div className="flex gap-3">
						<Link
							href="/admin/category"
							className="flex-1 rounded-2xl border border-slate-200 bg-white py-4 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 transition active:scale-[0.98]">
							Hủy
						</Link>
						<button
							type="submit"
							className="flex-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 shadow-lg hover:shadow-blue-500/10 transition-all duration-200 active:scale-[0.98]">
							Tạo danh mục →
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
