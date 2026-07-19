import DashboardLayout from '@/modules/dashboard/DashboardLayout';
import UserList from '@/modules/user/UserList';
import { getUserList } from '@/services/userService';

export default async function UserListPage() {
	const users = (await getUserList()) || [];

	return (
		<DashboardLayout
			title="Người dùng"
			description="Danh sách tất cả người dùng">
			<UserList users={users} />
		</DashboardLayout>
	);
}
