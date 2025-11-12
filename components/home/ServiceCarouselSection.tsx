'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { BlurFade } from '@/components/ui/blur-fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ServiceCard {
	id: string;
	title: string;
	description: string;
	image: string;
	bgColor: string;
	anchor: string;
}

const services: ServiceCard[] = [
	{
		id: 'sns-marketing',
		title: 'SNS Marketing',
		description: '브랜드의 첫 반응, 지금 시작해야 합니다.',
		image: '/images/home/service-01.jpg',
		bgColor: 'bg-[#dddddd]',
		anchor: '#sns-marketing',
	},
	{
		id: 'sns-brand-channel',
		title: 'BRAND Channel',
		description: "브랜드 '공식 채널' 세팅 노하우가 중요합니다.",
		image: '/images/home/service-02.jpg',
		bgColor: 'bg-[#dddddd]',
		anchor: '#sns-brand-channel',
	},
	{
		id: 'official-store',
		title: 'Official Store',
		description: '중국 공략의 핵심은 SNS 공식몰 구축과 운영입니다.',
		image: '/images/home/service-06.jpg',
		bgColor: 'bg-[#9fa7b3]',
		anchor: '#official-store',
	},
	{
		id: 'live-commerce',
		title: 'LIVE Commerce',
		description: '매출로 직결되는 왕홍의 퍼포먼스를 보여드립니다.',
		image: '/images/home/service-03.jpg',
		bgColor: 'bg-[#9fa7b3]',
		anchor: '#live-commerce',
	},
	{
		id: 'cnx-mall',
		title: 'CNX Mall',
		description: '한국 브랜드만을 위한 중국 플래그십 스토어가 열립니다.',
		image: '/images/home/service-04.jpg',
		bgColor: 'bg-[#9fb3a5]',
		anchor: '#cnx-mall',
	},
	{
		id: 'ppl-marketing',
		title: 'PPL Marketing',
		description: '차별화된 중국향 노출 PPL을 진행합니다.',
		image: '/images/home/service-05.jpg',
		bgColor: 'bg-[#b3a49f]',
		anchor: '#ppl-marketing',
	},
];

export default function ServiceCarouselSection() {
	// 섹션으로 스크롤하는 함수
	const scrollToSection = (anchor: string) => {
		const targetId = anchor.replace('#', '');
		const targetElement = document.getElementById(targetId);

		if (targetElement) {
			const headerOffset = 80; // 헤더 높이만큼 오프셋 (필요시 조정)
			const elementPosition = targetElement.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});
		}
	};

	return (
		<section className="overflow-hidden relative py-16 bg-white md:py-24 carousel-section">
			{/* Section Title */}
			<BlurFade className="flex flex-col gap-0 justify-center items-center font-black lg:flex-row lg:gap-2 carousel-title" inView delay={0.15}>
				<span>중국 시장 진출,</span>
				<div className="flex gap-1 items-center">
					<div className="flex gap-1 items-center px-3 py-2 bg-brand-purple">
						<Image src="/images/common/logo.svg" alt="BNB CNX Logo" width={152} height={24} className="object-contain w-auto carousel-logo" />
					</div>
					와
				</div>
				<span>시작하세요.</span>
			</BlurFade>

			{/* Swiper Carousel */}
			<div className="mx-auto carousel-container group/carousel">
				<Swiper
					modules={[Navigation, Pagination]}
					spaceBetween={0}
					slidesPerView={1.2}
					navigation={{
						nextEl: '.service-carousel-button-next',
						prevEl: '.service-carousel-button-prev',
					}}
					pagination={{ clickable: false }}
					breakpoints={{
						640: {
							slidesPerView: 1.8,
							// spaceBetween: 24,
						},
						768: {
							slidesPerView: 2.1,
							// spaceBetween: 24,
						},
						1024: {
							slidesPerView: 3.5,
							spaceBetween: 0,
						},
					}}
					className="service-carousel">
					{/* Custom Navigation Buttons */}
					<div className="service-carousel-button-prev">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
					<div className="service-carousel-button-next">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
					{services.map(service => (
						<SwiperSlide key={service.id} className="px-2 md:px-3 lg:px-4">
							<div className={`aspect-square rounded-[24px] md:rounded-[40px] ${service.bgColor} overflow-hidden relative group cursor-pointer`} onClick={() => scrollToSection(service.anchor)}>
								{/* Background Image */}
								<div className="absolute inset-0 z-0">
									<Image src={service.image} alt={service.title} fill className="object-cover" />
								</div>

								{/* Card Content */}
								<div className="flex relative z-10 flex-col justify-between p-6 h-full bg-gradient-to-b to-transparent from-black/30">
									<div className="flex gap-4 justify-between items-start">
										<div className="text-white">
											<h3 className="mb-2 text-lg font-black md:mb-3 md:text-xl">{service.title}</h3>
											<p className="font-semibold leading-[1.35] text-sm md:text-base">{service.description}</p>
										</div>

										{/* Arrow Button */}
										<button className="flex justify-center items-center p-2 rounded-full transition-transform bg-brand-purple hover:scale-110">
											<ArrowRight className="w-6 h-6 md:w-7 md:h-7 text-brand-neon" />
										</button>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
