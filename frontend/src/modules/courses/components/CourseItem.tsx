'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Course } from '../types';
import type { Category } from '@/modules/categories/types';
import { deleteCourseAction } from '../actions/courseActions';
import EditCourseModal from './EditCourseModal';
import Modal from '@/common/components/Modal';
import { toast } from 'react-toastify';

type Props = {
	course: Course;
	categories: Category[];
};

export default function CourseItem({ course, categories }: Props) {
	const router = useRouter();
	const [openMenu, setOpenMenu] = useState(false);
	const [imageError, setImageError] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpenMenu(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	async function handleDeleteCourse() {
		if (!confirm(`Bạn có chắc chắn muốn xóa khóa học "${course.name}"?`)) return;

		try {
			const data = await deleteCourseAction(course._id);
			if (data && data.success !== false) {
				toast.success(data.message || 'Xóa khóa học thành công');
				router.refresh();
			} else {
				toast.error(data.message || 'Xóa khóa học thất bại');
			}
		} catch (err) {
			toast.error('Lỗi kết nối mạng.');
		}
	}

	return (
		<div className={`tactile-card w-full h-28 overflow-visible flex items-center pr-6 relative ${openMenu ? 'z-45' : 'z-0'}`}>
			{/* Cover image area */}
			<div className="h-full w-40 bg-[var(--color-paper-2)] relative overflow-hidden flex items-center justify-center shrink-0 border-r-2 border-[var(--color-rule)] rounded-l-[19px]">
				{course.coverImage && !imageError ? (
					<img
						src={course.coverImage}
						alt={course.name}
						onError={() => setImageError(true)}
						className="object-cover h-full w-full"
					/>
				) : (
					<div className="w-full h-full bg-gradient-to-tr from-[var(--color-accent-2)]/10 to-[var(--color-accent)]/10 flex flex-col items-center justify-center p-2 text-center">
						<span className="text-[var(--color-accent-2)] text-[10px] font-black uppercase tracking-widest leading-none">
							Course
						</span>
						<span className="text-[var(--color-ink)] text-[14px] font-black uppercase tracking-tight mt-1 truncate max-w-full">
							{course.name.substring(0, 3)}
						</span>
					</div>
				)}
			</div>

			{/* Info Area */}
			<div className="px-6 py-2 flex-1 min-w-0 flex flex-col justify-center">
				<h3 className="text-sm font-black text-[var(--color-ink)] tracking-tight truncate leading-snug">{course.name}</h3>
				<p className="mt-1 text-xs text-[var(--color-muted)] line-clamp-2 leading-relaxed">
					{course.description || 'Không có mô tả chi tiết cho khóa học này.'}
				</p>
			</div>

			{/* Price and Status Tags */}
			<div className="flex items-center gap-4 shrink-0">
				<span className="text-xs font-black text-[var(--color-accent-3)] bg-[var(--color-accent-3)]/10 px-3 py-1.5 rounded-lg border border-[var(--color-accent-3)]/20 font-mono shadow-2xs">
					{course.price ? Number(course.price).toLocaleString('vi-VN') + ' VNĐ' : 'Miễn phí'}
				</span>

				{course.status === 'published' ? (
					<span className="text-[9px] font-black text-emerald-800 bg-[var(--color-mint)]/35 border border-emerald-600/20 px-2.5 py-1.5 rounded-lg uppercase tracking-wider shadow-2xs">
						Đã xuất bản
					</span>
				) : (
					<span className="text-[9px] font-black text-amber-800 bg-[var(--color-accent)]/35 border border-amber-600/20 px-2.5 py-1.5 rounded-lg uppercase tracking-wider shadow-2xs">
						Nháp
					</span>
				)}

				{/* Options Actions Dropdown */}
				<Modal>
					<div className="relative" ref={menuRef}>
						<button
							type="button"
							onClick={() => setOpenMenu(prev => !prev)}
							className="btn-push btn-push-soft !p-2 !w-9 !h-9 text-[var(--color-muted)] font-black text-sm"
						>
							⋮
						</button>

						{openMenu && (
							<div className="absolute right-0 mt-2.5 w-48 rounded-xl border-2 border-[var(--color-ink)] bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] z-30 overflow-hidden py-1">
								<Modal.Open openWindowName="edit-course">
									<button
										type="button"
										onClick={() => setOpenMenu(false)}
										className="w-full px-4 py-2.5 text-left text-xs font-black text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] transition uppercase tracking-wider"
									>
										📝 Sửa thông tin
									</button>
								</Modal.Open>

								<button
									type="button"
									onClick={() => {
										setOpenMenu(false);
										router.push(`/admin/course/${course._id}/syllabus_management`);
									}}
									className="w-full px-4 py-2.5 text-left text-xs font-black text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] transition uppercase tracking-wider"
								>
									📚 Quản lý giáo trình
								</button>

								<button
									type="button"
									onClick={handleDeleteCourse}
									className="w-full px-4 py-2.5 text-left text-xs font-black text-rose-600 hover:bg-rose-50 transition border-t-2 border-[var(--color-rule)] uppercase tracking-wider"
								>
									🗑️ Xóa khóa học
								</button>
							</div>
						)}
					</div>

					<Modal.Window name="edit-course">
						<EditCourseModal course={course} categories={categories} />
					</Modal.Window>
				</Modal>
			</div>
		</div>
	);
}
