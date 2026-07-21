'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	HiOutlineAcademicCap,
	HiOutlineFolder,
	HiOutlineUsers,
	HiOutlineClipboardDocumentList,
} from 'react-icons/hi2';

const links = [
	{ href: '/admin/course', label: 'Khóa học', Icon: HiOutlineAcademicCap },
	{ href: '/admin/category', label: 'Danh mục', Icon: HiOutlineFolder },
	{ href: '/admin/user_management', label: 'Người dùng', Icon: HiOutlineUsers },
	{ href: '/admin/assignment', label: 'Bài tập', Icon: HiOutlineClipboardDocumentList },
];

export default function NavBar() {
	const pathname = usePathname();

	return (
		<nav className="flex flex-col gap-1.5">
			{links.map(link => {
				const isActive = pathname.startsWith(link.href);
				const Icon = link.Icon;

				return (
					<Link
						key={link.href}
						href={link.href}
						className={`flex items-center gap-3.5 py-2.5 pr-4 text-left text-[11px] font-bold tracking-wider uppercase transition-all duration-150 select-none border-l-2 rounded-r-lg ${
							isActive
								? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-paper-2)] pl-3.5 font-black'
								: 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-paper-2)]/30 pl-3'
						}`}
					>
						<Icon className={`h-4.5 w-4.5 ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'}`} />
						<span>{link.label}</span>
					</Link>
				);
			})}
		</nav>
	);
}
