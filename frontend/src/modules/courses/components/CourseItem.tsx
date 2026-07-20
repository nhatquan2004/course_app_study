'use client';

import type { Course } from '../types';
import { deleteCourseAction } from '../actions/courseActions';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Modal from '@/common/components/Modal';
import EditCourseModal from './EditCourseModal';
import type { Category } from '@/modules/categories/types';

type CourseItemProps = {
	course: Course;
	categories: Category[];
};

export default function CourseItem({ course, categories }: CourseItemProps) {
	const router = useRouter();
	const [openMenu, setOpenMenu] = useState(false);
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
		if (!confirm('Bạn có chắc chắn muốn xóa khóa học này không? Hành động này không thể hoàn tác.')) return;
		setOpenMenu(false);
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
		<div className={`tactile-card w-full h-24 overflow-visible flex items-center pr-5 relative ${openMenu ? 'z-45' : 'z-0'}`}>
			{/* Cover image area */}
			<div className="h-full w-36 bg-[var(--color-paper-2)] relative overflow-hidden flex items-center justify-center shrink-0 border-r border-[var(--color-rule)] rounded-l-[19px]">
				{course.coverImage ? (
					<img src={course.coverImage} alt={course.name} className="object-cover h-full w-full" />
				) : (
					<div className="w-full h-full bg-gradient-to-tr from-[var(--color-accent-2)]/10 to-[var(--color-accent)]/10 flex items-center justify-center">
						<span className="text-[var(--color-accent-2)] text-[10px] font-black uppercase tracking-widest">
							Course App
						</span>
					</div>
				)}
			</div>

			{/* Info Area */}
			<div className="px-5 py-2 flex-1 min-w-0 flex flex-col justify-center">
				<h3 className="text-sm font-black text-[var(--color-ink)] tracking-tight truncate">{course.name}</h3>
				<p className="mt-1 text-xs text-[var(--color-muted)] line-clamp-2">
					{course.description || 'Không có mô tả chi tiết cho khóa học này.'}
				</p>
			</div>

			{/* Price and Status Tags */}
			<div className="flex items-center gap-4 shrink-0">
				<span className="text-xs font-black text-[var(--color-accent-3)] bg-[var(--color-accent-3)]/10 px-3 py-1 rounded-full border border-[var(--color-accent-3)]/20 font-mono">
					{course.price ? Number(course.price).toLocaleString('vi-VN') + ' VNĐ' : 'Miễn phí'}
				</span>

				{course.status === 'published' ? (
					<span className="text-[9px] font-bold text-emerald-800 bg-[var(--color-mint)]/40 border border-emerald-600/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
						Đã xuất bản
					</span>
				) : (
					<span className="text-[9px] font-bold text-amber-800 bg-[var(--color-accent)]/40 border border-amber-600/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
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
							<div className="absolute right-0 mt-2.5 w-44 rounded-xl border border-[var(--color-rule)] bg-white shadow-lg z-30 overflow-hidden py-1">
								<Modal.Open openWindowName="edit-course">
									<button
										type="button"
										onClick={() => setOpenMenu(false)}
										className="w-full px-4 py-2.5 text-left text-xs font-bold text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] transition"
									>
										📝 Sửa thông tin khóa
									</button>
								</Modal.Open>

								<button
									type="button"
									onClick={() => {
										setOpenMenu(false);
										router.push(`/admin/course/${course._id}/syllabus_management`);
									}}
									className="w-full px-4 py-2.5 text-left text-xs font-bold text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] transition"
								>
									📚 Quản lý giáo trình
								</button>

								<button
									type="button"
									onClick={handleDeleteCourse}
									className="w-full px-4 py-2.5 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 transition border-t border-[var(--color-rule)]/50"
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
