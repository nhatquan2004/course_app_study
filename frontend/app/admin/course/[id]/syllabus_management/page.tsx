import { getCourseAction, getChaptersAction } from '@/modules/courses/actions/chapterActions';
import SyllabusBuilder from '@/modules/courses/components/SyllabusBuilder';
import { notFound } from 'next/navigation';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function SyllabusManagementPage({ params }: Props) {
	const resolvedParams = await params;
	const courseId = resolvedParams.id;

	const course = await getCourseAction(courseId);
	if (!course) {
		notFound();
	}

	const chaptersRes = await getChaptersAction(courseId);
	const initialChapters = chaptersRes?.success !== false && Array.isArray(chaptersRes.data) ? chaptersRes.data : [];

	return (
		<div className="w-full">
			<SyllabusBuilder
				courseId={courseId}
				courseName={course.name}
				initialChapters={initialChapters}
				initialStatus={course.status || 'draft'}
			/>
		</div>
	);
}
