import CategoryList from '@/modules/categories/components/CategoryList';
import LogoutButton from '@/modules/client/components/LogoutButton';
import NavBar from '@/modules/client/components/NavBar';
import Link from 'next/link';

export const metadata = {
	title: 'Quản lý danh mục | Course App',
};

export default async function UserManagementPage() {
	// const categoryList = (await getCategories()) || [];

	return <section className="flex-1 p-8 overflow-y-auto">Danh sách người dùng</section>;
}
