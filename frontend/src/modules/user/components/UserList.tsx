'use client';

import { useState } from 'react';
import UserItem from './UserItem';
import AddUserForm from './AddUserForm';
import type { User } from '../types';
import SearchBar from '@/common/components/SearchBar';

type UserListProps = {
	users: User[];
};

export default function UserList({ users }: UserListProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	const filteredUsers = users.filter((u) => 
		u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
		u.email.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="w-full flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<SearchBar
					value={searchQuery}
					onChange={setSearchQuery}
					placeholder="Search users..."
					className="w-full md:w-80"
				/>
				<button
					type="button"
					onClick={() => setIsAddModalOpen(true)}
					className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/10 hover:shadow hover:shadow-blue-500/20 transition-all duration-200 active:scale-95 cursor-pointer"
				>
					<span>+</span> Thêm người dùng
				</button>
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
									Role
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
								filteredUsers.map(user => <UserItem key={user._id} user={user} />)
							)}
						</tbody>
					</table>
				</div>
			</div>

			{isAddModalOpen && (
				<AddUserForm onClose={() => setIsAddModalOpen(false)} />
			)}
		</div>
	);
}
