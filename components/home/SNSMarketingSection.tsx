'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BlurFade } from '../ui/blur-fade';
gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
	id: string;
	number: string;
	title: string;
	description: string;
	images: string[];
}

const services: ServiceItem[] = [
	{
		id: 'visit',
		number: '01',
		title: '방문형 체험단',
		description: '오프라인 매장 기반,\n현장 방문 후기 콘텐츠 + 방문객 유치',
		images: ['/images/home/visit-01.jpg', '/images/home/visit-02.jpg'],
	},
	{
		id: 'product',
		number: '02',
		title: '제품형 체험단',
		description: '브랜드 제품 실사용 후기 중심 /\n노출 + 구매 전환 유도',
		images: ['/images/home/product-01.jpg', '/images/home/product-02.jpg'],
	},
	{
		id: 'journalist',
		number: '03',
		title: '기자단',
		description: '브랜드 제공 소스를 활용해\n홍보 방향성에 맞게 콘텐츠 발행',
		images: ['/images/home/journalist-01.jpg', '/images/home/journalist-02.jpg'],
	},
];

export default function SNSMarketingSection() {
	const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		// 약간의 delay를 줘서 ref가 확실히 할당된 후 실행
		const timer = setTimeout(() => {
			const icons = iconsRef.current.filter(Boolean);

			if (icons.length === 0) return;

			// 초기 상태 설정
			gsap.set(icons, {
				scale: 0,
				opacity: 0,
			});

			// ScrollTrigger로 화면에 들어올 때 순차적으로 애니메이션
			ScrollTrigger.create({
				trigger: '.sns-header-wrapper',
				start: 'top 80%',
				once: true,
				onEnter: () => {
					// 1단계: 뿅뿅 나타나는 애니메이션
					gsap.to(icons, {
						scale: 1,
						opacity: 1,
						duration: 0.6,
						ease: 'back.out(1.7)',
						stagger: 0.1,
						onComplete: () => {
							// 2단계: 둥둥 떠있는 루핑 애니메이션
							icons.forEach((icon, index) => {
								gsap.to(icon, {
									y: index % 2 === 0 ? -15 : -20,
									duration: 2 + index * 0.2,
									ease: 'sine.inOut',
									repeat: -1,
									yoyo: true,
									delay: index * 0.1,
								});

								// 살짝 회전하는 효과
								gsap.to(icon, {
									rotation: index % 2 === 0 ? 5 : -5,
									duration: 3 + index * 0.3,
									ease: 'sine.inOut',
									repeat: -1,
									yoyo: true,
									delay: index * 0.15,
								});
							});
						},
					});
				},
			});
		}, 100);

		return () => {
			clearTimeout(timer);
			const icons = iconsRef.current.filter(Boolean);
			ScrollTrigger.getAll().forEach(t => t.kill());
			gsap.killTweensOf(icons);
		};
	}, []);

	return (
		<section id="sns-marketing" className="bg-[#f3f3f3] sns-marketing-section relative">
			<div className="max-w-[1000px] mx-auto">
				<div className="sns-header-wrapper flex flex-col md:flex-row gap-10">
					{/* Header */}
					<div className="sns-header text-center md:text-left !mb-0 flex flex-col justify-center md:w-[60%]">
						<BlurFade className="bg-brand-purple sns-title-wrapper inline-block self-center md:self-start" inView delay={0.15}>
							<h2 className="font-black text-brand-neon uppercase">SNS Marketing</h2>
						</BlurFade>
						<BlurFade className="sns-description font-semibold text-[#333333]" inView delay={0.3}>
							<p>BNB CNX는 중국 소비자들의 SNS 반응을 실질적으로 확인할 수 있는 가장 효과적인 솔루션, SNS 마케팅을 제안합니다.</p>
						</BlurFade>
					</div>

					{/* Decoration */}
					<div className="sns-decoration md:w-[40%]">
						<div className="relative w-full h-auto">
							<div
								ref={el => {
									iconsRef.current[0] = el;
								}}
								className="absolute top-[25%] left-[10%]">
								<Image src="/images/home/sns/ic_bookmark.svg" alt="icon" width={62} height={62} className="object-contain" />
							</div>
							<div
								ref={el => {
									iconsRef.current[1] = el;
								}}
								className="absolute bottom-[26%] left-[15%]">
								<Image src="/images/home/sns/ic_like.svg" alt="icon" width={62} height={62} className="object-contain" />
							</div>
							<div
								ref={el => {
									iconsRef.current[2] = el;
								}}
								className="absolute bottom-[35%] right-[15%]">
								<Image src="/images/home/sns/ic_msg.svg" alt="icon" width={62} height={62} className="object-contain" />
							</div>
							<div
								ref={el => {
									iconsRef.current[3] = el;
								}}
								className="absolute bottom-[15%] right-[35%]">
								<Image src="/images/home/sns/ic_sms.svg" alt="icon" width={62} height={62} className="object-contain" />
							</div>
							<div
								ref={el => {
									iconsRef.current[4] = el;
								}}
								className="absolute top-[15%] right-[10%]">
								<Image src="/images/home/sns/ic_thumbs.svg" alt="icon" width={62} height={62} className="object-contain" />
							</div>
							<Image src="/images/home/sns/obj.png" alt="Decoration" width={440} height={436} className="object-contain mx-auto" />
						</div>
					</div>
				</div>

				{/* Service Items */}
				<div className="sns-items flex flex-col">
					{services.map((service, index) => (
						<BlurFade key={service.id} className="bg-white sns-item overflow-hidden" inView delay={0.15 * index}>
							<div className="grid grid-cols-1 md:grid-cols-3 sns-item-grid">
								{index % 2 === 0 ? (
									<>
										{/* Images */}
										{service.images.map((image, imgIndex) => (
											<div key={imgIndex} className="flex-1 bg-[#a8a8a8] sns-card-image border border-black/10 overflow-hidden relative aspect-[30/32] order-2 md:order-none">
												<Image src={image} alt={`${service.title} ${imgIndex + 1}`} fill className="object-cover" />
											</div>
										))}

										{/* Info Card */}
										<div className="flex-1 bg-brand-purple sns-card-info flex flex-col justify-between border border-black/10 aspect-auto md:aspect-[30/32] order-1 md:order-none">
											<p className="text-brand-neon card-number font-black mb-2 md:mb-0">{service.number}</p>
											<div className="text-white">
												<h3 className="card-title font-black">{service.title}</h3>
												<p className="card-description font-semibold whitespace-pre-line">{service.description}</p>
											</div>
										</div>
									</>
								) : (
									<>
										{/* Info Card */}
										<div className="flex-1 bg-brand-purple sns-card-info flex flex-col justify-between border border-black/10 aspect-auto md:aspect-[30/32] order-1 md:order-none">
											<p className="text-brand-neon card-number font-black mb-2 md:mb-0">{service.number}</p>
											<div className="text-white">
												<h3 className="card-title font-black">{service.title}</h3>
												<p className="card-description font-semibold whitespace-pre-line">{service.description}</p>
											</div>
										</div>

										{/* Images */}
										{service.images.map((image, imgIndex) => (
											<div key={imgIndex} className="flex-1 bg-[#a8a8a8] sns-card-image border border-black/10 overflow-hidden relative aspect-[30/32] order-2 md:order-none">
												<Image src={image} alt={`${service.title} ${imgIndex + 1}`} fill className="object-cover" />
											</div>
										))}
									</>
								)}
							</div>
						</BlurFade>
					))}
				</div>
			</div>
		</section>
	);
}
