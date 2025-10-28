'use client';

import FlowGrid from '@/components/shared/FlowGrid';
import FlowCard from '@/components/shared/FlowCard';

export default function BrandChannelSection() {
	return (
		<section className="bg-white flow-grid-section">
			{/* Header */}
			<div className="flow-header">
				<div className="bg-brand-purple flow-title-wrapper">
					<h2 className="font-black text-brand-neon uppercase whitespace-nowrap">Official Store</h2>
				</div>

				<div className="flow-description text-center font-semibold text-[#333333]">
					<p>
						중국 소비자에게 신뢰 기반의 구매 전환을 이끄는 핵심은 <br />
						SNS 내 공식몰 개설과 체계적인 운영입니다. <br />
						BNB CNX는 브랜드 맞춤형 ‘공식몰 셋업 + 운영 대행’을 제공합니다.
					</p>
				</div>
			</div>

			{/* Flow Grid */}
			<FlowGrid>
				{/* 첫 번째 행 */}
				<FlowCard
					variant="primary"
					title={
						<>
							공식몰 개설 및
							<br />
							운영 프로세스
						</>
					}
				/>

				<FlowCard
					variant="secondary"
					title={
						<>
							공식몰 입점
							<br />& 셋업
						</>
					}
					description={['브랜드 공식 계정 개설 & 공식 인증', '(타사 대비 50% 빠른 진행)']}
					icon={<i className="fa-light fa-badge-check" />}
				/>

				<FlowCard
					variant="secondary"
					title={
						<>
							제품 등록 &
							<br />
							상세페이지 현지화
						</>
					}
					description={['콘텐츠 큐레이션, 촬영 및 제작', '(브랜드와 실시간 소통)']}
					icon={<i className="fa-light fa-camcorder" />}
				/>

				{/* 두 번째 행 */}

				<FlowCard
					variant="secondary"
					title={
						<>
							콘텐츠 기반 <br />
							트래픽 유입 설계
						</>
					}
					icon={<i className="fa-light fa-chart-mixed" />}
				/>
				<FlowCard
					variant="secondary"
					title={
						<>
							어드민 운영
							<br />
							성과 관리
						</>
					}
					icon={<i className="fa-light fa-chalkboard-user" />}
				/>

				<FlowCard
					variant="secondary"
					className="order-4 md:order-6"
					title={
						<>
							리포트 & <br />
							성과 관리
						</>
					}
					icon={<i className="fa-light fa-store" />}
				/>
			</FlowGrid>

			{/* Decorative Images - Optional */}
			{/* TODO: Add decorative images as per design */}
		</section>
	);
}
