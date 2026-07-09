export type Category = {
    _id: string;
    categoryName: string;
    createdAt?: string;
};

export type CreateCategoryPayload = {
    categoryName: string;
};
