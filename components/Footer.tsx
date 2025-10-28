import { Marquee } from '@/components/ui/marquee';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
		<footer className="flex flex-col footer">
			{/* Logo Marquee Section */}
			<div className="border-t border-black/10">
				<Marquee className="py-10">
					{partnerLogos.map((logo, index) => (
						<div key={index} className="flex items-center justify-center w-[247px] h-[150px] mx-5">
							<Image src={logo.src} alt={logo.name} width={247} height={150} className="object-contain" />
						</div>
					))}
				</Marquee>
			</div>

			{/* Main Footer Content */}
			<div className="bg-brand-purple border-t border-white/10 footer-content">
				<div className="container-custom mx-auto">
					<div className="items-start grid lg:grid-cols-4 grid-cols-1 gap-9 order-1">
						{/* CTA Section */}
						<div className="flex-1 flex flex-row lg:flex-col gap-10 lg:col-span-2 col-span-1">
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
								<h2 className="font-black text-[68px] leading-[1.2] text-brand-neon">브랜드 맞춤형 플랜으로 도와드립니다.</h2>
							</div>
							<div className="flex items-center justify-center lg:justify-start">
								<button className="bg-[#222222] text-brand-neon px-10 py-5 rounded-full text-[28px] font-extrabold uppercase w-fit">문의하기</button>
							</div>
						</div>

						{/* Company Info Section */}
						<div className=" text-white text-base font-bold leading-[2] lg:col-span-1 col-span-1 order-3 lg:order-2 text-center lg:text-left">
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
						<div className="col-span-1 order-2 lg:order-3">
							<Select onValueChange={value => window.open(value, '_blank')}>
								<SelectTrigger className="w-full px-6 py-4 border border-white rounded-full text-white text-base font-bold bg-transparent hover:bg-white/10 transition-colors">
									<SelectValue placeholder="패밀리사이트" />
								</SelectTrigger>
								<SelectContent className="border-white/20">
									<SelectItem value="https://blog.bnbcnx.com" className=" hover:bg-white/10">
										회사 블로그
									</SelectItem>
									<SelectItem value="https://instagram.com/bnbcnx" className=" hover:bg-white/10">
										공식 인스타그램
									</SelectItem>
									<SelectItem value="https://smartstore.naver.com/bnbcnx" className=" hover:bg-white/10">
										네이버 스마트스토어
									</SelectItem>
									<SelectItem value="https://partner.bnbcnx.com" className=" hover:bg-white/10">
										파트너 포털
									</SelectItem>
									<SelectItem value="https://support.bnbcnx.com" className=" hover:bg-white/10">
										고객센터
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
