'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
	const pathname = usePathname();

	if (pathname?.startsWith('/admin')) {
		return null;
	}

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'ABOUT BNB CNX' },
		{ href: '/contact', label: 'Contact Us' },
	];

	return (
		<header className="fixed top-10 z-50 w-full border-b border-white/10 bg-black/15">
			<div className="my-container mx-auto px-[60px]">
				<div className="flex items-center justify-between border-b border-white/10 px-[20px] pt-[50px] pb-[30px]">
					{/* Logo */}
					<Link href="/" className="flex items-center h-[32px] w-[148px]">
						<span className="text-[31.777px] font-black uppercase text-[#baff00] leading-none">BNB CN</span>
					</Link>

					{/* Navigation */}
					<nav className="flex items-center gap-[60px] text-[20px] font-black uppercase tracking-wide">
						{links.map(link => (
							<Link
								key={link.href}
								href={link.href}
								className={cn('transition-colors', pathname === link.href || (link.href === '/about' && pathname === '/about') ? 'text-[#baff00]' : 'text-white')}>
								{link.label}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</header>
	);
}
