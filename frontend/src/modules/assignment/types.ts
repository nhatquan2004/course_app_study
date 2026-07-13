export type SubmissionStatus = 'pending' | 'active' | 'inactive';

export type Submission = {
	_id: string;
	student: {
		fullName: string;
		email: string;
		phone: string;
	};
	course: {
		name: string;
		status: string;
	};
	tutor: {
		fullName: string;
		email: string;
	};
	assignmentName: string;
	status: SubmissionStatus;
	submittedAt: string;
	gradedAt?: string;
	grader?: {
		fullName: string;
		email: string;
	};
	score?: number;
	feedback?: string;
};
