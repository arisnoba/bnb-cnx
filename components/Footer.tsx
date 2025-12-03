import { Marquee } from '@/components/ui/marquee';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
			<div className="border-t border-black/10 footer-logo-marquee">
				<Marquee>
					{partnerLogos.map((logo, index) => (
						<div key={index} className="flex justify-center items-center mx-2 md:mx-5">
							<Image src={logo.src} alt={logo.name} width={247} height={150} className="object-contain footer-logo-marquee-item" />
						</div>
					))}
				</Marquee>
			</div>

			{/* Main Footer Content */}
			<div className="border-t bg-brand-purple border-white/10 footer-content">
				<div className="mx-auto container-custom">
					<div className="grid order-1 grid-cols-1 gap-9 items-start lg:grid-cols-4">
						{/* CTA Section */}
						<div className="flex flex-col flex-1 col-span-1 gap-10 lg:col-span-2">
							<div className="flex flex-col gap-1">
								<h2 className="font-black text-[68px] leading-[1.2] text-brand-neon flex items-center">
									BNB CN<i className="fa-kit fa-cnx-x text-[.78em] ml-[-.12em]"></i>
								</h2>
								<h2 className="font-black text-[68px] leading-[1.2] text-brand-neon">브랜드 맞춤형 플랜으로 도와드립니다.</h2>
							</div>
							<div className="flex justify-start items-center">
								<Link href="/contact">
									<Button className="btn-primary">문의하기</Button>
								</Link>
							</div>
						</div>

						{/* Company Info Section */}
						<div className=" text-white text-base font-bold leading-[2] lg:col-span-1 col-span-1 order-3 lg:order-2 text-left space-y-8">
							<div className="">
								<p>© BNB CNX Co., Ltd. All Rights Reserved.</p>
								<p>
									사업자등록번호 <span className="font-normal">|</span> 297-87-03451 <br className="block md:hidden lg:block" /> 주소 <span className="font-normal">|</span> 서울특별시 서초구
									강남대로89길 19, 1층
								</p>
								<p>
									대표이사 <span className="font-normal">|</span> 박찬호
								</p>
							</div>
							<div>
								<p>Contact</p>
								<a href="tel:070-4715-8801">070-4715-8801</a>
								<br />
								<a href="mailto:biz@bnb-cnx.com">biz@bnb-cnx.com</a>
							</div>
						</div>

						{/* Family Site Dropdown */}
						<div className="flex order-2 col-span-1 justify-start pt-10 border-t lg:order-3 lg:justify-end lg:border-t-0 border-white/10 lg:pt-0">
							<Select onValueChange={value => window.open(value, '_blank')}>
								<SelectTrigger className="w-fit px-6 min-w-[200px] py-4 border border-white rounded-full text-white text-base font-bold bg-transparent hover:bg-white/10 transition-colors">
									<SelectValue placeholder="패밀리사이트" />
								</SelectTrigger>
								<SelectContent className="border-white/20">
									<SelectItem value="https://breeze-artist.com" className="hover:bg-white/10">
										BAA
									</SelectItem>
									<SelectItem value="https://bnb-play.com" className="hover:bg-white/10">
										BNB PLAY
									</SelectItem>
									<SelectItem value="https://bx-agency.com" className="hover:bg-white/10">
										BX모델에이전시
									</SelectItem>
									<SelectItem value="https://baewoo.co.kr" className="hover:bg-white/10">
										아트센터
									</SelectItem>
									<SelectItem value="https://vordinsight.com" className="hover:bg-white/10">
										블드인사이트
									</SelectItem>
									<SelectItem value="https://baewoorun.co.kr" className="hover:bg-white/10">
										애비뉴센터
									</SelectItem>
									<SelectItem value="https://bnbindustry.com" className="hover:bg-white/10">
										인더스트리
									</SelectItem>
									<SelectItem value="https://baewoo.kr" className="hover:bg-white/10">
										입시센터
									</SelectItem>
									<SelectItem value="https://baewoo.net" className="hover:bg-white/10">
										키즈센터
									</SelectItem>
									<SelectItem value="https://perfectj.co.kr" className="hover:bg-white/10">
										퍼펙트제이
									</SelectItem>
									<SelectItem value="https://baewoo.me" className="hover:bg-white/10">
										하이틴센터
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
