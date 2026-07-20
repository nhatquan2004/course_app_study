'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
	{ href: '/admin/course', label: 'Khóa học' },
	{ href: '/admin/category', label: 'Danh mục' },
	{ href: '/admin/user_management', label: 'Quản lý người dùng' },
	{ href: '/admin/assignment', label: 'Bài tập' },
];

export default function NavBar() {
	const pathname = usePathname();

	return (
		<nav className="flex flex-col gap-2.5">
			{links.map(link => {
				const isActive = pathname === link.href;

				return (
					<Link
						key={link.href}
						href={link.href}
						className={`rounded-xl px-4 py-3 text-left text-xs font-bold transition-all duration-200 transform ${
							isActive
								? 'bg-[var(--color-accent)] text-[var(--color-ink)] shadow-xs translate-x-1'
								: 'text-[var(--color-muted)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)] hover:translate-x-1'
						}`}
					>
						{link.label}
					</Link>
				);
			})}
		</nav>
	);
}
