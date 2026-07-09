import { API_BASE_URL } from "@/config/api";
import instance from "@/common/interceptor";
import { CreateCategoryPayload } from "@/modules/categories/types";

const CATEGORY_URL = `${API_BASE_URL}/category`;

export async function getCategories() {
  const res = await instance.get(CATEGORY_URL);
  return res.data.data;
}

export async function createCategory(payload: CreateCategoryPayload) {
  const res = await instance.post(CATEGORY_URL, payload);
  return res.data;
}
