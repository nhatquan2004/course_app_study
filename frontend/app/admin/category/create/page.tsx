'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createCategoryAction } from '@/modules/categories/actions/categoryActions';
import { toast } from 'react-toastify';

export default function CreateCategoryPage() {
	const [categoryName, setCategoryName] = useState('');
	const [message, setMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!categoryName.trim() || isSubmitting) return;

		setIsSubmitting(true);
		setMessage('');

		try {
			const res = await createCategoryAction({ categoryName: categoryName.trim() });
			if (res.status === 201) {
				toast.success('Tạo danh mục thành công!');
				setCategoryName('');
				router.push('/admin/category');
			} else {
				setMessage(res.message || 'Tạo danh mục thất bại.');
			}
		} catch (err: unknown) {
			const error = err as { response?: { data?: { message?: string } } };
			setMessage(error.response?.data?.message || 'Có lỗi xảy ra.');
		} finally {
			setIsSubmitting(false);
		}
	}

	const labelClassName = 'block mb-1.5 text-[10px] font-black uppercase tracking-wider text-[var(--color-muted)]';
	const inputClassName =
		'w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white px-3.5 py-2.5 text-xs text-[var(--color-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent-2)]/20 shadow-2xs';

	return (
		<div className="min-h-screen w-full bg-[var(--color-paper-2)] px-6 py-6 md:py-0 md:h-screen md:overflow-hidden flex items-center justify-center text-[var(--color-ink)] font-sans">
			<div className="w-full max-w-md rounded-[24px] border border-[var(--color-rule)] bg-white p-8 shadow-lg">
				<h1 className="text-2xl font-black mb-6 text-center text-[var(--color-ink)] tracking-tight">Thêm danh mục mới</h1>

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className={labelClassName}>
							Tên danh mục
						</label>
						<input
							type="text"
							value={categoryName}
							onChange={e => setCategoryName(e.target.value)}
							placeholder="Nhập tên danh mục..."
							required
							className={inputClassName}
							disabled={isSubmitting}
						/>
					</div>

					{message && <p className="text-xs text-rose-500 font-bold text-center">{message}</p>}

					<div className="flex gap-3.5 pt-1.5">
						<Link
							href="/admin/category"
							className="btn-push btn-push-soft flex-1 text-center text-xs py-2.5"
						>
							Hủy
						</Link>
						<button
							type="submit"
							className="btn-push btn-push-cyan flex-1 text-xs py-2.5"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Đang tạo...' : 'Tạo danh mục'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
