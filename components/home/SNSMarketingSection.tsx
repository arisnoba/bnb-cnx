'use client';

import Image from 'next/image';

interface ServiceItem {
	id: string;
	number: string;
	title: string;
	description: string;
	images: string[];
}

const services: ServiceItem[] = [
	{
		id: 'visit',
		number: '01',
		title: '방문형 체험단',
		description: '오프라인 매장 기반,\n현장 방문 후기 콘텐츠 + 방문객 유치',
		images: ['/images/home/visit-01.jpg', '/images/home/visit-02.jpg'],
	},
	{
		id: 'product',
		number: '02',
		title: '제품형 체험단',
		description: '브랜드 제품 실사용 후기 중심 /\n노출 + 구매 전환 유도',
		images: ['/images/home/product-01.jpg', '/images/home/product-02.jpg'],
	},
	{
		id: 'journalist',
		number: '03',
		title: '기자단',
		description: '브랜드 제공 소스를 활용해\n홍보 방향성에 맞게 콘텐츠 발행',
		images: ['/images/home/journalist-01.jpg', '/images/home/journalist-02.jpg'],
	},
];

export default function SNSMarketingSection() {
	return (
		<section id="sns-marketing" className="bg-[#f3f3f3] sns-marketing-section relative">
			<div className="max-w-[1000px] mx-auto">
				{/* Header */}
				<div className="sns-header text-center md:text-left">
					<div className="bg-brand-purple inline-block sns-title-wrapper">
						<h2 className="font-black text-brand-neon uppercase">SNS Marketing</h2>
					</div>
					<p className="sns-description font-semibold text-[#333333]">
						BNB CNX는 <br className="hidden md:block" />
						중국 소비자들의 SNS 반응을 실질적으로 확인할 수 있는 <br className="hidden md:block" />
						가장 효과적인 솔루션, SNS 마케팅을 제안합니다.
					</p>
				</div>

				{/* Decoration */}
				{/* <div className="sns-decoration">
					<div className="relative w-full h-full">
						<Image src="/images/home/image-39.jpg" alt="Decoration" fill className="object-cover" />
					</div>
				</div> */}

				{/* Service Items */}
				<div className="sns-items flex flex-col">
					{services.map((service, index) => (
						<div key={service.id} className="bg-white sns-item overflow-hidden">
							<div className="grid grid-cols-1 md:grid-cols-3 sns-item-grid">
								{index % 2 === 0 ? (
									<>
										{/* Images */}
										{service.images.map((image, imgIndex) => (
											<div key={imgIndex} className="flex-1 bg-[#a8a8a8] sns-card-image border border-black/10 overflow-hidden relative aspect-[30/32] order-2 md:order-none">
												<Image src={image} alt={`${service.title} ${imgIndex + 1}`} fill className="object-cover" />
											</div>
										))}

										{/* Info Card */}
										<div className="flex-1 bg-brand-purple sns-card-info flex flex-col justify-between border border-black/10 aspect-[30/32] order-1 md:order-none">
											<p className="text-brand-neon card-number font-black">{service.number}</p>
											<div className="text-white">
												<h3 className="card-title font-black">{service.title}</h3>
												<p className="card-description font-semibold whitespace-pre-line">{service.description}</p>
											</div>
										</div>
									</>
								) : (
									<>
										{/* Info Card */}
										<div className="flex-1 bg-brand-purple sns-card-info flex flex-col justify-between border border-black/10 aspect-[30/32] order-1 md:order-none">
											<p className="text-brand-neon card-number font-black">{service.number}</p>
											<div className="text-white">
												<h3 className="card-title font-black">{service.title}</h3>
												<p className="card-description font-semibold whitespace-pre-line">{service.description}</p>
											</div>
										</div>

										{/* Images */}
										{service.images.map((image, imgIndex) => (
											<div key={imgIndex} className="flex-1 bg-[#a8a8a8] sns-card-image border border-black/10 overflow-hidden relative aspect-[30/32] order-2 md:order-none">
												<Image src={image} alt={`${service.title} ${imgIndex + 1}`} fill className="object-cover" />
											</div>
										))}
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
