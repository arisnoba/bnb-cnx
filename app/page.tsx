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
			</div>

			{/* Horizontal Scroll Section */}
			<HorizontalScrollSection />

			{/* SNS Marketing Section */}
			<SNSMarketingSection />
		</main>
	);
}
