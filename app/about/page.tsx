'use client';

import Image from 'next/image';
import { BlurFade } from '@/components/ui/blur-fade';

// 이미지 경로는 실제 이미지 파일로 대체
const imgHero = '/images/about/hero.jpg';
const imgLogoBnbCnx = '/images/logo-bnb-cnx.svg';

export default function About() {
	const historyItems = [
		{ year: '2014', text: 'Nanor Partner 설립 (중국 전역 커머스 플랫폼 진입)' },
		{ year: '2015', text: '타오바오 · 더우인 · 샤오홍슈 채널 확장 진입' },
		{ year: '2016', text: '중국 MCN 사업 시작, 왕홍 전속 계약 및 매니지먼트' },
		{ year: '2017', text: '한국 브랜드 전용 라이브 · 스토어 본격 운영' },
		{ year: '2018', text: '한국 브랜드 중국 총판 담당, 커머스 매출 본격화' },
		{ year: '2020', text: '누적 거래액 5,700억 원 돌파, 커머스 스튜디오 허브 구축' },
		{ year: '2021', text: '누적 거래액 1조 9,000억 원 / 채널 누적 팔로워 200만 명 돌파' },
		{ year: '2025', text: '연매출 3,000억 원 달성, 한국 법인 BNB CNX 설립 및 공식 플래그십몰 운영' },
	];

	return (
		<div className="min-h-screen cnx-wrapper space-y-4 md:space-y-10 about-page">
			{/* Hero Section with Background */}
			<div className="relative bg-black overflow-hidden hero-section">
				{/* Background Overlay */}
				<div className="absolute inset-0 bg-black/40 z-20" />
				<div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${imgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

				{/* Content */}
				<div className="relative z-40 pt-[160px] max-w-[1680px] mx-auto">
					<div className="max-w-[880px]">
						<p className="text-white font-semibold leading-relaxed uppercase">
							BNB CNX는
							<br />
							Commerce / Network / eXperience를
							<br className="hidden md:block" />
							핵심 키워드로 하는, 중국 연매출 3,000억원 규모의
							<br className="hidden md:block" />
							Nanor Partner의 브랜딩 & 커머스 한국 법인입니다.
						</p>
					</div>
				</div>

				{/* Logo */}
				<div className="absolute -right-4 -left-4 top-[120px] z-30 md:bottom-[50px] md:top-auto sm:z-10 lg:z-30 lg:w-1/2 lg:left-auto lg:-right-8 lg:bottom-[60px] xl:bottom-[80px]">
					<Image src={imgLogoBnbCnx} alt="BNB CNX Logo" width={355} height={355} className="w-auto object-contain" />
				</div>
			</div>
			{/* Vision Section */}
			<section className="bg-[#222222] overflow-hidden vision-section">
				<div className="container mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
						{/* Circles Diagram */}
						<div className="relative h-auto w-full">
							{/* <picture className="md:hidden">
								<source media="(max-width: 580px)" srcSet="/images/home/vision_m.svg" />
								<source media="(min-width: 581px)" srcSet="/images/home/vision.svg" />
								<img src="/images/home/vision.svg" alt="CNX-Vision" className="w-full h-auto object-cover" />
							</picture> */}
							<Image src="/images/about/vision.svg" alt="CNX-Vision" width={100} height={100} className="w-full object-cover hidden lg:block" />
							<div className="flex flex-col -space-y-8 md:flex-row md:-space-x-8 md:space-y-0 md:justify-around lg:hidden">
								<Image src="/images/about/vision-c.svg" alt="CNX-Vision" width={100} height={100} className="w-full md:w-1/3 h-auto object-cover" />
								<Image src="/images/about/vision-n.svg" alt="CNX-Vision" width={100} height={100} className="w-full md:w-1/3 h-auto object-cover" />
								<Image src="/images/about/vision-x.svg" alt="CNX-Vision" width={100} height={100} className="w-full md:w-1/3 h-auto object-cover" />
							</div>
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
			{/* BNB CNX의 차별성 */}
			<div className="bg-[#333333] about-cnx-difference flex flex-col">
				<h2 className="text-center">
					<span className="bg-brand-purple text-brand-neon font-extrabold uppercase px-[12px] py-[6px]">BNB CNX의 차별성</span>
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-[1600px] mx-auto about-cnx-difference-items">
					<div className="bg-[#222222] rounded-[24px] p-[48px] flex flex-col justify-between about-cnx-difference-item">
						<div className="space-y-2">
							<p className="text-white text-[24px] font-semibold uppercase leading-[1.35]">
								자체 커머스 채널
								<br />
								CNX 플랙그십
								<br />
								스토어 보유
							</p>
						</div>
						<div className="text-right">
							<i className="fa-light fa-warehouse-full text-[72px] text-brand-neon"></i>
						</div>
					</div>

					<div className="bg-[#222222] rounded-[24px] p-[48px] flex flex-col justify-between about-cnx-difference-item">
						<div className="space-y-2">
							<p className="text-white text-[24px] font-semibold uppercase leading-[1.35]">
								전속 왕홍 / 셀럽 /
								<br />
								LIVE / 물류 / 마케팅
								<br />
								직접 수행
							</p>
						</div>
						<div className="text-right">
							<i className="fa-light fa-bullseye-arrow text-[72px] text-brand-neon"></i>
						</div>
					</div>

					<div className="bg-[#222222] rounded-[24px] p-[48px] flex flex-col justify-between about-cnx-difference-item">
						<div className="space-y-2">
							<p className="text-white text-[24px] font-semibold uppercase leading-[1.35]">
								브랜딩부터 콘텐츠 제작,
								<br />
								유통, 판매 전환까지
								<br />
								직접 운영
							</p>
						</div>
						<div className="text-right">
							<i className="fa-light fa-clapperboard-play text-[72px] text-brand-neon"></i>
						</div>
					</div>

					<div className="bg-[#222222] rounded-[24px] p-[48px] flex flex-col justify-between about-cnx-difference-item">
						<div className="space-y-2">
							<p className="text-white text-[24px] font-semibold uppercase leading-[1.35]">
								이 모든 구조를 통해
								<br />
								성과로 증명하는
								<br />
								실행 파트너
							</p>
						</div>
						<div className="text-right">
							<i className="fa-light fa-handshake text-[72px] text-brand-neon"></i>
						</div>
					</div>
				</div>
			</div>

			{/* BNB CNX 연혁 */}
			<div className="bg-[#333333] about-history flex flex-col ">
				<h2 className="text-center">
					<span className="bg-brand-purple text-brand-neon font-extrabold uppercase px-[12px] py-[6px]">BNB CNX 연혁</span>
				</h2>

				<div className="max-w-[1000px] mx-auto flex flex-col about-history-items">
					{historyItems.map((item, index) => (
						<BlurFade key={index} delay={0.15 * index} inView>
							<div className="flex items-start md:items-center about-history-item">
								<div className="bg-[#222222] rounded-[100px] px-[16px] py-[8px]">
									<p className="text-brand-neon font-extrabold text-center uppercase flex-shrink-0 about-history-item-year">{item.year}</p>
								</div>
								<div className="flex-1 h-0 relative border-b border-dashed border-white/10"></div>
								<p className="text-white font-semibold uppercase about-history-item-text">{item.text}</p>
							</div>
						</BlurFade>
					))}
				</div>
			</div>
		</div>
	);
}
