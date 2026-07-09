'use server';

import { createCategory } from "@/services/categoryService";
import { CreateCategoryPayload } from "../types";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(payload: CreateCategoryPayload) {
    const res = await createCategory(payload);
    revalidatePath('/admin/category');
    return res;
}
