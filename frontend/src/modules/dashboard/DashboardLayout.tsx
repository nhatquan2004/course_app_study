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
		<div className="flex h-screen w-screen overflow-hidden bg-[var(--color-paper)] text-[var(--color-ink)] font-sans">
			{/* Sidebar Nav */}
			<aside className="w-64 border-r border-[var(--color-rule)] bg-white px-6 py-8 flex flex-col gap-8 shrink-0 justify-between">
				<div className="flex flex-col gap-8">
					<div className="px-2 flex items-center gap-3">
						<div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white font-extrabold text-xs shrink-0 select-none uppercase font-mono shadow-sm">
							c
						</div>
						<span className="text-xs font-extrabold tracking-widest text-[var(--color-ink)] uppercase">Course App</span>
					</div>

					<NavBar />
				</div>

				{/* Sidebar footer indicator */}
				<div className="px-2 pt-4 border-t border-[var(--color-rule)] flex items-center gap-2">
					<div className="w-6 h-6 rounded-full bg-[var(--color-paper-3)] border border-[var(--color-rule)] flex items-center justify-center text-[9px] font-bold text-[var(--color-muted)] font-mono select-none">
						N
					</div>
					<span className="text-[10px] font-bold text-[var(--color-muted)] tracking-wide uppercase font-mono">Workspace</span>
				</div>
			</aside>

			{/* Main Content Area */}
			<main className="flex flex-1 flex-col min-w-0 overflow-hidden bg-[var(--color-paper)]">
				{/* Top Spacious Unified Header */}
				<header className="border-b border-[var(--color-rule)] bg-white px-8 py-5 flex items-center justify-between shrink-0">
					<div>
						<h2 className="text-lg font-extrabold tracking-tight text-[var(--color-ink)] leading-snug">{title}</h2>
						<p className="text-xs text-[var(--color-muted)] font-medium mt-0.5 leading-none">
							{description}
						</p>
					</div>

					<div className="flex items-center gap-3">
						{createHref && (
							<Link
								href={createHref}
								className="btn-push btn-push-cyan text-xs font-bold"
							>
								<span>+</span> {createLabel}
							</Link>
						)}
						<LogoutButton />
					</div>
				</header>

				{/* Viewport Content */}
				<section className="flex-1 p-8 overflow-y-auto">{children}</section>
			</main>
		</div>
	);
}
