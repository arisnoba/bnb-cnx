import { Marquee } from '@/components/ui/marquee';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const partnerLogos = [
	{ name: 'MCM', src: '/images/partners/logo-01.png' },
	{ name: 'Charles & Keith', src: '/images/partners/logo-02.png' },
	{ name: 'Pedro', src: '/images/partners/logo-03.png' },
	{ name: 'Beau Today', src: '/images/partners/logo-04.png' },
	{ name: 'Moda Mind', src: '/images/partners/logo-05.png' },
	{ name: 'Evana Cheung', src: '/images/partners/logo-06.png' },
	{ name: 'Tambur', src: '/images/partners/logo-07.png' },
];

export default function Footer() {
	return (
		<footer className="flex flex-col">
			{/* Logo Marquee Section */}
			<div className="bg-white border-t border-black/10">
				<Marquee className="py-10" pauseOnHover>
					{partnerLogos.map((logo, index) => (
						<div key={index} className="flex items-center justify-center w-[247px] h-[150px] mx-5">
							<Image src={logo.src} alt={logo.name} width={247} height={150} className="object-contain" />
						</div>
					))}
				</Marquee>
			</div>

			{/* Main Footer Content */}
			<div className="bg-brand-purple border-t border-white/10">
				<div className="my-container mx-auto px-[120px] py-[120px]">
					<div className="flex gap-[60px] items-start">
						{/* CTA Section */}
						<div className="flex-1 flex flex-col gap-10">
							<div className="flex flex-col gap-1">
								<div className="flex items-center">
									<h2 className="font-black text-[68px] leading-[1.2] text-brand-neon">BNB CN</h2>
									<div className="relative w-[52px] h-[53px] ml-2">
										<svg viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
											<path d="M26 0L31.5 21.5L52 26.5L31.5 31.5L26 53L20.5 31.5L0 26.5L20.5 21.5L26 0Z" fill="#baff00" />
										</svg>
									</div>
									<h2 className="font-black text-[68px] leading-[1.2] text-brand-neon">가</h2>
								</div>
								<h2 className="font-black text-[68px] leading-[1.2] text-brand-neon">브랜드 맞춤형 플랜으로</h2>
								<h2 className="font-black text-[68px] leading-[1.2] text-brand-neon">도와드립니다.</h2>
							</div>
							<button className="bg-[#222222] text-brand-neon px-10 py-5 rounded-full text-[28px] font-extrabold uppercase w-fit">문의하기</button>
						</div>

						{/* Company Info Section */}
						<div className="w-[376px] text-white text-base font-bold leading-[2]">
							<p>© BNB CNX Inc. All Rights Reserved.</p>
							<p>
								사업자등록번호 <span className="font-normal">|</span> 297-87-03451
							</p>
							<p>
								주소 <span className="font-normal">|</span> 서울특별시 서초구 강남대로 89길 (06536)
							</p>
							<p>
								대표이사 <span className="font-normal">|</span> 박찬호
							</p>
						</div>

						{/* Family Site Dropdown */}
						<div className="w-[374px]">
							<button className="w-full flex items-center justify-between px-6 py-4 border border-white rounded-full text-white text-base font-bold">
								패밀리사이트
								<ChevronDown className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
