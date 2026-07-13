'use client';

import { useState } from 'react';
import UserItem from './UserItem';
import type { User } from './types';
import SearchBar from '@/common/components/SearchBar';

type UserListProps = {
	users: User[];
};

export default function UserList({ users }: UserListProps) {
	const [searchQuery, setSearchQuery] = useState('');

	const filteredUsers = users.filter((u) => 
		u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
		u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
		u.email.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="w-full flex flex-col gap-4">
			<div className="flex justify-start">
				<SearchBar
					value={searchQuery}
					onChange={setSearchQuery}
					placeholder="Search users..."
					className="w-full md:w-80"
				/>
			</div>

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
							{filteredUsers.length === 0 ? (
								<tr>
									<td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
										Không tìm thấy người dùng nào.
									</td>
								</tr>
							) : (
								filteredUsers.map(user => (
									<UserItem key={user._id} user={user} />
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
