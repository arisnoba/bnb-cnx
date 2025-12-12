'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Header() {
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		// 라우트 변경 시 모바일 메뉴 닫기
		setIsMobileMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		// 모바일 메뉴 오픈 시 바디 스크롤 잠금
		const prevOverflow = document.body.style.overflow;
		if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prevOverflow;
		};
	}, [isMobileMenuOpen]);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsMobileMenuOpen(false);
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, []);

	if (pathname?.startsWith('/admin')) {
		return null;
	}

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'ABOUT' },
		{ href: '/contact', label: 'Contact' },
	];

	const kakaoTalkUrl = 'http://pf.kakao.com/_LcTYn';
	const isHeaderCompact = isScrolled || isMobileMenuOpen;

	return (
		<header
			className={cn(
				'fixed top-0 z-50 w-full transition-all duration-600 header',
				// 헤더 높이/offset은 scrolled, is-solid로 제어
				isScrolled ? 'backdrop-blur-md bg-black/80 scrolled' : isMobileMenuOpen ? 'backdrop-blur-md bg-black/80 is-solid' : 'bg-transparent'
			)}>
			<div className="max-w-[1720px] mx-auto">
				<div
					className={cn(
						'flex justify-between items-center border-b transition-all duration-300 border-white/10 header-wrapper',
						isHeaderCompact ? 'header-wrapper-scrolled' : 'header-wrapper-normal'
					)}>
					{/* Logo */}
					<Link href="/" className="flex items-center h-[32px] header-logo">
						<Image src="/images/common/logo.svg" alt="BNB CNX" width={152} height={24} />
					</Link>

					{/* Navigation */}
					<nav className="flex items-center font-black tracking-wide uppercase header-nav" aria-label="주요 메뉴">
						{links.map(link => (
							<Link
								key={link.href}
								href={link.href}
								className={cn('transition-colors header-nav-link', pathname === link.href || (link.href === '/about' && pathname === '/about') ? 'text-brand-neon' : 'text-white')}>
								{link.label}
							</Link>
						))}
						<a href={kakaoTalkUrl} target="_blank" rel="noopener noreferrer" className="header-kakao-link" aria-label="카카오톡 문의하기">
							<Image src="/images/common/kakao.svg" alt="카카오톡 문의하기" width={32} height={32} />
						</a>
					</nav>

					{/* Mobile Actions (Kakao + Hamburger) */}
					<div className="header-actions">
						<a href={kakaoTalkUrl} target="_blank" rel="noopener noreferrer" className="rounded-md header-kakao-btn" aria-label="카카오톡 문의하기">
							<Image src="/images/common/kakao.svg" alt="카카오톡" width={32} height={32} />
						</a>
						<button
							type="button"
							className={cn('header-hamburger-btn rounded-md', isMobileMenuOpen && 'is-open')}
							aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
							aria-expanded={isMobileMenuOpen}
							aria-controls="mobile-menu"
							onClick={() => setIsMobileMenuOpen(v => !v)}>
							<span />
							<span />
							<span />
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div className={cn('header-mobile-menu', isMobileMenuOpen && 'is-open')} id="mobile-menu" role="dialog" aria-modal="true" aria-label="모바일 메뉴">
				<button type="button" className="header-mobile-backdrop" aria-label="메뉴 닫기" onClick={() => setIsMobileMenuOpen(false)} />
				<div className="header-mobile-panel">
					<nav className="header-mobile-nav" aria-label="모바일 메뉴 항목">
						{links.map(link => (
							<Link key={link.href} href={link.href} className="header-mobile-link">
								{link.label}
							</Link>
						))}
						{/* <a href={kakaoTalkUrl} target="_blank" rel="noopener noreferrer" className="header-mobile-kakao">
							카카오톡 문의하기
						</a> */}
					</nav>
				</div>
			</div>
		</header>
	);
}
