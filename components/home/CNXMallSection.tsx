'use client';

import Image from 'next/image';
import { Marquee } from '@/components/ui/marquee';
import { BlurFade } from '@/components/ui/blur-fade';

const productImages = [
	'/images/home/marquee/marquee-01.jpg',
	'/images/home/marquee/marquee-02.jpg',
	'/images/home/marquee/marquee-03.jpg',
	'/images/home/marquee/marquee-04.jpg',
	'/images/home/marquee/marquee-05.jpg',
	'/images/home/marquee/marquee-06.jpg',
	'/images/home/marquee/marquee-07.jpg',
	'/images/home/marquee/marquee-08.jpg',
	'/images/home/marquee/marquee-09.jpg',
	'/images/home/marquee/marquee-10.jpg',
	'/images/home/marquee/marquee-11.jpg',
	'/images/home/marquee/marquee-12.jpg',
	'/images/home/marquee/marquee-13.jpg',
];

export default function CNXMallSection() {
	return (
		<section className="bg-white cnx-mall-section relative overflow-hidden">
			{/* Header with Marquees - Full Width */}
			<div className="cnx-mall-header-wrapper">
				<div className="cnx-mall-header text-center">
					{/* Desktop Layout: Marquee Left - Title - Marquee Right */}
					<div className="cnx-mall-header-desktop">
						{/* Marquee Left */}
						<div className="cnx-mall-marquee-horizontal cnx-mall-marquee-left">
							<Marquee className="w-full" pauseOnHover={false}>
								{productImages.map((image, index) => (
									<div key={index} className="cnx-product-card bg-white overflow-hidden flex items-center justify-center">
										<div className="relative cnx-product-image">
											<Image src={image} alt={`제품 ${index + 1}`} fill className="object-contain" />
										</div>
									</div>
								))}
							</Marquee>
						</div>

						{/* Title */}
						<div className="cnx-mall-title-container">
							<div className="bg-brand-purple inline-block cnx-mall-title-wrapper">
								<h2 className="font-black text-brand-neon uppercase">CNX Mall</h2>
							</div>
						</div>

						{/* Marquee Right */}
						<div className="cnx-mall-marquee-horizontal cnx-mall-marquee-right">
							<Marquee className="w-full" pauseOnHover={false} reverse>
								{productImages.map((image, index) => (
									<div key={index} className="cnx-product-card bg-white overflow-hidden flex items-center justify-center">
										<div className="relative cnx-product-image">
											<Image src={image} alt={`제품 ${index + 1}`} fill className="object-contain" />
										</div>
									</div>
								))}
							</Marquee>
						</div>
					</div>

					{/* Mobile Layout: Title - Description (no marquees here) */}
					<div className="cnx-mall-header-mobile">
						{/* Title */}
						<div className="bg-brand-purple inline-block cnx-mall-title-wrapper">
							<h2 className="font-black text-brand-neon uppercase">CNX Mall</h2>
						</div>

						{/* Description */}
						<p className="cnx-mall-description font-semibold text-[#222222]">
							CNX 플래그십 스토어는 샤오홍슈·더우인·타오바오
							<br />내 공식 한국 브랜드관을 개설해
							<br />
							중국 소비자에게 신뢰 기반 구매 전환을 만듭니다.
						</p>
					</div>

					{/* Desktop Description */}
					<p className="cnx-mall-description cnx-mall-description-desktop font-semibold text-[#222222]">
						CNX 플래그십 스토어는 샤오홍슈·더우인·타오바오
						<br />내 공식 한국 브랜드관을 개설해
						<br />
						중국 소비자에게 신뢰 기반 구매 전환을 만듭니다.
					</p>
				</div>
			</div>

			{/* Mobile Marquees - Below Description, Full Width */}
			<div className="cnx-mall-marquees-mobile-wrapper">
				<Marquee className="w-full cnx-marquee-mobile-row" pauseOnHover={false}>
					{productImages.map((image, index) => (
						<div key={`mobile1-${index}`} className="cnx-product-card-mobile bg-white overflow-hidden flex items-center justify-center">
							<div className="relative cnx-product-image-mobile">
								<Image src={image} alt={`제품 ${index + 1}`} fill className="object-contain" />
							</div>
						</div>
					))}
				</Marquee>
				<Marquee className="w-full cnx-marquee-mobile-row" pauseOnHover={false} reverse>
					{productImages.map((image, index) => (
						<div key={`mobile2-${index}`} className="cnx-product-card-mobile bg-white overflow-hidden flex items-center justify-center">
							<div className="relative cnx-product-image-mobile">
								<Image src={image} alt={`제품 ${index + 1}`} fill className="object-contain" />
							</div>
						</div>
					))}
				</Marquee>
			</div>

			{/* Main Content Container - Only Cards */}
			<div className="max-w-[1000px] mx-auto relative z-10">
				{/* Cards */}
				<div className="cnx-mall-cards flex flex-col">
					{/* Card 1 - 소개 */}
					<div className="bg-[#f3f3f3] cnx-mall-card overflow-hidden">
						<BlurFade className="cnx-mall-card-content" inView delay={0.15}>
							{/* Text Content */}
							<div className="cnx-mall-card-text">
								<h3 className="text-brand-purple font-black cnx-mall-card-title">CNX 플래그십 스토어 소개</h3>
								<div className="text-[#666666] font-semibold cnx-mall-card-description">
									<p>• 샤오홍슈 · 더우인 · 타오바오 내 한국 브랜드 셀럽샵 공식몰 운영</p>
									<p>• 플랫폼별 브랜드 콘텐츠 업로드, 팔로워 · 조회수 중심 노출</p>
									<p>• 콘텐츠 기반 CTR & 구매 전환 최적화 세팅</p>
								</div>
							</div>

							{/* Phone Image */}
							<div className="cnx-mall-card-phone bg-[#d3d3d3] overflow-hidden">
								<div className="relative aspect-[5/4]">
									<Image src="/images/home/mall-01.jpg" alt="CNX Mall 앱" fill className="object-cover" />
								</div>
							</div>
						</BlurFade>
					</div>

					{/* Card 2 - 베네핏 */}
					<div className="bg-[#f3f3f3] cnx-mall-card overflow-hidden">
						<BlurFade className="cnx-mall-card-content cnx-mall-card-reverse" inView delay={0.15}>
							{/* Desktop Image */}
							<div className="cnx-mall-card-desktop bg-[#c2c2c2] overflow-hidden">
								<div className="relative aspect-[5/4]">
									<Image src="/images/home/mall-02.jpg" alt="CNX Mall 웹사이트" fill className="object-cover" />
								</div>
							</div>

							{/* Text Content */}
							<div className="cnx-mall-card-text">
								<h3 className="text-brand-purple font-black cnx-mall-card-title">
									CNX 플래그십 스토어
									<br />
									브랜드 입점 베네핏
								</h3>
								<div className="text-[#666666] font-semibold cnx-mall-card-description">
									<p>• 공식몰 무료 입점 + 1개월 운영비 무료 (선착순 브랜드 대상)</p>
									<p>• 브랜드 콘텐츠 제작 지원, 상세페이지 현지화, 상품별 CS 대응</p>
									<p>• BNB CNX 전속 왕홍 협업, LIVE 커머스 · PPL 연계 가능</p>
								</div>
							</div>
						</BlurFade>
					</div>
				</div>
			</div>
		</section>
	);
}
