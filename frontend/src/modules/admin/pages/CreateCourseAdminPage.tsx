'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { createCourseAction } from '@/modules/courses/actions/courseActions';
import type { Category } from '@/modules/categories/types';

export default function CreateCourseAdminPage({ categories }: { categories: Category[] }) {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [coverImage, setCoverImage] = useState('');
	const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	function handleCategoryToggle(id: string) {
		setSelectedCategoryIds(prev =>
			prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
		);
	}

	const labelClassName = 'block text-[10px] font-black uppercase tracking-wider text-[var(--color-muted)] mb-1.5';
	const inputClassName =
		'w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white px-3.5 py-2.5 text-xs text-[var(--color-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent-2)]/20 shadow-2xs';

	return (
		<div className="min-h-screen w-full bg-[var(--color-paper-2)] px-6 py-8 md:py-0 md:h-screen md:overflow-hidden flex items-center justify-center text-[var(--color-ink)] font-sans">
			<div className="w-full max-w-2xl mx-auto">
				{/* Main Card */}
				<div className="tactile-card overflow-hidden bg-white">
					{/* Header */}
					<div className="border-b border-[var(--color-rule)] px-8 py-5.5 bg-[var(--color-paper-2)]/50">
						<p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent-2)]">
							Admin Area
						</p>
						<h1 className="mt-1 text-lg font-black text-[var(--color-ink)] tracking-tight">Thêm khóa học mới</h1>
						<p className="mt-1.5 text-xs text-[var(--color-muted)] leading-relaxed">
							Nhập đầy đủ thông tin chi tiết dưới đây để tạo và xuất bản khóa học mới trên hệ thống.
						</p>
					</div>

					{/* Form Body */}
					<form className="px-8 py-6 space-y-4">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{/* Tên khóa học - Full Width */}
							<div className="md:col-span-2">
								<label className={labelClassName}>Tên khóa học</label>
								<input
									className={inputClassName}
									value={name}
									onChange={e => setName(e.target.value)}
									placeholder="Ví dụ: Lập trình Next.js nâng cao"
									required
								/>
							</div>

							{/* Mô tả chi tiết - Full Width (Textarea) */}
							<div className="md:col-span-2">
								<label className={labelClassName}>Mô tả chi tiết</label>
								<textarea
									rows={2}
									className={`${inputClassName} resize-none`}
									value={description}
									onChange={e => setDescription(e.target.value)}
									placeholder="Tóm tắt nội dung chính và mục tiêu của khóa học..."
								/>
							</div>

							{/* Giá khóa học - Column 1 */}
							<div>
								<label className={labelClassName}>Giá khóa học (VNĐ)</label>
								<input
									type="number"
									className={inputClassName}
									value={price}
									onChange={e => setPrice(e.target.value)}
									placeholder="Ví dụ: 299000"
								/>
							</div>

							{/* Link ảnh Cover - Column 2 */}
							<div>
								<label className={labelClassName}>Hình ảnh Cover (URL)</label>
								<input
									className={inputClassName}
									value={coverImage}
									onChange={e => setCoverImage(e.target.value)}
									placeholder="https://example.com/cover.jpg"
								/>
							</div>

							{/* Danh mục khóa học - Custom Multi-Select Dropdown */}
							<div className="md:col-span-2 relative">
								<label className={labelClassName}>Danh mục khóa học (Chọn nhiều)</label>

								{/* Selection Box / Trigger */}
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
										<span className="text-slate-400 text-xs">Chọn danh mục khóa học...</span>
									)}

									{/* Chevron icon */}
									<div className="ml-auto pointer-events-none text-slate-400 font-bold text-[9px]">
										{isDropdownOpen ? '▲' : '▼'}
									</div>
								</div>

								{/* Dropdown Options List */}
								{isDropdownOpen && (
									<div className="absolute z-10 w-full mt-1.5 rounded-xl border border-[var(--color-rule)] bg-white shadow-lg max-h-36 overflow-y-auto p-1.5 space-y-1">
										{categories.map(cat => {
											const isSelected = selectedCategoryIds.includes(cat._id);
											return (
												<div
													key={cat._id}
													onClick={e => {
														e.stopPropagation();
														handleCategoryToggle(cat._id);
													}}
													className={`flex items-center justify-between px-3.5 py-2 text-xs rounded-lg cursor-pointer select-none transition ${isSelected
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

						{/* Footer Actions */}
						<div className="flex items-center justify-end gap-3.5 border-t border-[var(--color-rule)] pt-4">
							<Link
								href="/"
								className="btn-push btn-push-soft text-xs"
							>
								Hủy
							</Link>
							<button
								type="button"
								className="btn-push btn-push-cyan text-xs"
								onClick={async () => {
									if (!name.trim()) {
										toast.error('Vui lòng nhập tên khóa học');
										return;
									}
									const courseData = {
										name: name,
										description: description,
										price: Number(price) || 0,
										coverImage: coverImage,
										categoryIds: selectedCategoryIds,
									};
									try {
										await createCourseAction(courseData);
									} catch (err: any) {
										// Next.js redirect throws an error under the hood, let it pass if it's redirect
										if (err.message !== 'NEXT_REDIRECT') {
											toast.error('Lỗi khi tạo khóa học.');
										}
									}
								}}
							>
								Tạo khóa học →
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
