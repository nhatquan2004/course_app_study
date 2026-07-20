'use client';

import { useState } from 'react';
import type { Category } from '../types';
import { updateCategoryAction } from '../actions/categoryActions';
import { HiXMark } from 'react-icons/hi2';

type Props = {
	category: Category;
	onClose: () => void;
};

export default function EditCategoryModal({ category, onClose }: Props) {
	const [categoryName, setCategoryName] = useState(category.categoryName);
	const [message, setMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!categoryName.trim() || isSubmitting) return;

		setIsSubmitting(true);
		setMessage('');
		try {
			await updateCategoryAction(category._id, { categoryName: categoryName.trim() });
			onClose();
		} catch (err: unknown) {
			const error = err as { response?: { data?: { message?: string } } };
			setMessage(error.response?.data?.message || 'Có lỗi xảy ra khi sửa.');
		} finally {
			setIsSubmitting(false);
		}
	}

	const labelClassName = 'block text-[10px] font-black uppercase tracking-wider text-[var(--color-muted)] mb-1.5';
	const inputClassName =
		'w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white px-3.5 py-2.5 text-xs text-[var(--color-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent-2)]/20 shadow-2xs';

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/50 backdrop-blur-md p-4">
			<div className="w-full max-w-md rounded-[24px] bg-white p-7 shadow-2xl border border-[var(--color-rule)] relative text-[var(--color-ink)] font-sans">
				{/* Close button with explicit positioning */}
				<button
					type="button"
					onClick={onClose}
					style={{ right: '1.5rem', top: '1.25rem' }}
					className="absolute btn-push btn-push-soft !p-1.5 !w-8 !h-8 text-[var(--color-muted)] flex items-center justify-center"
				>
					<HiXMark className="h-5 w-5" />
				</button>

				<h2 className="mb-6 text-base font-black tracking-tight text-[var(--color-ink)] uppercase tracking-wider text-[var(--color-accent-2)]">
					Sửa danh mục
				</h2>

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className={labelClassName}>Tên danh mục</label>
						<input
							value={categoryName}
							onChange={(e) => setCategoryName(e.target.value)}
							placeholder="Nhập tên danh mục..."
							required
							className={inputClassName}
							disabled={isSubmitting}
						/>
					</div>

					{message && <p className="text-xs text-rose-500 font-bold text-center">{message}</p>}

					<div className="mt-6 flex justify-end gap-3 border-t border-[var(--color-rule)] pt-4">
						<button
							type="button"
							onClick={onClose}
							className="btn-push btn-push-soft text-xs"
							disabled={isSubmitting}
						>
							Hủy
						</button>

						<button
							type="submit"
							className="btn-push btn-push-cyan text-xs"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
