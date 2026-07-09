export type Course = {
	_id: string;
	name: string;
	description: string;
	price: number;
	coverImage?: string;
	categoryIds?: string[];
};

export type CreateCoursePayload = {
	name: string;
	description: string;
	price: number;
	coverImage: string;
	categoryIds: string[];
};

export type UpdateCoursePayload = CreateCoursePayload;
