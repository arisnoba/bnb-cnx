'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
	id: string;
	title: string;
	description: string;
	image: string;
	bgColor: string;
}

const services: ServiceCard[] = [
	{
		id: 'sns-marketing',
		title: 'SNS Marketing',
		description: '브랜드의 첫 반응, 지금 시작해야 합니다.',
		image: '/images/home/sns-marketing.jpg',
		bgColor: 'bg-[#dddddd]',
	},
	{
		id: 'sns-brand-channel',
		title: 'SNS BRAND Channel',
		description: "브랜드 '공식 채널' 세팅 노하우가 중요합니다.",
		image: '/images/home/sns-brand-channel.jpg',
		bgColor: 'bg-[#dddddd]',
	},
	{
		id: 'live-commerce',
		title: 'LIVE Commerce',
		description: '매출로 직결되는 왕홍의 퍼포먼스를 보여드립니다.',
		image: '/images/home/live-commerce.jpg',
		bgColor: 'bg-[#9fa7b3]',
	},
	{
		id: 'cnx-mall',
		title: 'CNX Mall',
		description: '한국 브랜드만을 위한 중국 플래그십 스토어가 열립니다.',
		image: '/images/home/cnx-mall.jpg',
		bgColor: 'bg-[#9fb3a5]',
	},
	{
		id: 'ppl-marketing',
		title: 'PPL Marketing',
		description: '차별화된 중국향 노출 PPL을 진행합니다',
		image: '/images/home/ppl-marketing.jpg',
		bgColor: 'bg-[#b3a49f]',
	},
];

export default function HorizontalScrollSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		const scrollContainer = scrollContainerRef.current;

		if (!section || !scrollContainer) return;

		// 수평 스크롤 너비 계산
		const getScrollAmount = () => {
			const scrollWidth = scrollContainer.scrollWidth;
			return -(scrollWidth - window.innerWidth);
		};

		// GSAP ScrollTrigger 애니메이션 설정
		const scrollTween = gsap.to(scrollContainer, {
			x: getScrollAmount,
			ease: 'none',
			scrollTrigger: {
				trigger: section,
				start: 'top top',
				end: () => `+=${scrollContainer.scrollWidth}`,
				pin: true,
				scrub: 1,
				invalidateOnRefresh: true,
				anticipatePin: 1,
			},
		});

		// 리사이즈 시 다시 계산
		const handleResize = () => {
			ScrollTrigger.refresh();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			// ScrollTrigger를 먼저 kill
			if (scrollTween.scrollTrigger) {
				scrollTween.scrollTrigger.kill();
			}
			// 그 다음 tween 자체를 kill
			scrollTween.kill();
		};
	}, []);

	return (
		<section ref={sectionRef} className="relative bg-white overflow-hidden scroll-section">
			<div className="h-screen flex flex-col">
				{/* Section Title */}
				<div className="bg-white py-12 px-10 flex-shrink-0">
					<div className="container mx-auto">
						<div className="flex flex-col md:flex-row items-center justify-center gap-2 text-[52px] font-black">
							<span className="text-[#333333]">중국시장 진출,</span>
							<div className="bg-brand-purple px-3 flex items-center gap-1">
								<Image src="/images/common/logo.svg" alt="BNB CNX Logo" width={152} height={24} className="w-auto object-contain" />
							</div>
							<span className="text-[#333333]">와 시작하세요.</span>
						</div>
					</div>
				</div>

				{/* Horizontal Scroll Container */}
				<div className="flex-1 flex items-center overflow-hidden ">
					<div ref={scrollContainerRef} className="flex scroll-container will-change-transform">
						{services.map(service => (
							<div key={service.id} className={`flex-shrink-0 w-[30vw] aspect-square rounded-[40px] ${service.bgColor} overflow-hidden relative group cursor-pointer scroll-item`}>
								{/* Background Image */}
								<div className="absolute inset-0 z-0">
									<Image src={service.image} alt={service.title} fill className="object-cover" />
								</div>

								{/* Card Content */}
								<div className="relative z-10 h-full flex flex-col justify-between bg-gradient-to-b from-black/30 to-transparent">
									<div className="flex justify-between items-start">
										<div className="text-white">
											<h3 className="text-[32px] font-black mb-3">{service.title}</h3>
											<p className="text-[20px] font-semibold leading-[1.35]">{service.description}</p>
										</div>

										{/* Arrow Button */}
										<button className="w-[72px] h-[72px] bg-brand-purple rounded-full flex items-center justify-center hover:scale-110 transition-transform">
											<ArrowRight className="w-7 h-7 text-brand-neon" />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
