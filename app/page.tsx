import ServiceCarouselSection from '@/components/home/ServiceCarouselSection';
import SNSMarketingSection from '@/components/home/SNSMarketingSection';
import BrandChannelSection from '@/components/home/BrandChannelSection';
import OfficialStoreSection from '@/components/home/OfficialStoreSection';
import LiveCommerceSection from '@/components/home/LiveCommerceSection';
import CNXMallSection from '@/components/home/CNXMallSection';
import PPLMarketingSection from '@/components/home/PPLMarketingSection';
import Image from 'next/image';
import { BlurFade } from '@/components/ui/blur-fade';

const videoHero = '/images/home/hero.mp4';

export default function Home() {
	return (
		<main className="min-h-screen home-page">
			<div className="space-y-4 md:space-y-10 cnx-wrapper">
				{/* Hero Section */}
				<section className="relative bg-brand-purple overflow-hidden md:aspect-[16/9] hero-section md:h-auto">
					<div className="absolute inset-0 z-20 bg-black/70" />
					<video className="object-cover absolute inset-0 z-0 w-full h-full" autoPlay loop muted playsInline>
						<source src={videoHero} type="video/mp4" />
					</video>
					<div className="flex relative z-30 flex-col justify-end mx-auto h-full">
						<BlurFade className="text-white text-[60px] font-black leading-[1.2] tracking-[1.2px] uppercase mb-8" inView delay={0.15}>
							<h1>
								중국 소비자와 가장 가까운 <br />
								SNS 마케팅 전문 파트너
							</h1>
						</BlurFade>
						<BlurFade className="flex gap-2 items-center" inView delay={0.3}>
							<div>
								<Image src="/images/common/logo.svg" alt="BNB CNX Logo" width={152} height={24} className="object-contain w-auto hero-logo" />
							</div>
						</BlurFade>
					</div>
				</section>
			</div>

			{/* Service Carousel Section */}
			<ServiceCarouselSection />

			{/* SNS Marketing Section */}
			<SNSMarketingSection />

			{/* Brand Channel Section */}
			<BrandChannelSection />
			{/* Official Store Section */}
			<OfficialStoreSection />
			{/* Live Commerce Section */}
			<LiveCommerceSection />

			{/* CNX Mall Section */}
			<CNXMallSection />

			{/* PPL Marketing Section */}
			<PPLMarketingSection />
		</main>
	);
}
