'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
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
		{ href: '/contact', label: 'Contact Us' },
	];

	return (
		<header className={cn('fixed top-0 z-50 w-full transition-all duration-400', isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent pt-10')}>
			<div className="max-w-[1720px] mx-auto">
				<div className={cn('flex items-center justify-between border-b border-white/10 px-[20px] transition-all duration-300', isScrolled ? 'pt-5 pb-5' : 'pt-[50px] pb-[30px]')}>
					{/* Logo */}
					<Link href="/" className="flex items-center h-[32px] ">
						<span className="text-3xl font-black uppercase text-brand-neon leading-none flex items-center">
							BNB CN
							<i className="fa-kit fa-cnx-x text-[.78em] ml-[-.15em]"></i>
						</span>
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
