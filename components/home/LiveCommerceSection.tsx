'use client';

import FlowGrid from '@/components/shared/FlowGrid';
import FlowCard from '@/components/shared/FlowCard';
import Image from 'next/image';

export default function BrandChannelSection() {
	return (
		<section className="bg-[#9FA7B3] flow-grid-section !px-0">
			{/* Header */}
			<div className="flow-header max-w-[1000px] mx-auto items-center md:items-end relative flow-grid-section-content">
				<div className="bg-brand-purple flow-title-wrapper">
					<h2 className="font-black text-brand-neon uppercase whitespace-nowrap">LIVE Commerce</h2>
				</div>

				<div className="flow-description text-center md:text-right font-semibold text-[#333333]">
					<p>
						BNB CNX는 ‘팔리는 구조’까지 설계합니다. <br />
						왕흥 매칭→예열 콘텐츠기획→판매 채널 확보→구매 & CS까지
					</p>
				</div>
				<Image src="/images/home/live/obj.png" alt="LIVE Commerce" width={1000} height={1000} className="md:absolute md:-left-[40%] md:-top-[100px] bottom-0 object-contain md:block " />
			</div>

			<div className="max-w-[1000px] mx-auto bg-gradient-to-b from-[#F3F3F3] to-[#9FA7B3] flow-grid-section-content pt-10 !md:bg-transparent md:bg-gradient-to-b md:from-[#9FA7B3] md:to-[#9FA7B3]">
				<h4 className="md:text-right text-left mb-4 text-2xl md:text-3xl font-bold md:text-brand-neon">진행 프로세스</h4>
				{/* Flow Grid */}
				<FlowGrid className="-mt-[20px] md:-mt-0">
					{/* 첫 번째 행 */}
					<FlowCard variant="primary" title="진행 프로세스" className="hidden" />

					<FlowCard variant="secondary" title="기획" description={['브랜드 맞춤 ', '전속 왕홍 DB 서칭']} className="bg-white" icon={<i className="fa-light fa-screen-users" />} />

					<FlowCard variant="secondary" title="사전 미팅" description={['왕홍 & 브랜드', 'LIVE 커머스 기획']} className="bg-white" icon={<i className="fa-light fa-handshake" />} />

					{/* 두 번째 행 */}
					<FlowCard variant="secondary" title="티징" description="사전 콘텐츠 제작 및 업로드" className="bg-white" icon={<i className="fa-light fa-cards" />} />

					<FlowCard variant="secondary" title="LIVE" description="브랜드 공식몰 or CNX 판매 채널 LIVE" className="bg-white" icon={<i className="fa-light fa-tv-retro" />} />

					<FlowCard variant="secondary" title="배송" description="실시간 주문 → CS까지 통합 관리" className="bg-white" icon={<i className="fa-light fa-truck-bolt" />} />
				</FlowGrid>
			</div>
		</section>
	);
}
