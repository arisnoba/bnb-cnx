'use client';

import FlowGrid from '@/components/shared/FlowGrid';
import FlowCard from '@/components/shared/FlowCard';
import Image from 'next/image';
import { BlurFade } from '@/components/ui/blur-fade';

export default function OfficialStoreSection() {
	return (
		<section className="bg-[#F3F3F3] flow-grid-section overflow-hidden">
			{/* Header */}
			<div className="flow-header max-w-[1000px] mx-auto relative">
				<BlurFade className="bg-brand-purple flow-title-wrapper z-10" inView delay={0.15}>
					<h2 className="font-black text-brand-neon uppercase whitespace-nowrap">Official Store</h2>
				</BlurFade>

				<BlurFade className="flow-description font-semibold text-[#333333] z-10" inView delay={0.3}>
					<p>
						중국 소비자에게 신뢰 기반의 구매 전환을 이끄는 핵심은 <br className="hidden md:block" />
						SNS 내 공식몰 개설과 체계적인 운영입니다. <br />
						BNB CNX는 브랜드 맞춤형 <br className="hidden md:block lg:hidden" />
						'공식몰 셋업 + 운영 대행'을 제공합니다.
					</p>
				</BlurFade>
				<Image
					src="/images/home/store/obj.png"
					alt="Official Store"
					width={510}
					height={616}
					className="w-[80vw] mx-auto md:absolute md:w-[45vw] md:-right-[11%] md:-top-[40px] lg:w-[40vw] lg:-right-[5%] lg:-top-[60px] xl:-right-[15%] xl:-top-[60px] max-w-[510px] object-contain md:block -z-1"
				/>
			</div>

			{/* Flow Grid */}
			<FlowGrid className="-mt-[100px] md:-mt-0">
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
					className="bg-white"
					icon={<i className="fa-light fa-award" />}
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
					description={['중국어 상세페이지 제작, 재고 등록 및 관리, 플랫폼 특성에 맞는 키워드 및 컨텐츠 최적화']}
					className="bg-white"
					icon={<i className="fa-light fa-camcorder" />}
				/>

				{/* 두 번째 행 */}

				<FlowCard
					variant="secondary"
					title={
						<>
							어드민 운영
							<br />
							성과 관리
						</>
					}
					description={['공식 계정, 왕홍 콘텐츠, PPL 및 LIVE와 연계하여 공식몰 링크 유입 및 구매전환 극대화']}
					className="bg-white"
					icon={<i className="fa-light fa-comments-question-check" />}
				/>

				<FlowCard
					variant="secondary"
					title={
						<>
							콘텐츠 기반 <br />
							트래픽 유입 설계
						</>
					}
					description={['CS 문의 응대, 배송관리, 재고 모니터링, 교환/환불 처리까지 전문 매니저가 어드민 백오피스 실시간 관리']}
					className="bg-white"
					icon={<i className="fa-light fa-arrows-to-circle" />}
				/>

				<FlowCard
					variant="secondary"
					title={
						<>
							리포트 & <br />
							성과 관리
						</>
					}
					description={['매출, 방문수, 전환율, 유입 경로 등 실시간 공식몰 운영 리포트 제공']}
					className="bg-white"
					icon={<i className="fa-light fa-ranking-star" />}
				/>
			</FlowGrid>
		</section>
	);
}
