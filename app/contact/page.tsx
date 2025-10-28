'use client';

import ContactForm from '@/components/ContactForm';
import Image from 'next/image';

export default function Contact() {
	return (
		<div className="min-h-screen contact-page cnx-wrapper">
			{/* Hero Section */}
			<div className="bg-brand-purple hero-section">
				{/* Hero Content */}
				<div className="max-w-[880px] mx-auto">
					<h1 className="font-black text-brand-neon uppercase leading-none">Contact us</h1>
					<p className="font-semibold text-white leading-relaxed">
						당신의 브랜드가 중국 시장에서 빛날 수 있도록, CNX가 함께합니다.
						<br className="hidden md:block" /> 진심으로 성장의 방향을 공유할 파트너 브랜드를 기다립니다.
					</p>
				</div>
			</div>

			{/* Form Section */}
			<div className="max-w-[880px] mx-auto">
				<ContactForm />
			</div>
		</div>
	);
}
