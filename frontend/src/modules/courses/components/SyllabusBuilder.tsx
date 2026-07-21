'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
	getLessonsAction,
	updateCourseStatusAction,
	saveSyllabusBatchAction,
} from '../actions/chapterActions';
import ChapterItem from './ChapterItem';
import { HiOutlineArrowLeft, HiOutlineExclamationTriangle } from 'react-icons/hi2';

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

type Props = {
	courseId: string;
	courseName: string;
	initialChapters: Chapter[];
	initialStatus: string;
};

export default function SyllabusBuilder({ courseId, courseName, initialChapters, initialStatus }: Props) {
	const router = useRouter();
	const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
	const [status, setStatus] = useState(initialStatus);
	const [lessonsMap, setLessonsMap] = useState<{ [chapterId: string]: Lesson[] }>({});
	const [hasChanges, setHasChanges] = useState(false);
	const [isSavingBatch, setIsSavingBatch] = useState(false);

	const [isAddingSection, setIsAddingSection] = useState(false);
	const [newSectionName, setNewSectionName] = useState('');

	useEffect(() => {
		setChapters(initialChapters);
		setHasChanges(false);
	}, [initialChapters]);

	useEffect(() => {
		async function fetchAllLessons() {
			const map: { [key: string]: Lesson[] } = {};
			for (const chapter of chapters) {
				if (chapter._id.startsWith('temp_')) {
					map[chapter._id] = [];
					continue;
				}
				try {
					const res = await getLessonsAction(courseId, chapter._id);
					if (res && res.success !== false && Array.isArray(res.data)) {
						map[chapter._id] = res.data;
					}
				} catch (err) {
					console.error(err);
				}
			}
			setLessonsMap(map);
		}
		fetchAllLessons();
	}, [chapters, courseId]);

	function handleAddSection(e: React.FormEvent) {
		e.preventDefault();
		if (!newSectionName.trim()) return;

		const tempId = `temp_${Date.now()}`;
		const newChapter: Chapter = {
			_id: tempId,
			name: newSectionName.trim(),
			courseId,
		};

		setChapters(prev => [...prev, newChapter]);
		setLessonsMap(prev => ({ ...prev, [tempId]: [] }));
		setNewSectionName('');
		setIsAddingSection(false);
		setHasChanges(true);
		toast.info('Đã thêm chương tạm thời (chưa lưu vào DB).');
	}

	function handleEditChapter(chapterId: string, newName: string) {
		setChapters(prev => prev.map(c => c._id === chapterId ? { ...c, name: newName } : c));
		setHasChanges(true);
		toast.info('Đã sửa chương học tạm thời.');
	}

	function handleDeleteSection(chapterId: string) {
		if (chapters.length <= 1) {
			toast.error('Khóa học phải có nhất 1 chương học, không thể xóa chương duy nhất.');
			return;
		}

		if (!confirm('Bạn có chắc chắn muốn xóa chương này? Toàn bộ bài giảng bên trong sẽ bị xóa tạm thời và chỉ lưu khi bấm nút "Lưu thay đổi".')) return;

		setChapters(prev => prev.filter(c => c._id !== chapterId));
		setLessonsMap(prev => {
			const copy = { ...prev };
			delete copy[chapterId];
			return copy;
		});
		setHasChanges(true);
		toast.info('Đã xóa chương tạm thời.');
	}

	function handleAddLesson(chapterId: string, name: string, isPreviewable: boolean) {
		const tempId = `temp_${Date.now()}`;
		const newLesson: Lesson = {
			_id: tempId,
			lessonName: name,
			duration: 0,
			isPreviewable,
			chapterId,
			courseId,
		};

		setLessonsMap(prev => ({
			...prev,
			[chapterId]: [...(prev[chapterId] || []), newLesson],
		}));
		setHasChanges(true);
		toast.info('Đã thêm bài học tạm thời.');
	}

	function handleEditLesson(chapterId: string, lessonId: string, name: string, isPreviewable: boolean) {
		setLessonsMap(prev => ({
			...prev,
			[chapterId]: (prev[chapterId] || []).map(l => l._id === lessonId ? { ...l, lessonName: name, isPreviewable } : l),
		}));
		setHasChanges(true);
		toast.info('Đã sửa bài học tạm thời.');
	}

	function handleDeleteLesson(chapterId: string, lessonId: string) {
		setLessonsMap(prev => ({
			...prev,
			[chapterId]: (prev[chapterId] || []).filter(l => l._id !== lessonId),
		}));
		setHasChanges(true);
		toast.info('Đã xóa bài học tạm thời.');
	}

	async function handleSaveChanges() {
		setIsSavingBatch(true);
		try {
			const payload = chapters.map(ch => ({
				_id: ch._id,
				name: ch.name,
				lessons: (lessonsMap[ch._id] || []).map(les => ({
					_id: les._id,
					lessonName: les.lessonName,
					isPreviewable: les.isPreviewable,
				})),
			}));

			const res = await saveSyllabusBatchAction(courseId, payload);
			if (res && res.success) {
				toast.success('Đã lưu toàn bộ thay đổi giáo trình thành công!');
				setHasChanges(false);
				router.refresh();
			} else {
				toast.error(res.message || 'Có lỗi xảy ra khi lưu giáo trình.');
			}
		} catch (err) {
			toast.error('Lỗi kết nối mạng.');
		} finally {
			setIsSavingBatch(false);
		}
	}

	async function handlePublishToggle() {
		const targetStatus = status === 'published' ? 'draft' : 'published';

		if (targetStatus === 'published') {
			if (hasChanges) {
				toast.error('Vui lòng bấm "Lưu thay đổi" trước khi xuất bản khóa học!');
				return;
			}

			if (chapters.length === 0) {
				toast.error('Khóa học phải có ít nhất 1 chương học mới có thể xuất bản!');
				return;
			}

			const hasEmptyChapter = chapters.some(c => !lessonsMap[c._id] || lessonsMap[c._id].length === 0);
			if (hasEmptyChapter) {
				toast.error('Mỗi chương học phải có ít nhất 1 bài học mới có thể xuất bản!');
				return;
			}
		}

		try {
			const res = await updateCourseStatusAction(courseId, targetStatus);
			if (res && res.success) {
				setStatus(targetStatus);
				toast.success(targetStatus === 'published' ? 'Khóa học đã được xuất bản công khai!' : 'Khóa học đã được hạ xuống bản nháp.');
			} else {
				toast.error(res.message || 'Không thể cập nhật trạng thái khóa học.');
			}
		} catch (err) {
			toast.error('Lỗi khi cập nhật trạng thái.');
		}
	}

	return (
		<div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] w-full font-sans">
			<div className="w-full min-h-screen">
				{/* Header banner */}
				<div className="border-b border-[var(--color-rule)] px-8 py-5 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div className="flex flex-col gap-1.5">
						<button
							type="button"
							onClick={() => {
								if (hasChanges && !confirm('Bạn có thay đổi chưa lưu. Vẫn muốn rời đi?')) return;
								router.push('/admin/course');
							}}
							className="inline-flex items-center gap-1.5 text-[9px] font-bold font-mono text-[var(--color-muted)] hover:text-[var(--color-accent)] transition cursor-pointer self-start uppercase tracking-wider"
						>
							<HiOutlineArrowLeft className="h-3 w-3" />
							<span>Quay lại khóa học</span>
						</button>
						<div className="flex items-center gap-3">
							<h1 className="text-xl font-extrabold tracking-tight text-[var(--color-ink)] leading-none">Khung chương trình</h1>
							{status === 'published' ? (
								<span className="px-2.5 py-0.5 bg-[var(--color-mint)] text-emerald-800 border border-emerald-600/10 text-[9px] font-bold font-mono uppercase tracking-wider rounded-md">
									Đã xuất bản
								</span>
							) : (
								<span className="px-2.5 py-0.5 bg-[var(--color-paper-3)] text-amber-800 border border-[var(--color-rule)] text-[9px] font-bold font-mono uppercase tracking-wider rounded-md">
									Đang chỉnh sửa
								</span>
							)}
							{hasChanges && (
								<span className="px-2 py-0.5 bg-[var(--color-accent-3)]/10 text-[var(--color-accent-3)] border border-[var(--color-accent-3)]/20 text-[8px] font-bold font-mono uppercase tracking-wider rounded-md animate-pulse">
									Chưa lưu
								</span>
							)}
						</div>
						<p className="text-xs text-[var(--color-muted)] font-medium">
							Khóa học: <span className="font-bold text-[var(--color-ink)]">{courseName}</span>
						</p>
					</div>

					{/* Tool actions */}
					<div className="flex items-center gap-3.5">
						<button
							type="button"
							onClick={handleSaveChanges}
							disabled={!hasChanges || isSavingBatch}
							className="btn-push btn-push-cyan text-xs font-bold"
						>
							{isSavingBatch ? 'Đang lưu...' : 'Lưu thay đổi'}
						</button>
						<button
							type="button"
							onClick={handlePublishToggle}
							className="btn-push btn-push-soft text-xs font-bold"
						>
							{status === 'published' ? 'Hạ xuống Bản nháp' : 'Xuất bản Khóa học'}
						</button>
					</div>
				</div>

				<div className="p-8 space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
					{/* Explainer card */}
					<div className="tactile-card p-5 bg-white text-xs text-[var(--color-muted)] leading-relaxed flex items-center justify-between gap-4">
						<span className="font-medium">Hãy tạo khóa học của bạn theo từng phần (chương), mỗi phần tập trung vào một mục tiêu học tập cụ thể. Sau đó thêm các bài giảng tương ứng.</span>
						{hasChanges && (
							<div className="flex items-center gap-1.5 text-[var(--color-accent-3)] font-bold text-[10px] shrink-0 uppercase tracking-wider font-mono">
								<HiOutlineExclamationTriangle className="h-4.5 w-4.5 text-[var(--color-accent-3)]" />
								<span>Chưa lưu vào Database!</span>
							</div>
						)}
					</div>

					{/* Section Cards */}
					<div className="space-y-6">
						{chapters.map((chapter, index) => (
							<ChapterItem
								key={chapter._id}
								chapter={chapter}
								index={index}
								lessons={lessonsMap[chapter._id] || []}
								chaptersCount={chapters.length}
								onDeleteChapter={handleDeleteSection}
								onEditChapter={handleEditChapter}
								onAddLesson={handleAddLesson}
								onDeleteLesson={handleDeleteLesson}
								onEditLesson={handleEditLesson}
							/>
						))}

						{chapters.length === 0 && !isAddingSection && (
							<div className="tactile-card text-center py-10 bg-white/50 border-dashed border-[var(--color-rule)]">
								<p className="text-xs text-[var(--color-muted)] italic">Chưa có chương học nào được tạo. Nhấp vào nút phía dưới để thêm chương đầu tiên.</p>
							</div>
						)}

						{isAddingSection ? (
							<form onSubmit={handleAddSection} className="tactile-card bg-white p-6 space-y-4">
								<div>
									<label className="block text-[9px] font-bold font-mono uppercase tracking-wider text-[var(--color-muted)] mb-1.5">
										Nhập tiêu đề chương (phần)
									</label>
									<input
										type="text"
										value={newSectionName}
										onChange={e => setNewSectionName(e.target.value)}
										placeholder="Ví dụ: Giới thiệu khóa học"
										className="w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-white px-4 py-2.5 text-xs text-[var(--color-ink)] outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15 shadow-2xs"
										required
										autoFocus
									/>
								</div>
								<div className="flex justify-end gap-2.5">
									<button
										type="button"
										onClick={() => {
											setNewSectionName('');
											setIsAddingSection(false);
										}}
										className="btn-push btn-push-soft !py-1.5 text-xs font-bold"
									>
										Hủy
									</button>
									<button
										type="submit"
										className="btn-push btn-push-cyan !py-1.5 text-xs font-bold"
									>
										Thêm chương
									</button>
								</div>
							</form>
						) : (
							<button
								type="button"
								onClick={() => setIsAddingSection(true)}
								className="btn-push btn-push-soft text-xs font-bold"
							>
								<span>+</span> Chương (Phần)
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
