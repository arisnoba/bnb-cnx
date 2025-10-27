'use client';

import ContactForm from '@/components/ContactForm';
import Image from 'next/image';

export default function Contact() {
	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<div className="bg-white px-4 md:px-10 pt-10 md:pt-10 pb-6 md:pb-[60px]">
				<div className="bg-brand-purple rounded-[40px] md:rounded-[60px] px-4 md:px-20 py-10 md:pt-0 md:pb-32">
					{/* Hero Content */}
					<div className="max-w-[880px] mx-auto space-y-6 md:space-y-12">
						<h1 className="text-4xl md:text-[90px] font-black text-brand-neon uppercase leading-none">Contact us</h1>
						<div className="text-base md:text-[24px] font-semibold text-white leading-relaxed space-y-2">
							<p>BNB CNX는 브랜드사 여러분의 다양한 커머스 및 마케팅 문의를 기다리고 있습니다.</p>
							<p>문의해 주시면 남겨주신이 메일로 BNB CNX의 글로벌 커머스 뉴스레터가 정기 발송됩니다.</p>
							<p>아래 간단한 양식을 작성해 주시면, 담당자 확인 후 영업일 기준 1일이내 답변드리겠습니다.</p>
						</div>
					</div>
				</div>
			</div>

			{/* Form Section */}
			<div className="bg-white px-4 md:px-10 pb-6 md:pb-10">
				<div className="max-w-[1000px] mx-auto">
					<ContactForm />
				</div>
			</div>
		</div>
	);
}
