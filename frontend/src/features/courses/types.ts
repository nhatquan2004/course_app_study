export type Course = {
	_id: string;
	name: string;
	description: string;
	price: number;
	coverImage?: string;
	categoryId?: number;
};

export type CreateCoursePayload = {
	name: string;
	description: string;
	price: number;
	coverImage: string;
	categoryId: number;
};

export type UpdateCoursePayload = CreateCoursePayload;
