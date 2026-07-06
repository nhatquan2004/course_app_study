'use client';
import { useState } from 'react';

const links = [
	{ id: 'khoa-hoc', label: 'Khóa học' },
	{ id: 'admin', label: 'Admin' },
];

export default function NavBar() {
	const [activePage, setActivePage] = useState(links[0]);

	return (
		<nav className="flex flex-col gap-2">
			{links.map(link => {
				const isActive = activePage.id === link.id;

				return (
					<button
						key={link.id}
						onClick={() => setActivePage(link)}
						className={`rounded-md px-3 py-2 text-left text-sm font-medium transition ${
							isActive
								? 'bg-zinc-900 text-white'
								: 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
						}`}>
						{link.label}
					</button>
				);
			})}
		</nav>
	);
}
