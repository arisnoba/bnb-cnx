'use client';

import './globals.css';
import '@/styles/main.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const isAdminRoute = pathname?.startsWith('/admin');

	return (
		<html lang="ko">
			<body className="font-paperozi">
				<div className="relative flex min-h-screen flex-col">
					{!isAdminRoute && <Header />}
					<main className="flex-1">{children}</main>
					{!isAdminRoute && <Footer />}
				</div>
			</body>
		</html>
	);
}
