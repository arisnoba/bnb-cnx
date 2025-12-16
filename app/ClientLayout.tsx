'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

export default function ClientLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const isAdminRoute = pathname?.startsWith('/admin');

	return (
		<div className="flex relative flex-col min-h-screen">
			{!isAdminRoute && <Header />}
			<main className="flex-1">{children}</main>
			{!isAdminRoute && <Footer />}
		</div>
	);
}
