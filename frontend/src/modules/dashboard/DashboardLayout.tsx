'use client';

import Link from 'next/link';
import LogoutButton from '../client/components/LogoutButton';
import NavBar from '../client/components/NavBar';

type DashboardLayoutProps = {
	title: string;
	description: string;
	createHref?: string;
	createLabel?: string;
	children: React.ReactNode;
};

export default function DashboardLayout({
	title,
	description,
	createHref,
	createLabel,
	children,
}: DashboardLayoutProps) {
	return (
		<div className="flex h-screen w-screen overflow-hidden bg-[var(--color-paper-2)] text-[var(--color-ink)] font-sans">
			{/* Sidebar Nav */}
			<aside className="w-64 border-r border-[var(--color-rule)] bg-white px-6 py-8 flex flex-col gap-8 shrink-0">
				<div className="px-2 flex items-center gap-3">
					<div className="w-9 h-9 rounded-xl bg-[var(--color-accent)] border border-[var(--color-accent-deep)] flex items-center justify-center text-[var(--color-ink)] font-black text-lg shadow-xs">
						C
					</div>
					<h1 className="text-base font-black text-[var(--color-ink)] tracking-tight">Course App</h1>
				</div>

				<NavBar />
			</aside>

			{/* Main Content Area */}
			<main className="flex flex-1 flex-col min-w-0 overflow-hidden">
				{/* Top Header */}
				<header className="border-b border-[var(--color-rule)] bg-white px-8 py-5 flex items-center justify-between shadow-xs">
					<h2 className="text-lg font-black text-[var(--color-ink)] tracking-tight">{title}</h2>
					<LogoutButton />
				</header>

				{/* Description Banner & Action */}
				<div className="bg-white/80 border-b border-[var(--color-rule)] px-8 py-4 flex items-center justify-between gap-4">
					<p className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider">
						{description}
					</p>
					{createHref && (
						<Link
							href={createHref}
							className="btn-push btn-push-cyan"
						>
							<span>+</span> {createLabel}
						</Link>
					)}
				</div>

				{/* Viewport Content */}
				<section className="flex-1 p-8 overflow-y-auto bg-[var(--color-paper-2)]">{children}</section>
			</main>
		</div>
	);
}
