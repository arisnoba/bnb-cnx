'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Header() {
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	if (pathname?.startsWith('/admin')) {
		return null;
	}

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'ABOUT' },
		{ href: '/contact', label: 'Contact' },
	];

	return (
		<header className={cn('fixed top-0 z-50 w-full transition-all duration-600 header', isScrolled ? 'bg-black/80 backdrop-blur-md scrolled' : 'bg-transparent ')}>
			<div className="max-w-[1720px] mx-auto">
				<div
					className={cn(
						'flex items-center justify-between border-b border-white/10 transition-all duration-300 header-wrapper',
						isScrolled ? 'header-wrapper-scrolled' : 'header-wrapper-normal'
					)}>
					{/* Logo */}
					<Link href="/" className="flex items-center h-[32px] header-logo">
						<Image src="/images/common/logo.svg" alt="BNB CNX" width={152} height={24} />
					</Link>

					{/* Navigation */}
					<nav className="flex items-center  font-black uppercase tracking-wide header-nav">
						{links.map(link => (
							<Link
								key={link.href}
								href={link.href}
								className={cn('transition-colors header-nav-link', pathname === link.href || (link.href === '/about' && pathname === '/about') ? 'text-brand-neon' : 'text-white')}>
								{link.label}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</header>
	);
}
