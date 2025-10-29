import HorizontalScrollSection from '@/components/home/HorizontalScrollSection';
import SNSMarketingSection from '@/components/home/SNSMarketingSection';
import BrandChannelSection from '@/components/home/BrandChannelSection';
import OfficialStoreSection from '@/components/home/OfficialStoreSection';
import LiveCommerceSection from '@/components/home/LiveCommerceSection';
import CNXMallSection from '@/components/home/CNXMallSection';
import PPLMarketingSection from '@/components/home/PPLMarketingSection';
import Image from 'next/image';
import { BlurFade } from '@/components/ui/blur-fade';

const imgHero = '/images/home/hero.jpg';

export default function Home() {
	return (
		<main className="min-h-screen home-page ">
			<div className="space-y-4 md:space-y-10 cnx-wrapper">
				{/* Hero Section */}
				<section className="relative bg-brand-purple overflow-hidden md:aspect-[16/9] hero-section md:h-auto">
					<div className="absolute inset-0 bg-black/70 z-20" />
					<div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${imgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
					<div className="relative z-30 mx-auto h-full flex flex-col justify-end">
						<BlurFade className="text-white text-[60px] font-black leading-[1.2] tracking-[1.2px] uppercase mb-8" inView delay={0.15}>
							<h1>
								REAL.
								<br />
								GLOBAL.
								<br />
								EXPERIENTIAL GROWTH.
								<br />
								Marketing COMMERCE COMPANY
							</h1>
						</BlurFade>
						<BlurFade className="flex items-center gap-2" inView delay={0.3}>
							<div>
								<Image src="/images/common/logo.svg" alt="BNB CNX Logo" width={152} height={24} className="w-auto object-contain hero-logo" />
							</div>
						</BlurFade>
					</div>
				</section>
			</div>

			{/* Horizontal Scroll Section */}
			<HorizontalScrollSection />

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
