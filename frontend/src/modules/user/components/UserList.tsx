'use client';

import { useState } from 'react';
import UserItem from './UserItem';
import type { User } from '../types';
import SearchBar from '@/common/components/SearchBar';
import AddUserForm from './AddUserForm';

type UserListProps = {
	users: User[];
};

export default function UserList({ users }: UserListProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	const filteredUsers = users.filter(
		u =>
			u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			u.email.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="w-full flex flex-col gap-4">
			<div className="flex justify-between items-center gap-4">
				<SearchBar
					value={searchQuery}
					onChange={setSearchQuery}
					placeholder="Tìm kiếm người dùng..."
					className="w-full md:w-80"
				/>
				<button
					type="button"
					onClick={() => setIsAddModalOpen(true)}
					className="btn-push btn-push-cyan text-xs shrink-0"
				>
					<span>+</span> Thêm người dùng
				</button>
			</div>

			<div className="tactile-card overflow-hidden bg-white border border-[var(--color-rule)]">
				<div className="overflow-x-auto">
					<table className="min-w-full border-collapse">
						<thead className="bg-[var(--color-paper-2)]/60 border-b border-[var(--color-rule)]">
							<tr>
								<th className="px-6 py-4.5 text-left text-[10px] font-black uppercase tracking-wider text-[var(--color-muted)]">
									Họ và tên
								</th>
								<th className="px-6 py-4.5 text-left text-[10px] font-black uppercase tracking-wider text-[var(--color-muted)]">
									Vai trò
								</th>
								<th className="px-6 py-4.5 text-left text-[10px] font-black uppercase tracking-wider text-[var(--color-muted)]">
									Email
								</th>
								<th className="px-6 py-4.5 text-left text-[10px] font-black uppercase tracking-wider text-[var(--color-muted)]">
									Ngày tham gia
								</th>
								<th className="px-6 py-4.5 text-right pr-8 text-[10px] font-black uppercase tracking-wider text-[var(--color-muted)]">
									Hành động
								</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-[var(--color-rule)]/60 bg-white">
							{filteredUsers.length === 0 ? (
								<tr>
									<td colSpan={5} className="px-6 py-12 text-center text-[var(--color-muted)] text-xs italic">
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

			{isAddModalOpen && <AddUserForm onClose={() => setIsAddModalOpen(false)} />}
		</div>
	);
}
