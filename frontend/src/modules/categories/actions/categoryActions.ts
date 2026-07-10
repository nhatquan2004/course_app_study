'use server';

import { createCategory, updateCategory, deleteCategory } from "@/services/categoryService";
import { CreateCategoryPayload } from "../types";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(payload: CreateCategoryPayload) {
    const res = await createCategory(payload);
    revalidatePath('/admin/category');
    return res;
}

export async function updateCategoryAction(id: string, payload: CreateCategoryPayload) {
    const res = await updateCategory(id, payload);
    revalidatePath('/admin/category');
    return res;
}

export async function deleteCategoryAction(id: string) {
    const res = await deleteCategory(id);
    revalidatePath('/admin/category');
    return res;
}
