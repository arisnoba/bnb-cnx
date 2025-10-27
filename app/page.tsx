import HorizontalScrollSection from '@/components/home/HorizontalScrollSection';
import SNSMarketingSection from '@/components/home/SNSMarketingSection';
import Image from 'next/image';

export default function Home() {
	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<section className="relative h-screen bg-brand-purple overflow-hidden">
				<div className="absolute inset-0 opacity-70">
					<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
				</div>
				<div className="relative z-10 container mx-auto h-full flex flex-col justify-end pb-20 px-20">
					<h1 className="text-white text-[60px] font-black leading-[1.2] tracking-[1.2px] uppercase mb-8">
						<p>REAL.</p>
						<p>GLOBAL.</p>
						<p>EXPERIENTIAL GROWTH.</p>
						<p>Marketing COMMERCE COMPANY</p>
					</h1>
					<div className="flex items-center gap-2">
						<span className="text-brand-neon text-[97px] font-black uppercase leading-none">BNB CN</span>
						<div className="w-[68px] h-[68px] relative">
							<svg viewBox="0 0 68 68" fill="none" className="w-full h-full">
								<circle cx="34" cy="34" r="32" fill="#baff00" />
							</svg>
						</div>
					</div>
				</div>
			</section>

			{/* Vision Section */}
			<section className="bg-[#222222] py-32 px-10">
				<div className="container mx-auto">
					<div className="grid grid-cols-2 gap-20">
						{/* Circles Diagram */}
						<div className="relative h-auto w-full">
							<Image src="/images/home/vision.svg" alt="CNX-Vision" width={582} height={582} className="w-full h-auto object-cover" />
						</div>

						{/* Vision Text */}
						<div className="flex flex-col justify-center">
							<h2 className="text-brand-neon text-[48px] font-black mb-8">Vision</h2>
							<p className="text-white text-[24px] font-semibold leading-[1.35]">
								브랜드의 실질적 성장을 돕는 글로벌 브랜딩 & 커머스 파트너 BNB CNX는 글로벌의 장벽이었던 콘텐츠, 유통, 트래픽, 마케팅의 어려움을 넘어, 브랜드가 타겟팅한 시장 안에서 실질적인
								성과를 경험할 수 있도록 설계된 비즈니스를 만들어 나갑니다.
								<br />
								<br />
								전략 기획부터 실행까지 하나의 흐름으로 연결되며, 브랜드에게 &apos;성과를 보이고, 상품이 팔리고, 매출이 상승하는&apos; 경험을 만들어가는 것, 그것이 BNB CNX가 추구하는 비전입니다.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Horizontal Scroll Section */}
			<HorizontalScrollSection />

			{/* SNS Marketing Section */}
			<SNSMarketingSection />
		</main>
	);
}
