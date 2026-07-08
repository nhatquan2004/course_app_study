'use client';

import { useState } from 'react';
import { createCourseAction } from '@/modules/courses/actions/courseActions';

export default function CreateCourseAdminPage() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [coverImage, setCoverImage] = useState('');
	const [category, setCategory] = useState('');

	return (
		<div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,#0ea5e9_0%,#020617_35%,#020617_100%)] px-6 py-10 text-white">
			<div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center">
				<div className="grid w-full gap-10 rounded-[32px] border border-cyan-400/20 bg-white/10 p-8 shadow-[0_0_60px_rgba(14,165,233,0.25)] backdrop-blur-xl md:grid-cols-2 md:p-12">
					<div className="flex flex-col justify-center">
						<p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
							Admin Course
						</p>

						<h1 className="text-4xl font-bold leading-tight md:text-6xl">Thêm khóa học mới</h1>

						<p className="mt-6 max-w-md text-base leading-7 text-slate-300">
							Tạo khóa học mới với tên, mô tả, giá, hình ảnh cover và phân loại. Dữ liệu sẽ được gửi
							lên Backend NodeJS Express.
						</p>
					</div>

					<form className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl">
						<div className="space-y-5">
							<div>
								<p className="mb-2 text-sm font-medium text-slate-200">Tên khóa học</p>
								<input
									className="w-full rounded-2xl border border-cyan-400/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
									value={name}
									onChange={e => setName(e.target.value)}
									placeholder="Nhập tên khóa học"
								/>
							</div>

							<div>
								<p className="mb-2 text-sm font-medium text-slate-200">Thông tin chi tiết</p>
								<input
									className="w-full rounded-2xl border border-cyan-400/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
									value={description}
									onChange={e => setDescription(e.target.value)}
									placeholder="Nhập thông tin"
								/>
							</div>

							<div>
								<p className="mb-2 text-sm font-medium text-slate-200">Giá khóa học</p>
								<input
									className="w-full rounded-2xl border border-cyan-400/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
									value={price}
									onChange={e => setPrice(e.target.value)}
									placeholder="Nhập giá"
								/>
							</div>

							<div>
								<p className="mb-2 text-sm font-medium text-slate-200">Hình ảnh Cover</p>
								<input
									className="w-full rounded-2xl border border-cyan-400/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
									value={coverImage}
									onChange={e => setCoverImage(e.target.value)}
									placeholder="Nhập link ảnh cover"
								/>
							</div>

							<div>
								<p className="mb-2 text-sm font-medium text-slate-200">Phân loại khóa học</p>
								<input
									className="w-full rounded-2xl border border-cyan-400/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
									value={category}
									onChange={e => setCategory(e.target.value)}
									placeholder="Nhập category"
								/>
							</div>

							<button
								type="button"
								className="mt-3 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-6 py-4 font-bold text-white shadow-[0_0_30px_rgba(14,165,233,0.45)] transition hover:scale-[1.02] hover:from-blue-500 hover:to-cyan-300 active:scale-[0.98]"
								onClick={async () => {
									const courseData = {
										name: name,
										description: description,
										price: Number(price),
										coverImage: coverImage,
										categoryId: Number(category),
									};

									await createCourseAction(courseData);
								}}>
								Create Course →
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
