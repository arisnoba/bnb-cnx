'use client';

import { useEffect, useRef } from 'react';
import FlowGrid from '@/components/shared/FlowGrid';
import FlowCard from '@/components/shared/FlowCard';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandChannelSection() {
	const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
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
				trigger: '.flow-header',
				start: 'top 80%',
				once: true,
				onEnter: () => {
					// 1단계: 뿅뿅 나타나는 애니메이션
					gsap.to(icons, {
						scale: 1,
						opacity: 1,
						duration: 0.6,
						ease: 'back.out(1.7)',
						stagger: 0.15,
						onComplete: () => {
							// 2단계: 둥둥 떠있는 루핑 애니메이션
							icons.forEach((icon, index) => {
								gsap.to(icon, {
									y: index % 2 === 0 ? -20 : -15,
									duration: 2.5 + index * 0.3,
									ease: 'sine.inOut',
									repeat: -1,
									yoyo: true,
									delay: index * 0.1,
								});

								// 살짝 회전하는 효과
								gsap.to(icon, {
									rotation: index % 2 === 0 ? 8 : -8,
									duration: 3.5 + index * 0.4,
									ease: 'sine.inOut',
									repeat: -1,
									yoyo: true,
									delay: index * 0.2,
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
		<section className="bg-white flow-grid-section">
			{/* Header */}
			<div className="flow-header items-center relative max-w-[1000px] mx-auto">
				<div className="bg-brand-purple flow-title-wrapper">
					<h2 className="font-black text-brand-neon uppercase whitespace-nowrap">BRAND Channel</h2>
				</div>

				<div className="flow-description text-center font-semibold text-[#333333]">
					<p>
						중국 소비자에게 브랜드 검색은 SNS 공식 채널 검색입니다. <br className="hidden md:block" />
						샤오홍슈 · 더우인 공식 계정 개설은 소비자 신뢰의 출발점입니다.
					</p>
				</div>
				<div className="">
					<div
						ref={el => {
							iconsRef.current[0] = el;
						}}
						className="hidden md:block absolute -top-[70%] right-[10%]">
						<Image src="/images/home/brand/ic_check.png" alt="Brand Channel" width={132} height={132} className="object-contain" />
					</div>
					<div
						ref={el => {
							iconsRef.current[1] = el;
						}}
						className="hidden md:block absolute -bottom-[20%] right-[0%]">
						<Image src="/images/home/brand/ic_rednote.png" alt="Brand Channel" width={132} height={132} className="object-contain" />
					</div>
					<div
						ref={el => {
							iconsRef.current[2] = el;
						}}
						className="hidden md:block absolute -top-[25%] left-[5%]">
						<Image src="/images/home/brand/ic_tictok.png" alt="Brand Channel" width={132} height={132} className="object-contain" />
					</div>
					{/* 모바일용 */}
					<Image src="/images/home/brand/obj.png" alt="Brand Channel" width={670} height={580} className="md:hidden mt-4 object-contain" />
				</div>
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
