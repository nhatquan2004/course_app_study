'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
	createChapterAction,
	deleteChapterAction,
	updateChapterAction,
	getLessonsAction,
	createLessonAction,
	deleteLessonAction,
	updateLessonAction,
	updateCourseStatusAction,
} from '../actions/chapterActions';

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

	const [isAddingSection, setIsAddingSection] = useState(false);
	const [newSectionName, setNewSectionName] = useState('');
	const [isSubmittingSection, setIsSubmittingSection] = useState(false);

	const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
	const [editChapterName, setEditChapterName] = useState('');
	const [isSavingChapter, setIsSavingChapter] = useState(false);

	const [activeAddLessonChapterId, setActiveAddLessonChapterId] = useState<string | null>(null);
	const [newLessonName, setNewLessonName] = useState('');
	const [newLessonPreviewable, setNewLessonPreviewable] = useState(false);
	const [isSubmittingLesson, setIsSubmittingLesson] = useState(false);

	const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
	const [editLessonName, setEditLessonName] = useState('');
	const [editLessonPreviewable, setEditLessonPreviewable] = useState(false);
	const [isSavingLesson, setIsSavingLesson] = useState(false);

	useEffect(() => {
		async function fetchAllLessons() {
			const map: { [key: string]: Lesson[] } = {};
			for (const chapter of chapters) {
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

	async function handleAddSection(e: React.FormEvent) {
		e.preventDefault();
		if (!newSectionName.trim() || isSubmittingSection) return;

		setIsSubmittingSection(true);
		try {
			const res = await createChapterAction(courseId, newSectionName.trim());
			if (res && res.success !== false) {
				toast.success('Thêm chương thành công!');
				if (res.data) {
					setChapters(prev => [...prev, res.data]);
				} else {
					router.refresh();
				}
				setNewSectionName('');
				setIsAddingSection(false);
			} else {
				toast.error(res?.message || 'Có lỗi xảy ra khi tạo chương.');
			}
		} catch (err) {
			toast.error('Lỗi kết nối mạng.');
		} finally {
			setIsSubmittingSection(false);
		}
	}

	async function handleEditSectionSubmit(e: React.FormEvent, chapterId: string) {
		e.preventDefault();
		if (!editChapterName.trim() || isSavingChapter) return;

		setIsSavingChapter(true);
		try {
			const res = await updateChapterAction(courseId, chapterId, editChapterName.trim());
			if (res && res.success !== false) {
				toast.success('Cập nhật chương thành công!');
				setChapters(prev => prev.map(c => c._id === chapterId ? { ...c, name: res.data?.name || editChapterName.trim() } : c));
				setEditingChapterId(null);
			} else {
				toast.error(res?.message || 'Có lỗi xảy ra khi cập nhật chương.');
			}
		} catch (err) {
			toast.error('Lỗi kết nối.');
		} finally {
			setIsSavingChapter(false);
		}
	}

	async function handleDeleteSection(chapterId: string) {
		if (chapters.length <= 1) {
			toast.error('Khóa học phải có ít nhất 1 chương học, không thể xóa chương duy nhất.');
			return;
		}

		if (!confirm('Bạn có chắc chắn muốn xóa chương này? Tất cả bài học bên trong cũng sẽ bị ảnh hưởng.')) return;

		try {
			const res = await deleteChapterAction(courseId, chapterId);
			if (res && res.success !== false) {
				toast.success('Xóa chương thành công!');
				setChapters(prev => prev.filter(c => c._id !== chapterId));
			} else {
				toast.error(res?.message || 'Không thể xóa chương.');
			}
		} catch (err) {
			toast.error('Lỗi khi xóa chương.');
		}
	}

	async function handleAddLesson(e: React.FormEvent, chapterId: string) {
		e.preventDefault();
		if (!newLessonName.trim() || isSubmittingLesson) return;

		setIsSubmittingLesson(true);
		try {
			const res = await createLessonAction(courseId, chapterId, newLessonName.trim(), newLessonPreviewable);
			if (res && res.success !== false) {
				toast.success('Thêm bài học thành công!');
				const newLesson = res.data;
				if (newLesson) {
					setLessonsMap(prev => ({
						...prev,
						[chapterId]: [...(prev[chapterId] || []), newLesson],
					}));
				}
				setNewLessonName('');
				setNewLessonPreviewable(false);
				setActiveAddLessonChapterId(null);
			} else {
				toast.error(res?.message || 'Có lỗi xảy ra khi tạo bài học.');
			}
		} catch (err) {
			toast.error('Lỗi kết nối mạng.');
		} finally {
			setIsSubmittingLesson(false);
		}
	}

	async function handleEditLessonSubmit(e: React.FormEvent, chapterId: string, lessonId: string) {
		e.preventDefault();
		if (!editLessonName.trim() || isSavingLesson) return;

		setIsSavingLesson(true);
		try {
			const res = await updateLessonAction(courseId, chapterId, lessonId, {
				lessonName: editLessonName.trim(),
				isPreviewable: editLessonPreviewable,
			});
			if (res && res.success !== false) {
				toast.success('Cập nhật bài học thành công!');
				setLessonsMap(prev => ({
					...prev,
					[chapterId]: (prev[chapterId] || []).map(l => l._id === lessonId ? { ...l, lessonName: editLessonName.trim(), isPreviewable: editLessonPreviewable } : l),
				}));
				setEditingLessonId(null);
			} else {
				toast.error(res?.message || 'Có lỗi xảy ra khi sửa bài học.');
			}
		} catch (err) {
			toast.error('Lỗi kết nối.');
		} finally {
			setIsSavingLesson(false);
		}
	}

	async function handleDeleteLesson(chapterId: string, lessonId: string) {
		if (!confirm('Bạn có chắc chắn muốn xóa bài học này?')) return;

		try {
			const res = await deleteLessonAction(courseId, chapterId, lessonId);
			if (res && res.success !== false) {
				toast.success('Xóa bài học thành công!');
				setLessonsMap(prev => ({
					...prev,
					[chapterId]: (prev[chapterId] || []).filter(l => l._id !== lessonId),
				}));
			} else {
				toast.error(res?.message || 'Không thể xóa bài học.');
			}
		} catch (err) {
			toast.error('Lỗi khi xóa bài học.');
		}
	}

	async function handlePublishToggle() {
		const targetStatus = status === 'published' ? 'draft' : 'published';

		if (targetStatus === 'published') {
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
		<div className="min-h-screen bg-white text-slate-800 w-full">
			<div className="w-full min-h-screen bg-white overflow-hidden">
				
				<div className="border-b border-slate-200/80 px-6 py-5 bg-slate-50/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div className="flex flex-col gap-2">
						<button
							type="button"
							onClick={() => router.push('/admin/course')}
							className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer self-start"
						>
							← Quay lại danh sách khóa học
						</button>
						<div className="flex items-center gap-2.5">
							<h1 className="text-lg font-bold text-slate-900">Khung chương trình</h1>
							{status === 'published' ? (
								<span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 text-[10px] font-bold uppercase rounded-md">
									Đã xuất bản
								</span>
							) : (
								<span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 text-[10px] font-bold uppercase rounded-md">
									Đang chỉnh sửa
								</span>
							)}
						</div>
						<p className="text-xs text-slate-400">Khóa học: <span className="font-semibold text-slate-600">{courseName}</span></p>
					</div>

					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={handlePublishToggle}
							className={`px-4 py-2 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${
								status === 'published'
									? 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:scale-98'
									: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm active:scale-98'
							}`}
						>
							{status === 'published' ? 'Hạ xuống Bản nháp' : 'Xuất bản Khóa học'}
						</button>
					</div>
				</div>

				<div className="p-6 space-y-6">
					
					<div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl text-xs text-slate-500 leading-relaxed">
						Hãy tạo khóa học của bạn theo từng phần (chương), mỗi phần tập trung vào một mục tiêu học tập cụ thể. Sau đó thêm nội dung, hoạt động thực hành và các bài đánh giá.
					</div>

					<div className="space-y-6">
						{chapters.map((chapter, index) => {
							const lessons = lessonsMap[chapter._id] || [];
							const isAddingLesson = activeAddLessonChapterId === chapter._id;
							const isEditingChapter = editingChapterId === chapter._id;

							return (
								<div
									key={chapter._id}
									className="border border-slate-200 bg-slate-50/20 rounded-xl p-5 hover:border-slate-300 transition-colors relative"
								>
									<div className="flex items-center justify-between gap-4 mb-4">
										
										{isEditingChapter ? (
											<form onSubmit={(e) => handleEditSectionSubmit(e, chapter._id)} className="flex items-center gap-2 flex-1 max-w-lg">
												<input
													type="text"
													value={editChapterName}
													onChange={e => setEditChapterName(e.target.value)}
													className="flex-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 outline-none focus:border-blue-500"
													required
													autoFocus
													disabled={isSavingChapter}
												/>
												<button
													type="submit"
													className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-md cursor-pointer"
													disabled={isSavingChapter}
												>
													Lưu
												</button>
												<button
													type="button"
													onClick={() => setEditingChapterId(null)}
													className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-slate-600 text-[11px] font-bold rounded-md cursor-pointer"
													disabled={isSavingChapter}
												>
													Hủy
												</button>
											</form>
										) : (
											<div className="flex items-center gap-2">
												<span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-sm">
													Phần {index + 1}:
												</span>
												<span className="text-xs font-bold text-slate-700">
													📄 {chapter.name}
												</span>
												<button
													type="button"
													onClick={() => {
														setEditChapterName(chapter.name);
														setEditingChapterId(chapter._id);
													}}
													className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold cursor-pointer ml-1"
												>
													Sửa tên
												</button>
											</div>
										)}

										{chapters.length > 1 && (
											<button
												type="button"
												onClick={() => handleDeleteSection(chapter._id)}
												className="text-xs text-red-500 hover:text-red-700 font-semibold transition cursor-pointer"
											>
												Xóa
											</button>
										)}
									</div>

									<div className="space-y-2 pl-4 border-l-2 border-slate-100">
										{lessons.map((lesson, lessonIdx) => {
											const isEditingLesson = editingLessonId === lesson._id;

											return (
												<div
													key={lesson._id}
													className="p-3 bg-white border border-slate-200/80 rounded-lg hover:border-slate-300 transition-colors"
												>
													{isEditingLesson ? (
														<form onSubmit={(e) => handleEditLessonSubmit(e, chapter._id, lesson._id)} className="space-y-3">
															<div className="flex items-center gap-2">
																<input
																	type="text"
																	value={editLessonName}
																	onChange={e => setEditLessonName(e.target.value)}
																	className="flex-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 outline-none focus:border-blue-500"
																	required
																	autoFocus
																	disabled={isSavingLesson}
																/>
															</div>
															<div className="flex items-center justify-between">
																<div className="flex items-center gap-2">
																	<input
																		type="checkbox"
																		id={`edit-preview-${lesson._id}`}
																		checked={editLessonPreviewable}
																		onChange={e => setEditLessonPreviewable(e.target.checked)}
																		className="h-3.5 w-3.5 rounded-sm text-blue-600 focus:ring-blue-500 cursor-pointer"
																		disabled={isSavingLesson}
																	/>
																	<label htmlFor={`edit-preview-${lesson._id}`} className="text-xs text-slate-600 select-none cursor-pointer">
																		Cho phép xem trước (Học thử)
																	</label>
																</div>
																<div className="flex gap-1.5">
																	<button
																		type="submit"
																		className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-md cursor-pointer"
																		disabled={isSavingLesson}
																	>
																		Lưu
																	</button>
																	<button
																		type="button"
																		onClick={() => setEditingLessonId(null)}
																		className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-slate-600 text-[11px] font-bold rounded-md cursor-pointer"
																		disabled={isSavingLesson}
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
																		setEditLessonName(lesson.lessonName);
																		setEditLessonPreviewable(lesson.isPreviewable);
																		setEditingLessonId(lesson._id);
																	}}
																	className="text-blue-600 hover:text-blue-800 font-semibold text-[10px] cursor-pointer"
																>
																	Sửa
																</button>
																<button
																	type="button"
																	onClick={() => handleDeleteLesson(chapter._id, lesson._id)}
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
										})}

										{lessons.length === 0 && !isAddingLesson && (
											<p className="text-[11px] text-slate-400 italic py-1">Chưa có bài học nào trong chương này.</p>
										)}

										{isAddingLesson ? (
											<form onSubmit={(e) => handleAddLesson(e, chapter._id)} className="mt-3 p-4 bg-white border border-slate-200 rounded-lg space-y-3.5">
												<div>
													<label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
														Tiêu đề bài học
													</label>
													<input
														type="text"
														value={newLessonName}
														onChange={e => setNewLessonName(e.target.value)}
														placeholder="Ví dụ: Cài đặt môi trường"
														className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
														required
														autoFocus
														disabled={isSubmittingLesson}
													/>
												</div>

												<div className="flex items-center gap-2">
													<input
														type="checkbox"
														id={`previewable-${chapter._id}`}
														checked={newLessonPreviewable}
														onChange={e => setNewLessonPreviewable(e.target.checked)}
														className="h-3.5 w-3.5 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
														disabled={isSubmittingLesson}
													/>
													<label htmlFor={`previewable-${chapter._id}`} className="text-xs text-slate-600 select-none cursor-pointer">
														Cho phép xem trước (Học thử miễn phí)
													</label>
												</div>

												<div className="flex justify-end gap-2 pt-1.5">
													<button
														type="button"
														onClick={() => {
															setNewLessonName('');
															setNewLessonPreviewable(false);
															setActiveAddLessonChapterId(null);
														}}
														className="px-2.5 py-1 border border-slate-200 rounded-md text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
														disabled={isSubmittingLesson}
													>
														Hủy
													</button>
													<button
														type="submit"
														className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-md text-[11px] font-bold text-white shadow-xs transition cursor-pointer"
														disabled={isSubmittingLesson}
													>
														{isSubmittingLesson ? 'Đang thêm...' : 'Thêm bài học'}
													</button>
												</div>
											</form>
										) : (
											<button
												type="button"
												onClick={() => {
													setNewLessonName('');
													setNewLessonPreviewable(false);
													setActiveAddLessonChapterId(chapter._id);
												}}
												className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer flex items-center gap-1"
											>
												<span>+</span> Thêm bài học
											</button>
										)}
									</div>
								</div>
							);
						})}

						{chapters.length === 0 && !isAddingSection && (
							<div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/20">
								<p className="text-xs text-slate-400">Chưa có chương học nào được tạo. Nhấp vào nút phía dưới để thêm chương đầu tiên.</p>
							</div>
						)}

						{isAddingSection ? (
							<form onSubmit={handleAddSection} className="border border-slate-200 bg-white rounded-xl p-5 space-y-4">
								<div>
									<label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
										Nhập tiêu đề chương (phần)
									</label>
									<input
										type="text"
										value={newSectionName}
										onChange={e => setNewSectionName(e.target.value)}
										placeholder="Ví dụ: Giới thiệu khóa học"
										className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-xs text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 shadow-xs"
										required
										autoFocus
										disabled={isSubmittingSection}
									/>
								</div>
								<div className="flex justify-end gap-2.5">
									<button
										type="button"
										onClick={() => {
											setNewSectionName('');
											setIsAddingSection(false);
										}}
										className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition cursor-pointer"
										disabled={isSubmittingSection}
									>
										Hủy
									</button>
									<button
										type="submit"
										className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-bold text-white shadow-xs active:scale-95 transition cursor-pointer disabled:opacity-50"
										disabled={isSubmittingSection}
									>
										{isSubmittingSection ? 'Đang thêm...' : 'Thêm chương'}
									</button>
								</div>
							</form>
						) : (
							<button
								type="button"
								onClick={() => setIsAddingSection(true)}
								className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 active:scale-95 transition shadow-2xs cursor-pointer"
							>
								<span className="text-sm font-light">+</span> Chương (Phần)
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
