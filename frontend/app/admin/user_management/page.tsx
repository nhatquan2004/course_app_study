import DashboardLayout from '@/modules/dashboard/DashboardLayout';
import UserList from '@/modules/user/UserList';
import { getUserList } from '@/services/userService';

export default async function UserListPage() {
	const users = (await getUserList()) || [];

	return (
		<DashboardLayout
			title="Người dùng"
			description="Danh sách tất cả người dùng"
			createHref="/admin/user_management/create_new_user"
			createLabel="Thêm người dùng">
			<UserList users={users} />
		</DashboardLayout>
	);
}
