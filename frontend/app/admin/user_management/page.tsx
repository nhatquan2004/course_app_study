import DashboardLayout from '@/modules/dashboard/DashboardLayout';
import AddUserForm from '@/modules/user/components/AddUserForm';
import UserList from '@/modules/user/components/UserList';
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
