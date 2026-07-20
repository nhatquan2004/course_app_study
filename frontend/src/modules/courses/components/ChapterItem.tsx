'use client';

import { useState } from 'react';
import LessonItem from './LessonItem';

type Chapter = {
	_id: string;
	name: string;
	totalDuration?: number;
	totalLessons?: number;
	courseId: string;
};

type Lesson = {
	_id: string;
	lessonName: string;
	duration: number;
	isPreviewable: boolean;
	chapterId: string;
	courseId: string;
};

type ChapterItemProps = {
	chapter: Chapter;
	index: number;
	lessons: Lesson[];
	chaptersCount: number;
	onDeleteChapter: (chapterId: string) => void;
	onEditChapter: (chapterId: string, newName: string) => void;
	onAddLesson: (chapterId: string, name: string, isPreviewable: boolean) => void;
	onDeleteLesson: (chapterId: string, lessonId: string) => void;
	onEditLesson: (chapterId: string, lessonId: string, name: string, isPreviewable: boolean) => void;
};

export default function ChapterItem({
	chapter,
	index,
	lessons,
	chaptersCount,
	onDeleteChapter,
	onEditChapter,
	onAddLesson,
	onDeleteLesson,
	onEditLesson,
}: ChapterItemProps) {
	const [isEditingChapterName, setIsEditingChapterName] = useState(false);
	const [editChapterName, setEditChapterName] = useState(chapter.name);

	const [isAddingLesson, setIsAddingLesson] = useState(false);
	const [newLessonName, setNewLessonName] = useState('');
	const [newLessonPreviewable, setNewLessonPreviewable] = useState(false);

	function handleEditChapterSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!editChapterName.trim()) return;
		onEditChapter(chapter._id, editChapterName.trim());
		setIsEditingChapterName(false);
	}

	function handleAddLessonSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!newLessonName.trim()) return;
		onAddLesson(chapter._id, newLessonName.trim(), newLessonPreviewable);
		setNewLessonName('');
		setNewLessonPreviewable(false);
		setIsAddingLesson(false);
	}

	return (
		<div className="tactile-card bg-white p-6 relative">
			<div className="flex items-center justify-between gap-4 mb-5">
				{isEditingChapterName ? (
					<form onSubmit={handleEditChapterSubmit} className="flex items-center gap-2 flex-1 max-w-lg">
						<input
							type="text"
							value={editChapterName}
							onChange={e => setEditChapterName(e.target.value)}
							className="flex-1 rounded-[var(--radius-input)] border border-[var(--color-rule)] px-3 py-2 text-xs text-[var(--color-ink)] outline-none focus:border-[var(--color-accent-2)]"
							required
							autoFocus
						/>
						<button
							type="submit"
							className="btn-push btn-push-cyan !py-1.5 !px-3 text-xs"
						>
							OK
						</button>
						<button
							type="button"
							onClick={() => {
								setEditChapterName(chapter.name);
								setIsEditingChapterName(false);
							}}
							className="btn-push btn-push-soft !py-1.5 !px-3 text-xs"
						>
							Hủy
						</button>
					</form>
				) : (
					<div className="flex items-center gap-2.5">
						<span className="text-[10px] font-black text-[var(--color-ink)] bg-[var(--color-paper-2)] px-2.5 py-1 rounded-lg border border-[var(--color-rule)] uppercase tracking-wider">
							Phần {index + 1}:
						</span>
						<span className="text-xs font-black text-[var(--color-ink)]">
							📄 {chapter.name}
						</span>
						{chapter._id.startsWith('temp_') && (
							<span className="text-[8px] font-black text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-md border border-rose-100 uppercase tracking-wider">mới</span>
						)}
						<button
							type="button"
							onClick={() => {
								setEditChapterName(chapter.name);
								setIsEditingChapterName(true);
							}}
							className="text-[10px] text-[var(--color-accent-2)] hover:text-blue-800 font-bold ml-1.5 cursor-pointer uppercase tracking-wider"
						>
							Sửa tên
						</button>
					</div>
				)}

				{chaptersCount > 1 && (
					<button
						type="button"
						onClick={() => onDeleteChapter(chapter._id)}
						className="text-xs text-rose-500 hover:text-rose-700 font-bold transition cursor-pointer uppercase tracking-wider"
					>
						Xóa chương
					</button>
				)}
			</div>

			<div className="space-y-3.5 pl-4 border-l-2 border-[var(--color-rule)]">
				{lessons.map((lesson, lessonIdx) => (
					<LessonItem
						key={lesson._id}
						lesson={lesson}
						lessonIdx={lessonIdx}
						onDelete={(lessonId) => onDeleteLesson(chapter._id, lessonId)}
						onEdit={(lessonId, name, isPreviewable) => onEditLesson(chapter._id, lessonId, name, isPreviewable)}
					/>
				))}

				{lessons.length === 0 && !isAddingLesson && (
					<p className="text-[11px] text-[var(--color-muted)] italic py-1">Chưa có bài học nào trong chương này.</p>
				)}

				{isAddingLesson ? (
					<form onSubmit={handleAddLessonSubmit} className="mt-3 p-5 bg-[var(--color-paper-2)]/30 border border-[var(--color-rule)] rounded-xl space-y-4">
						<div>
							<label className="block text-[9px] font-black uppercase tracking-wider text-[var(--color-muted)] mb-1.5">
								Tiêu đề bài học
							</label>
							<input
								type="text"
								value={newLessonName}
								onChange={e => setNewLessonName(e.target.value)}
								placeholder="Ví dụ: Cài đặt môi trường"
								className="w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white px-3 py-2 text-xs text-[var(--color-ink)] outline-none transition focus:border-[var(--color-accent-2)] focus:ring-2 focus:ring-[var(--color-accent-2)]/20 shadow-2xs"
								required
								autoFocus
							/>
						</div>

						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								id={`previewable-${chapter._id}`}
								checked={newLessonPreviewable}
								onChange={e => setNewLessonPreviewable(e.target.checked)}
								className="h-4 w-4 rounded-sm border-[var(--color-rule)] text-[var(--color-accent-2)] focus:ring-[var(--color-accent-2)] cursor-pointer"
							/>
							<label htmlFor={`previewable-${chapter._id}`} className="text-xs text-[var(--color-muted)] font-bold select-none cursor-pointer">
								Cho phép xem trước (Học thử miễn phí)
							</label>
						</div>

						<div className="flex justify-end gap-2.5 pt-1.5">
							<button
								type="button"
								onClick={() => {
									setNewLessonName('');
									setNewLessonPreviewable(false);
									setIsAddingLesson(false);
								}}
								className="btn-push btn-push-soft !py-1.5 !px-3 text-xs"
							>
								Hủy
							</button>
							<button
								type="submit"
								className="btn-push btn-push-cyan !py-1.5 !px-3 text-xs"
							>
								Thêm bài học
							</button>
						</div>
					</form>
				) : (
					<button
						type="button"
						onClick={() => {
							setNewLessonName('');
							setNewLessonPreviewable(false);
							setIsAddingLesson(true);
						}}
						className="btn-push btn-push-soft !py-1.5 !px-4 text-[11px] mt-1"
					>
						<span>+</span> Thêm bài học
					</button>
				)}
			</div>
		</div>
	);
}
