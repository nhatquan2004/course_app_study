import UserItem from './UserItem';
import type { User } from './types';

type UserListProps = {
	users: User[];
};

export default function UserList({ users }: UserListProps) {
	return (
		<div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
			<div className="overflow-x-auto">
				<table className="min-w-full">
					<thead className="bg-slate-50 border-b border-slate-200">
						<tr>
							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
								Name
							</th>

							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
								Username
							</th>

							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
								Email
							</th>

							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
								Joined
							</th>

							<th className="px-6 py-4"></th>
						</tr>
					</thead>

					<tbody className="divide-y divide-slate-100">
						{/* <UserItem user={user} /> */}
						{users.map(user => (
							<UserItem key={user._id} user={user} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
