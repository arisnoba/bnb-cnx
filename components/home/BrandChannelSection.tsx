'use client';

import FlowGrid from '@/components/shared/FlowGrid';
import FlowCard from '@/components/shared/FlowCard';
import Image from 'next/image';

export default function BrandChannelSection() {
	return (
		<section className="bg-white flow-grid-section">
			{/* Header */}
			<div className="flow-header items-center">
				<div className="bg-brand-purple flow-title-wrapper">
					<h2 className="font-black text-brand-neon uppercase whitespace-nowrap">BRAND Channel</h2>
				</div>

				<div className="flow-description text-center font-semibold text-[#333333]">
					<p>
						중국 소비자에게 브랜드 검색은 SNS 공식 채널 검색입니다. <br className="hidden md:block" />
						샤오홍슈 · 더우인 공식 계정 개설은 소비자 신뢰의 출발점입니다.
					</p>
				</div>
				<Image src="/images/home/brand/obj.png" alt="Brand Channel" width={670} height={580} className="md:hidden mt-4 object-contain" />
			</div>

			{/* Flow Grid */}
			<FlowGrid className="mt-[50px] md:mt-0">
				{/* 첫 번째 행 */}
				<FlowCard
					variant="primary"
					title={
						<>
							공식 채널 개설 및
							<br />
							운영 프로세스
						</>
					}
				/>

				<FlowCard variant="secondary" title="세팅" description={['브랜드 공식 계정 개설 & 공식 인증', '(타사 대비 50% 빠른 진행)']} icon={<i className="fa-light fa-badge-check" />} />

				<FlowCard variant="secondary" title="기획" description={['콘텐츠 큐레이션, 촬영 및 제작', '(브랜드와 실시간 소통)']} icon={<i className="fa-light fa-camcorder" />} />

				{/* 두 번째 행 */}
				<FlowCard variant="secondary" title="운영" description={['콘텐츠 제작 및 업로드', '+ 댓글·DM 응대', '(브랜드 전담팀 운영)']} icon={<i className="fa-light fa-message-smile" />} />

				<FlowCard variant="secondary" title="트래픽" description="유입 분석 & 월간 리포트 제공" icon={<i className="fa-light fa-file-chart-column" />} />

				<FlowCard variant="secondary" title="구매전환" description="공식몰, LIVE 커머스 링크 연동" icon={<i className="fa-light fa-store" />} />
			</FlowGrid>

			{/* Decorative Images - Optional */}
			{/* TODO: Add decorative images as per design */}
		</section>
	);
}
