'use client';

import FlowGrid from '@/components/shared/FlowGrid';
import FlowCard from '@/components/shared/FlowCard';
import Image from 'next/image';
import { BlurFade } from '@/components/ui/blur-fade';

export default function LiveCommerceSection() {
	return (
		<section id="live-commerce" className="bg-[#9FA7B3] flow-grid-section !px-0">
			{/* Header */}
			<div className="flow-header max-w-[1000px] mx-auto items-center md:items-end relative flow-grid-section-content">
				<BlurFade className="bg-brand-purple flow-title-wrapper" inView delay={0.15}>
					<h2 className="font-black uppercase whitespace-nowrap text-brand-neon">LIVE Commerce</h2>
				</BlurFade>

				<BlurFade className="flow-description text-center md:text-right font-semibold text-[#333333]" inView delay={0.3}>
					<p>
						BNB CNX는 &apos;팔리는 구조&apos;까지 설계합니다. <br />
						왕홍 매칭 → 예열 콘텐츠 기획 → 판매 채널 확보 → 구매 & CS까지
					</p>
				</BlurFade>
				<Image src="/images/home/live/obj.png" alt="LIVE Commerce" width={1000} height={1000} className="md:absolute md:-left-[40%] md:-top-[100px] bottom-0 object-contain md:block " />
			</div>

			<div className="max-w-[1000px] mx-auto bg-gradient-to-b from-[#F3F3F3] to-[#9FA7B3] flow-grid-section-content pt-10 !md:bg-transparent md:bg-gradient-to-b md:from-[#9FA7B3] md:to-[#9FA7B3]">
				<h4 className="mb-4 text-2xl font-bold text-left md:text-right md:text-3xl md:text-brand-neon">진행 프로세스</h4>
				{/* Flow Grid */}
				<FlowGrid className="-mt-[20px] md:-mt-0">
					{/* 첫 번째 행 */}
					<FlowCard variant="primary" title="진행 프로세스" className="hidden" />

					<FlowCard
						variant="secondary"
						title="기획"
						description={['브랜드 맞춤 ', '왕홍 매칭 또는 브랜드 자체 LIVE 기획']}
						className="bg-white"
						icon={<i className="fa-light fa-screen-users" />}
					/>

					<FlowCard
						variant="secondary"
						title="사전 미팅"
						description={['브랜드 스토리 + 세일즈 전략 + 콘텐츠 기획 + 물류 실행 등에 대한 가이드라인 논의']}
						className="bg-white"
						icon={<i className="fa-light fa-handshake" />}
					/>

					{/* 두 번째 행 */}
					<FlowCard variant="secondary" title="티징" description="사전 예열 콘텐츠 및 판매 제품 시딩 작업" className="bg-white" icon={<i className="fa-light fa-cards" />} />

					<FlowCard
						variant="secondary"
						title="LIVE"
						description="실시간 트래픽 유입 확보 및 시청자 Q&A 인터랙션을 통한 높은 구매 전환율 설계"
						className="bg-white"
						icon={<i className="fa-light fa-tv-retro" />}
					/>

					<FlowCard variant="secondary" title="배송" description="실시간 주문 → CS까지 통합 관리" className="bg-white" icon={<i className="fa-light fa-truck-bolt" />} />
				</FlowGrid>
			</div>
		</section>
	);
}
