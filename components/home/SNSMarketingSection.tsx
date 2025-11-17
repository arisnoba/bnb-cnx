'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BlurFade } from '../ui/blur-fade';
import ContactButton from '../common/ContactButton';
import { Marquee } from '../ui/marquee';
gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
	id: string;
	number: string;
	title: string;
	description: string;
	duration: number;
	images: string[];
	hashtags: string[][];
}

const services: ServiceItem[] = [
	{
		id: 'visit',
		number: '01',
		title: '방문형 체험단',
		description: '오프라인 매장 기반,\n현장 방문 후기 콘텐츠 + 방문객 유치',
		duration: 30,
		images: [
			'/images/home/visit-01.jpg',
			'/images/home/visit-02.jpg',
			'/images/home/visit-03.jpg',
			'/images/home/visit-04.jpg',
			'/images/home/visit-05.jpg',
			'/images/home/visit-06.jpg',
			'/images/home/visit-07.jpg',
		],
		hashtags: [
			['#맛집', '#리뷰'],
			['#패션', '#후기'],
			['#뷰티', '#리뷰'],
			['#미용', '#체험'],
			['#병원', '#방문'],
			['#호텔', '#숙박'],
			['#액티비티', '#체험단'],
		],
	},
	{
		id: 'product',
		number: '02',
		title: '제품형 체험단',
		description: '브랜드 제품 실사용 후기 중심 /\n노출 + 구매 전환 유도',
		duration: 20,
		images: ['/images/home/product-01.jpg', '/images/home/product-02.jpg', '/images/home/product-03.jpg', '/images/home/product-04.jpg'],
		hashtags: [
			['#패션', '#제품리뷰'],
			['#뷰티', '#코스메틱'],
			['#라이프', '#스타일'],
			['#건강식품', '#제품'],
		],
	},
	{
		id: 'journalist',
		number: '03',
		title: '기자단',
		description: '브랜드 제공 소스를 활용해\n홍보 방향성에 맞게 콘텐츠 발행',
		duration: 25,
		images: ['/images/home/journalist-01.jpg', '/images/home/journalist-02.jpg', '/images/home/journalist-03.jpg', '/images/home/journalist-04.jpg'],
		hashtags: [
			['#맛집', '#브랜딩'],
			['#숙소', '#리뷰'],
			['#뷰티', '#트렌드'],
			['#패션', '#스타일'],
		],
	},
];

export default function SNSMarketingSection() {
	const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const iconsSnapshot = iconsRef.current;
		// 약간의 delay를 줘서 ref가 확실히 할당된 후 실행
		const timer = setTimeout(() => {
			const icons = iconsSnapshot.filter(Boolean);

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
			const icons = iconsSnapshot.filter(Boolean);
			ScrollTrigger.getAll().forEach(t => t.kill());
			gsap.killTweensOf(icons);
		};
	}, []);

	return (
		<section id="sns-marketing" className="bg-[#f3f3f3] sns-marketing-section relative">
			<div className="max-w-[1000px] mx-auto">
				<div className="flex flex-col gap-10 sns-header-wrapper md:flex-row">
					{/* Header */}
					<div className="sns-header text-center md:text-left !mb-0 flex flex-col justify-center md:w-[60%]">
						<BlurFade className="inline-block self-center bg-brand-purple sns-title-wrapper md:self-start" inView delay={0.15}>
							<h2 className="font-black uppercase text-brand-neon">SNS Marketing</h2>
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
				<div className="flex flex-col sns-items">
					{services.map((service, index) => (
						<BlurFade key={service.id} className="overflow-hidden bg-white sns-item" inView delay={0.15 * index}>
							<div className="flex flex-col md:flex-row sns-item-grid">
								{index % 2 === 0 ? (
									<>
										{/* Info Card */}
										<div className="flex flex-col order-1 justify-between p-6 w-full md:w-1/3 bg-brand-purple sns-card-info md:p-8">
											<p className="mb-2 font-black text-brand-neon card-number md:mb-0">{service.number}</p>
											<div className="text-white">
												<h3 className="font-black card-title">{service.title}</h3>
												<p className="font-semibold whitespace-pre-line card-description">{service.description}</p>
											</div>
										</div>

										{/* Images Marquee */}
										<div className="overflow-hidden order-2 w-full md:w-2/3 sns-card-image-marquee">
											<Marquee reverse={false} pauseOnHover={true} duration={service.duration} className="p-0">
												{service.images.map((image, imgIndex) => (
													<div key={imgIndex} className="flex justify-center items-center overflow-hidden bg-[#a8a8a8] sns-card-image group">
														<div className="relative w-[300px] h-[320px]">
															<Image src={image} alt={`${service.title} ${imgIndex + 1}`} fill className="object-cover transition-transform duration-300 md:group-hover:scale-110" />
															{/* Overlay - Desktop: visible by default, hide on hover, Mobile: always visible */}
															<div className="flex absolute inset-0 justify-start items-end p-4 bg-black/50 opacity-100 md:transition-opacity md:duration-300 md:group-hover:opacity-0">
																<div className="flex flex-wrap gap-2">
																	{service.hashtags[imgIndex]?.map((tag, tagIndex) => (
																		<span key={tagIndex} className="px-3 py-1 text-sm font-bold rounded-full bg-brand-neon text-brand-purple">
																			{tag}
																		</span>
																	))}
																</div>
															</div>
														</div>
													</div>
												))}
											</Marquee>
										</div>
									</>
								) : (
									<>
										{/* Images Marquee */}
										<div className="overflow-hidden order-2 w-full md:w-2/3 md:order-1 sns-card-image-marquee">
											<Marquee reverse={true} pauseOnHover={true} duration={service.duration} className="p-0">
												{service.images.map((image, imgIndex) => (
													<div key={imgIndex} className="flex justify-center items-center overflow-hidden bg-[#a8a8a8] sns-card-image group">
														<div className="relative w-[300px] h-[320px]">
															<Image src={image} alt={`${service.title} ${imgIndex + 1}`} fill className="object-cover transition-transform duration-300 md:group-hover:scale-110" />
															{/* Overlay - Desktop: visible by default, hide on hover, Mobile: always visible */}
															<div className="flex absolute inset-0 justify-start items-end p-4 bg-black/50 opacity-100 md:transition-opacity md:duration-300 md:group-hover:opacity-0">
																<div className="flex flex-wrap gap-2">
																	{service.hashtags[imgIndex]?.map((tag, tagIndex) => (
																		<span key={tagIndex} className="px-3 py-1 text-sm font-bold rounded-full bg-brand-neon text-brand-purple">
																			{tag}
																		</span>
																	))}
																</div>
															</div>
														</div>
													</div>
												))}
											</Marquee>
										</div>

										{/* Info Card */}
										<div className="flex flex-col order-1 justify-between p-6 w-full md:w-1/3 bg-brand-purple sns-card-info md:p-8 md:order-2">
											<p className="mb-2 font-black text-brand-neon card-number md:mb-0">{service.number}</p>
											<div className="text-white">
												<h3 className="font-black card-title">{service.title}</h3>
												<p className="font-semibold whitespace-pre-line card-description">{service.description}</p>
											</div>
										</div>
									</>
								)}
							</div>
						</BlurFade>
					))}
				</div>
				<ContactButton />
			</div>
		</section>
	);
}
