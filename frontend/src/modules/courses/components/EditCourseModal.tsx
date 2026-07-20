'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Course } from '../types';
import { updateCourseAction } from '../actions/courseActions';
import type { Category } from '@/modules/categories/types';
import { toast } from 'react-toastify';

type Props = {
	course: Course;
	categories: Category[];
	onCloseModal?: () => void;
};

export default function EditCourseModal({ course, categories, onCloseModal }: Props) {
	const handleClose = onCloseModal || (() => {});
	const router = useRouter();
	const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
		course.categoryIds || [],
	);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [form, setForm] = useState({
		name: course.name,
		description: course.description || '',
		price: String(course.price),
		coverImage: course.coverImage ?? '',
	});

	function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	}

	function handleCategoryToggle(id: string) {
		setSelectedCategoryIds(prev =>
			prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
		);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (isSubmitting) return;

		setIsSubmitting(true);

		try {
			const payload = {
				name: form.name,
				description: form.description,
				price: Number(form.price) || 0,
				coverImage: form.coverImage,
				categoryIds: selectedCategoryIds,
			};

			const data = await updateCourseAction(course._id, payload);
			if (data && data.success !== false) {
				toast.success(data.message || 'Cập nhật khóa học thành công!');
				router.refresh();
				handleClose();
			} else {
				toast.error(data.message || 'Cập nhật thất bại!');
			}
		} catch (err) {
			toast.error('Lỗi khi lưu thông tin.');
		} finally {
			setIsSubmitting(false);
		}
	}

	const labelClassName = 'block text-[10px] font-black uppercase tracking-wider text-[var(--color-muted)] mb-1.5';
	const inputClassName =
		'w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white px-3.5 py-2.5 text-xs text-[var(--color-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent-2)]/20 shadow-2xs';

	return (
		<form onSubmit={handleSubmit} className="w-full text-[var(--color-ink)] font-sans">
			<h2 className="mb-6 text-base font-black tracking-tight text-[var(--color-ink)] uppercase tracking-wider text-[var(--color-accent-2)]">
				Sửa thông tin khóa
			</h2>

			<div className="flex flex-col gap-4">
				{/* Tên khóa học */}
				<div>
					<label className={labelClassName}>Tên khóa học</label>
					<input
						name="name"
						value={form.name}
						onChange={handleChange}
						placeholder="Tên khóa học"
						className={inputClassName}
						required
					/>
				</div>

				{/* Mô tả */}
				<div>
					<label className={labelClassName}>Mô tả</label>
					<textarea
						name="description"
						value={form.description}
						onChange={handleChange}
						placeholder="Nhập mô tả khóa học..."
						rows={3}
						className={`${inputClassName} resize-none`}
						required
					/>
				</div>

				{/* Giá & Ảnh Cover (2 cột) */}
				<div className="grid grid-cols-2 gap-3">
					<div>
						<label className={labelClassName}>Giá (VNĐ)</label>
						<input
							name="price"
							value={form.price}
							onChange={handleChange}
							placeholder="Giá"
							className={inputClassName}
							required
						/>
					</div>

					<div>
						<label className={labelClassName}>Ảnh cover (URL)</label>
						<input
							name="coverImage"
							value={form.coverImage}
							onChange={handleChange}
							placeholder="Ảnh cover URL"
							className={inputClassName}
						/>
					</div>
				</div>

				{/* Phân loại khóa học */}
				<div className="relative">
					<label className={labelClassName}>Phân loại khóa học (Chọn nhiều)</label>

					<div
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						className="min-h-10 w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white px-3.5 py-1.5 text-xs text-[var(--color-ink)] outline-none transition focus-within:border-[var(--color-accent-2)] focus-within:ring-2 focus-within:ring-[var(--color-accent-2)]/20 shadow-2xs flex flex-wrap items-center gap-1.5 cursor-pointer select-none"
					>
						{selectedCategoryIds.length > 0 ? (
							<div className="flex flex-wrap gap-1">
								{selectedCategoryIds.map(id => {
									const cat = categories.find(c => c._id === id);
									if (!cat) return null;
									return (
										<span
											key={cat._id}
											className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-accent-2)]/10 pl-2 pr-1.5 py-0.5 text-xs font-bold text-[var(--color-accent-2)] border border-[var(--color-accent-2)]/20"
										>
											{cat.categoryName}
											<button
												type="button"
												onClick={e => {
													e.stopPropagation();
													handleCategoryToggle(cat._id);
												}}
												className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-[var(--color-accent-2)]/20 transition"
											>
												✕
											</button>
										</span>
									);
								})}
							</div>
						) : (
							<span className="text-slate-400 text-xs">Chọn phân loại...</span>
						)}

						<div className="ml-auto pointer-events-none text-slate-400 text-[9px] font-bold">
							{isDropdownOpen ? '▲' : '▼'}
						</div>
					</div>

					{isDropdownOpen && (
						<div className="absolute z-50 w-full mt-1.5 rounded-xl border border-[var(--color-rule)] bg-white shadow-lg max-h-40 overflow-y-auto p-1.5 space-y-1">
							{categories.map(cat => {
								const isSelected = selectedCategoryIds.includes(cat._id);
								return (
									<div
										key={cat._id}
										onClick={e => {
											e.stopPropagation();
											handleCategoryToggle(cat._id);
										}}
										className={`flex items-center justify-between px-3.5 py-2 text-xs rounded-lg cursor-pointer select-none transition ${
											isSelected
												? 'bg-[var(--color-accent-2)]/10 text-[var(--color-accent-2)] font-bold'
												: 'text-slate-700 hover:bg-[var(--color-paper-2)]'
										}`}
									>
										<span>{cat.categoryName}</span>
										{isSelected && <span className="text-[var(--color-accent-2)] font-bold">✓</span>}
									</div>
								);
							})}
							{categories.length === 0 && (
								<p className="text-xs text-slate-400 italic p-3 text-center">
									Chưa có danh mục nào.
								</p>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Actions Footer */}
			<div className="mt-6 flex justify-end gap-3 border-t border-[var(--color-rule)] pt-4">
				<button
					type="button"
					onClick={handleClose}
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
	);
}
