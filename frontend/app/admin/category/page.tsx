import { getCategories } from '@/services/categoryService';
import CategoryList from '@/modules/categories/components/CategoryList';
import NavBar from '@/modules/client/components/NavBar';
import LogoutButton from '@/modules/client/components/LogoutButton';
import Link from 'next/link';

export const metadata = {
	title: 'Quản lý danh mục | Course App',
};

export default async function CategoryPage() {
	const categoryList = (await getCategories()) || [];

	return <CategoryList categoryList={categoryList} />;
}
