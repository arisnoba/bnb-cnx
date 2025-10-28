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
		{ year: '2020', text: '누적 거래액 5,700억 원 돌파, 커머스 스튜디오 허브 구축, ChangSha' },
		{ year: '2021', text: '누적 거래액 1조 9,000억 원 / 채널 누적 팔로워 200만 명 돌파' },
		{ year: '2025', text: '연매출 3,000억 원 달성, 한국 법인 BNB CNX 설립 및 공식 플래그십몰 운영' },
	];

	return (
		<div className="min-h-screen cnx-wrapper space-y-4 md:space-y-10">
			{/* Hero Section with Background */}
			<div className="relative bg-[#a523d0] h-[724px] rounded-[60px] overflow-hidden">
				{/* Background Overlay */}
				<div className="absolute inset-0 bg-black/60" />
				<div className="absolute inset-0" style={{ backgroundImage: `url(${imgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

				{/* Content */}
				<div className="relative z-10 pt-[160px] max-w-[1680px] mx-auto">
					<div className="max-w-[880px]">
						<p className="text-white text-[24px] font-semibold leading-relaxed uppercase">
							BNB CNX는
							<br />
							Commerce / Network / eXperience를
							<br />
							핵심 키워드로 하는, 중국 연매출 3,000억원 규모의
							<br />
							Nanor Partner의 브랜딩 & 커머스 한국 법인입니다.
						</p>
					</div>
				</div>

				{/* Logo */}
				<div className="absolute right-0 top-[287px] hidden lg:block">
					<Image src={imgLogoBnbCnx} alt="BNB CNX Logo" width={355} height={355} className="h-[355px] w-auto object-contain" />
				</div>
			</div>
			{/* BNB CNX의 차별성 */}
			<div className="bg-[#333333] rounded-[60px] p-[120px] space-y-[120px]">
				<h2 className="text-center">
					<span className="bg-[#a523d0] text-[#baff00] text-[52px] font-extrabold uppercase px-[12px] py-[6px]">BNB CNX의 차별성</span>
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
					<div className="bg-[#222222] rounded-[24px] p-[48px] flex flex-col justify-between h-[380px]">
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

					<div className="bg-[#222222] rounded-[24px] p-[48px] flex flex-col justify-between h-[380px]">
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

					<div className="bg-[#222222] rounded-[24px] p-[48px] flex flex-col justify-between h-[380px]">
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

					<div className="bg-[#222222] rounded-[24px] p-[48px] flex flex-col justify-between h-[380px]">
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
			<div className="bg-[#333333] rounded-[60px] p-[120px] space-y-[120px]">
				<h2 className="text-center">
					<span className="bg-[#a523d0] text-[#baff00] text-[52px] font-extrabold uppercase px-[12px] py-[6px]">BNB CNX 연혁</span>
				</h2>

				<div className="max-w-[1000px] mx-auto space-y-[48px]">
					{historyItems.map((item, index) => (
						<BlurFade key={index} delay={0.15 * index} inView>
							<div className="flex items-center gap-[10px]">
								<div className="bg-[#222222] rounded-[100px] px-[16px] py-[10px] w-[100px] flex-shrink-0">
									<p className="text-[#baff00] text-[24px] font-extrabold text-center uppercase">{item.year}</p>
								</div>
								<div className="flex-1 h-0 relative border-b border-dashed border-[rgba(255,255,255,0.1)]">
									{/* <img src={item.line} alt="" className="absolute top-[-2px] left-0 right-0 w-full h-[2px]" /> */}
								</div>
								<p className="text-white text-[24px] font-semibold uppercase flex-shrink-0">{item.text}</p>
							</div>
						</BlurFade>
					))}
				</div>
			</div>
		</div>
	);
}
