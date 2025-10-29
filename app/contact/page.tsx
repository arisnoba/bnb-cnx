'use client';

import ContactForm from '@/components/ContactForm';
import Image from 'next/image';
import { BlurFade } from '@/components/ui/blur-fade';

export default function Contact() {
	return (
		<div className="min-h-screen contact-page cnx-wrapper">
			{/* Hero Section */}
			<div className="bg-brand-purple hero-section">
				{/* Hero Content */}
				<div className="max-w-[880px] mx-auto">
					<BlurFade className="font-black text-brand-neon uppercase leading-none" inView delay={0.15}>
						<h1>Contact us</h1>
					</BlurFade>
					<BlurFade className="font-semibold text-white leading-relaxed" inView delay={0.3}>
						<p>
							당신의 브랜드가 중국 시장에서 빛날 수 있도록, CNX가 함께합니다.
							<br className="hidden md:block" /> 진심으로 성장의 방향을 공유할 파트너 브랜드를 기다립니다.
						</p>
					</BlurFade>
				</div>
			</div>

			{/* Form Section */}
			<div className="max-w-[880px] mx-auto">
				<BlurFade inView delay={0.45}>
					<ContactForm />
				</BlurFade>
			</div>
		</div>
	);
}
