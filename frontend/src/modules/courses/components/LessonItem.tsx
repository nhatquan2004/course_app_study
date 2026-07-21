'use client';

import { useState } from 'react';

type Lesson = {
	_id: string;
	lessonName: string;
	duration: number;
	isPreviewable: boolean;
	chapterId: string;
	courseId: string;
};

type LessonItemProps = {
	lesson: Lesson;
	lessonIdx: number;
	onDelete: (lessonId: string) => void;
	onEdit: (lessonId: string, name: string, isPreviewable: boolean) => void;
};

export default function LessonItem({ lesson, lessonIdx, onDelete, onEdit }: LessonItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editName, setEditName] = useState(lesson.lessonName);
	const [editPreviewable, setEditPreviewable] = useState(lesson.isPreviewable);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!editName.trim()) return;
		onEdit(lesson._id, editName.trim(), editPreviewable);
		setIsEditing(false);
	}

	return (
		<div className="p-3 bg-white border border-slate-200/80 rounded-lg hover:border-slate-300 transition-colors">
			{isEditing ? (
				<form onSubmit={handleSubmit} className="space-y-3">
					<div className="flex items-center gap-2">
						<input
							type="text"
							value={editName}
							onChange={e => setEditName(e.target.value)}
							className="flex-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 outline-none focus:border-blue-500"
							required
							autoFocus
						/>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								id={`edit-preview-${lesson._id}`}
								checked={editPreviewable}
								onChange={e => setEditPreviewable(e.target.checked)}
								className="h-3.5 w-3.5 rounded-sm text-blue-600 focus:ring-blue-500 cursor-pointer"
							/>
							<label htmlFor={`edit-preview-${lesson._id}`} className="text-xs text-slate-600 select-none cursor-pointer">
								Cho phép xem trước (Học thử)
							</label>
						</div>
						<div className="flex gap-1.5">
							<button
								type="submit"
								className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-md cursor-pointer"
							>
								OK
							</button>
							<button
								type="button"
								onClick={() => {
									setEditName(lesson.lessonName);
									setEditPreviewable(lesson.isPreviewable);
									setIsEditing(false);
								}}
								className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-slate-600 text-[11px] font-bold rounded-md cursor-pointer"
							>
								Hủy
							</button>
						</div>
					</div>
				</form>
			) : (
				<div className="flex items-center justify-between text-xs">
					<div className="flex items-center gap-2 text-slate-600">
						<span className="text-slate-400 font-bold">✔</span>
						<span>Bài giảng {lessonIdx + 1}: 📄 {lesson.lessonName}</span>
						{lesson._id.startsWith('temp_') && (
							<span className="px-1 bg-rose-50 text-rose-500 border border-rose-100 text-[8px] font-bold uppercase rounded-sm">mới</span>
						)}
						{lesson.isPreviewable && (
							<span className="ml-2 px-1.5 py-0.2 bg-blue-50 text-blue-600 border border-blue-100 text-[9px] font-bold uppercase rounded-sm">
								Học thử
							</span>
						)}
					</div>
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={() => {
								setEditName(lesson.lessonName);
								setEditPreviewable(lesson.isPreviewable);
								setIsEditing(true);
							}}
							className="text-blue-600 hover:text-blue-800 font-semibold text-[10px] cursor-pointer"
						>
							Sửa
						</button>
						<button
							type="button"
							onClick={() => onDelete(lesson._id)}
							className="text-slate-400 hover:text-red-500 font-semibold text-[10px] transition cursor-pointer"
						>
							Xóa
						</button>
						<span className="text-slate-300">▼</span>
					</div>
				</div>
			)}
		</div>
	);
}
