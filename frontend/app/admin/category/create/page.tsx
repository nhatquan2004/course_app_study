'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
		} catch (err: any) {
			setMessage(err.response?.data?.message || 'Có lỗi xảy ra.');
		}
	}

	return (
		<div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,#0ea5e9_0%,#020617_35%,#020617_100%)] px-6 py-10 text-white flex items-center justify-center">
			<div className="w-full max-w-md rounded-[32px] border border-cyan-400/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
				<h1 className="text-3xl font-bold mb-6 text-center">Thêm Danh Mục Mới</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block mb-2 text-sm font-medium">Tên danh mục</label>
						<input
							type="text"
							value={categoryName}
							onChange={e => setCategoryName(e.target.value)}
							placeholder="Nhập tên danh mục..."
							required
							className="w-full rounded-2xl border border-cyan-400/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-cyan-300"
						/>
					</div>
					
					{message && <p className="text-sm text-cyan-200 text-center">{message}</p>}

					<button
						type="submit"
						className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 py-3 font-bold hover:scale-[1.02] transition"
					>
						Tạo danh mục →
					</button>
				</form>
			</div>
		</div>
	);
}
