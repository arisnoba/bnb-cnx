import HorizontalScrollSection from '@/components/home/HorizontalScrollSection';
import SNSMarketingSection from '@/components/home/SNSMarketingSection';
import Image from 'next/image';

const imgHero = '/images/home/hero.jpg';

export default function Home() {
	return (
		<main className="min-h-screen home-page ">
			<div className="space-y-4 md:space-y-10 cnx-wrapper">
				{/* Hero Section */}
				<section className="relative bg-brand-purple overflow-hidden md:aspect-[184/85] hero-section md:h-auto">
					<div className="absolute inset-0 bg-black/70 z-20" />
					<div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${imgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
					<div className="relative z-30 mx-auto h-full flex flex-col justify-end">
						<h1 className="text-white text-[60px] font-black leading-[1.2] tracking-[1.2px] uppercase mb-8">
							REAL.
							<br />
							GLOBAL.
							<br />
							EXPERIENTIAL GROWTH.
							<br />
							Marketing COMMERCE COMPANY
						</h1>
						<div className="flex items-center gap-2">
							<Image src="/images/common/logo.svg" alt="BNB CNX Logo" width={152} height={24} className="w-auto object-contain hero-logo" />
						</div>
					</div>
				</section>

				{/* Vision Section */}
				<section className="bg-[#222222] overflow-hidden vision-section">
					<div className="container mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
							{/* Circles Diagram */}
							<div className="relative h-auto w-full">
								<picture>
									<source media="(max-width: 580px)" srcSet="/images/home/vision_m.svg" />
									<source media="(min-width: 581px)" srcSet="/images/home/vision.svg" />
									<img src="/images/home/vision.svg" alt="CNX-Vision" className="w-full h-auto object-cover" />
								</picture>
							</div>

							{/* Vision Text */}
							<div className="flex flex-col justify-center">
								<h2 className="text-brand-neon text-[48px] font-black mb-8">Vision</h2>
								<p className="text-white font-semibold mb-4">
									브랜드의 실질적 성장을 돕는 글로벌 브랜딩 & 커머스 파트너 BNB CNX는 글로벌의 장벽이었던 콘텐츠, 유통, 트래픽, 마케팅의 어려움을 넘어, 브랜드가 타겟팅한 시장 안에서 실질적인
									성과를 경험할 수 있도록 설계된 비즈니스를 만들어 나갑니다.
								</p>
								<p className="text-white font-semibold">
									전략 기획부터 실행까지 하나의 흐름으로 연결되며, 브랜드에게 &apos;성과를 보이고, 상품이 팔리고, 매출이 상승하는&apos; 경험을 만들어가는 것, 그것이 BNB CNX가 추구하는
									비전입니다.
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* Horizontal Scroll Section */}
			<HorizontalScrollSection />

			{/* SNS Marketing Section */}
			<SNSMarketingSection />
		</main>
	);
}
