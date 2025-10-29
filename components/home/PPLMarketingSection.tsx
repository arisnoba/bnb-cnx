'use client';

import Image from 'next/image';
import { BlurFade } from '@/components/ui/blur-fade';

export default function PPLMarketingSection() {
	return (
		<section className="bg-[#f3f3f3] ppl-marketing-section relative">
			<div className="max-w-[1000px] mx-auto">
				{/* Header */}
				<div className="ppl-header text-center md:text-left">
					<BlurFade className="bg-brand-purple inline-block ppl-title-wrapper" inView delay={0.15}>
						<h2 className="font-black text-brand-neon uppercase">PPL Marketing</h2>
					</BlurFade>
					<BlurFade className="ppl-description font-semibold text-[#222222]" inView delay={0.3}>
						<p>
							BNB CNX는 한국 콘텐츠 기반 글로벌 PPL 전략을 통해 브랜드 협찬 <br className="hidden md:block" />
							소스를 중국향 SNS 마케팅에 집중적 활용할 수 있습니다.
						</p>
					</BlurFade>
				</div>

				{/* Cards */}
				<div className="ppl-cards flex flex-col">
					{/* Card 1 */}
					<BlurFade className="bg-white ppl-card overflow-hidden" inView delay={0.15}>
						<div className="ppl-card-content">
							{/* Text Content */}
							<div className="ppl-card-text">
								<h3 className="text-brand-purple font-black ppl-card-title">
									한국 콘텐츠 시청 중국 소비자를
									<br />
									위한 BNB CNX PPL
								</h3>
								<div className="text-[#666666] font-semibold ppl-card-description">
									<p>• 드라마·예능·영화 등 한류 메인 콘텐츠를 중심으로 한 협찬 마케팅</p>
									<p>• 협찬 제품 이미지를 커머스 상세페이지, SNS 시딩 마케팅, 왕홍 협업에 활용</p>
								</div>
							</div>

							{/* Images */}
							<div className="ppl-card-images">
								<div className="relative ppl-image-wrapper overflow-hidden aspect-[2/3]">
									<Image src="/images/home/drama-01.jpg" alt="킹더랜드" fill className="object-cover" />
									<div className="absolute inset-0 bg-black/20" />
								</div>
								<div className="relative ppl-image-wrapper overflow-hidden aspect-[2/3]">
									<Image src="/images/home/drama-02.jpg" alt="소용없어 거짓말" fill className="object-cover" />
								</div>
							</div>
						</div>
					</BlurFade>

					{/* Card 2 */}
					<BlurFade className="bg-white ppl-card overflow-hidden" inView delay={0.45}>
						<div className="ppl-card-content ppl-card-reverse">
							{/* Images Grid */}
							<div className="ppl-card-grid-images">
								<div className="relative ppl-grid-image overflow-hidden">
									<Image src="/images/home/ppl-01.jpg" alt="PPL 효과 1" fill className="object-cover" />
									<div className="absolute ppl-play-button">
										<svg width="19" height="19" viewBox="0 0 19 19" fill="none">
											<circle cx="9.5" cy="9.5" r="9.5" fill="#baff00" />
											<path d="M7 5.5L13 9.5L7 13.5V5.5Z" fill="#222222" />
										</svg>
									</div>
								</div>
								<div className="relative ppl-grid-image overflow-hidden">
									<Image src="/images/home/ppl-02.jpg" alt="PPL 효과 2" fill className="object-cover" />
									<div className="absolute ppl-play-button">
										<svg width="19" height="19" viewBox="0 0 19 19" fill="none">
											<circle cx="9.5" cy="9.5" r="9.5" fill="#baff00" />
											<path d="M7 5.5L13 9.5L7 13.5V5.5Z" fill="#222222" />
										</svg>
									</div>
								</div>
								<div className="relative ppl-grid-image overflow-hidden">
									<Image src="/images/home/ppl-03.jpg" alt="PPL 효과 3" fill className="object-cover" />
									<div className="absolute ppl-play-button">
										<svg width="19" height="19" viewBox="0 0 19 19" fill="none">
											<circle cx="9.5" cy="9.5" r="9.5" fill="#baff00" />
											<path d="M7 5.5L13 9.5L7 13.5V5.5Z" fill="#222222" />
										</svg>
									</div>
								</div>
								<div className="relative ppl-grid-image overflow-hidden">
									<Image src="/images/home/ppl-04.jpg" alt="PPL 효과 4" fill className="object-cover" />
									<div className="absolute ppl-play-button">
										<svg width="19" height="19" viewBox="0 0 19 19" fill="none">
											<circle cx="9.5" cy="9.5" r="9.5" fill="#baff00" />
											<path d="M7 5.5L13 9.5L7 13.5V5.5Z" fill="#222222" />
										</svg>
									</div>
								</div>
							</div>

							{/* Text Content */}
							<div className="ppl-card-text">
								<h3 className="text-brand-purple font-black ppl-card-title">
									BNB CNX의 글로벌 PPL,
									<br />
									정말 효과 있나요?
								</h3>
								<div className="text-[#666666] font-semibold ppl-card-description">
									<p>• 한국 셀럽이 사용하는 브랜드 제품의 주인공이 될 수 있습니다.</p>
									<p>• 콘텐츠 제작 환경을 총괄하기 때문에 제품 노출 설계가 용이합니다.</p>
									<p>• 어느 PPL보다 확실한 노출 효과, 브랜드에서 직접 확인할 수 있습니다.</p>
								</div>
							</div>
						</div>
					</BlurFade>
				</div>
			</div>
		</section>
	);
}
