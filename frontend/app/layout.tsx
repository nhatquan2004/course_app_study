import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Bounce, ToastContainer } from 'react-toastify';

const plusJakartaSans = Plus_Jakarta_Sans({
	variable: '--font-sans',
	subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
	variable: '--font-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Course App',
	description: 'Quản lý học tập và giảng dạy tối giản, thông minh cùng Course App',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">
				<ToastContainer
					position="bottom-right"
					autoClose={3000}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick={false}
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
					transition={Bounce}
				/>
				{children}
			</body>
		</html>
	);
}
