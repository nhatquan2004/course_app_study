'use client';

import { useState } from 'react';
import Link from 'next/link';
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
			prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
		);
	}

	const labelClassName = 'block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1';
	const inputClassName =
		'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 shadow-xs';

	return (
		<div className="min-h-screen w-full bg-gradient-to-tr from-slate-50 via-blue-50/10 to-slate-100 px-6 py-4 md:py-0 md:h-screen md:overflow-hidden flex items-center justify-center text-slate-800">
			<div className="w-full max-w-2xl mx-auto">
				{/* Main Card */}
				<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
					{/* Header */}
					<div className="border-b border-slate-100 px-8 py-4.5 bg-slate-50/50">
						<p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Admin Area</p>
						<h1 className="mt-0.5 text-xl font-bold text-slate-900">Thêm khóa học mới</h1>
						<p className="mt-1 text-xs text-slate-500">
							Nhập đầy đủ thông tin chi tiết dưới đây để tạo và xuất bản khóa học mới trên hệ thống.
						</p>
					</div>

					{/* Form Body */}
					<form className="px-8 py-5 space-y-4">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{/* Tên khóa học - Full Width */}
							<div className="md:col-span-2">
								<label className={labelClassName}>Tên khóa học</label>
								<input
									className={inputClassName}
									value={name}
									onChange={e => setName(e.target.value)}
									placeholder="Ví dụ: Lập trình Next.js nâng cao"
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
									className="min-h-[38px] w-full rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-800 outline-none transition focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/30 shadow-xs flex flex-wrap items-center gap-1.5 cursor-pointer select-none"
								>
									{selectedCategoryIds.length > 0 ? (
										<div className="flex flex-wrap gap-1">
											{selectedCategoryIds.map(id => {
												const cat = categories.find(c => c._id === id);
												if (!cat) return null;
												return (
													<span
														key={cat._id}
														className="inline-flex items-center gap-1 rounded-md bg-blue-50 pl-2 pr-1 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10"
													>
														{cat.categoryName}
														<button
															type="button"
															onClick={(e) => {
																e.stopPropagation();
																handleCategoryToggle(cat._id);
															}}
															className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-800 transition"
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
									<div className="absolute z-10 w-full mt-1.5 rounded-lg border border-slate-200 bg-white shadow-lg max-h-36 overflow-y-auto p-1.5 space-y-1">
										{categories.map(cat => {
											const isSelected = selectedCategoryIds.includes(cat._id);
											return (
												<div
													key={cat._id}
													onClick={(e) => {
														e.stopPropagation();
														handleCategoryToggle(cat._id);
													}}
													className={`flex items-center justify-between px-3.5 py-2 text-xs rounded-md cursor-pointer select-none transition ${
														isSelected
															? 'bg-blue-50/60 text-blue-700 font-semibold'
															: 'text-slate-700 hover:bg-slate-50'
													}`}
												>
													<span>{cat.categoryName}</span>
													{isSelected && (
														<span className="text-blue-600 font-bold">✓</span>
													)}
												</div>
											);
										})}
										{categories.length === 0 && (
											<p className="text-xs text-slate-400 italic p-3 text-center">Chưa có danh mục nào.</p>
										)}
									</div>
								)}
							</div>
						</div>

						{/* Footer Actions */}
						<div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
							<Link
								href="/"
								className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition active:scale-[0.98]"
							>
								Hủy
							</Link>
							<button
								type="button"
								className="rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 active:scale-[0.98]"
								onClick={async () => {
									const courseData = {
										name: name,
										description: description,
										price: Number(price),
										coverImage: coverImage,
										categoryIds: selectedCategoryIds,
									};

									await createCourseAction(courseData);
								}}>
								Tạo khóa học →
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
