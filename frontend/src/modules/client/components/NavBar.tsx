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
		<nav className="flex flex-col gap-3">
			{links.map(link => {
				const isActive = pathname === link.href;

				return (
					<Link
						key={link.href}
						href={link.href}
						className={`rounded-xl px-4 py-3 text-left text-xs font-black transition-all duration-150 border-2 select-none uppercase tracking-wider ${
							isActive
								? 'bg-[var(--color-accent)] text-[var(--color-ink)] border-[var(--color-ink)] shadow-[2px_2px_0_0_rgba(0,0,0,1)]'
								: 'text-[var(--color-muted)] border-transparent hover:border-[var(--color-rule)] hover:bg-[var(--color-paper-2)]/60 hover:text-[var(--color-ink)]'
						}`}
					>
						{link.label}
					</Link>
				);
			})}
		</nav>
	);
}
