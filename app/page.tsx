import ServiceCarouselSection from '@/components/home/ServiceCarouselSection';
import SNSMarketingSection from '@/components/home/SNSMarketingSection';
import BrandChannelSection from '@/components/home/BrandChannelSection';
import OfficialStoreSection from '@/components/home/OfficialStoreSection';
import LiveCommerceSection from '@/components/home/LiveCommerceSection';
import CNXMallSection from '@/components/home/CNXMallSection';
import PPLMarketingSection from '@/components/home/PPLMarketingSection';
import Image from 'next/image';
import {BlurFade} from '@/components/ui/blur-fade';
import {ArrowRight} from "lucide-react";
import React from "react";
import Link from "next/link";

const videoHero = '/images/home/hero.mp4';

const partnerLogos = [
    {name: '샤오홍슈', src: '/images/partners/샤오홍슈.png'},
    {name: '더우인', src: '/images/partners/더우인.png'},
    {name: '따종디엔핑', src: '/images/partners/따종디엔핑.png'},
    {name: '웨이보', src: '/images/partners/웨이보.png'},
    {name: '타오바오', src: '/images/partners/타오바오.png'},
    {name: '티몰', src: '/images/partners/티몰.png'},
];

export default function Home() {
    return (
        <main className="min-h-screen home-page">
            <div className="space-y-4 md:space-y-10 cnx-wrapper">
                {/* Hero Section */}
                <section className="relative bg-brand-purple overflow-hidden md:aspect-[16/9] hero-section md:h-auto">
                    <div className="absolute inset-0 z-20 bg-black/70"/>
                    <video className="object-cover absolute inset-0 z-0 w-full h-full" autoPlay loop muted playsInline>
                        <source src={videoHero} type="video/mp4"/>
                    </video>
                    <div className="flex relative z-30 flex-col justify-end mx-auto h-full">
                        <BlurFade
                            className="text-white text-[60px] font-black leading-[1.2] tracking-[1.2px] uppercase mb-8"
                            inView delay={0.15}>
                            {partnerLogos.map((logo, index) => (
                                <span key={index}
                                      className="px-2.5 py-1.5 text-lg font-bold rounded-full bg-brand-purple text-brand-neon mr-2">
                                    #{logo.name}
                                    <Image src={logo.src} alt={logo.name} width={247} height={150}
                                           className="inline-block w-4 h-4 ml-1"/>

                                </span>
                            ))}
                        </BlurFade>
                        <BlurFade
                            className="text-white text-[60px] font-black leading-[1.2] tracking-[1.2px] uppercase mb-8"
                            inView delay={0.15}>
                            <h1>
                                중국 소비자와 가장 가까운 <br/>
                                SNS 마케팅 전문 파트너
                            </h1>
                        </BlurFade>
                        <BlurFade
                            className="flex items-center justify-between gap-2"
                            inView
                            delay={0.3}
                        >
                            <div>
                                <Image
                                    src="/images/common/logo.svg"
                                    alt="BNB CNX Logo"
                                    width={152}
                                    height={24}
                                    className="object-contain w-auto hero-logo"
                                />
                            </div>
                            <Link key="/contact" href="/contact">
                                <button
                                    className="flex items-center gap-5 pl-2.5 pr-6 py-1.5 rounded-full bg-brand-neon text-black text-xl font-bold scale-125 hover:bg-brand-purple hover:text-brand-neon hover:scale-150 transition">
                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black">
                                    <ArrowRight className="w-6 h-6 text-brand-neon"/>
                                </span>
                                    <h2>문의하기</h2>
                                </button>
                            </Link>


                        </BlurFade>

                    </div>
                </section>
            </div>

            {/* Service Carousel Section */}
            <ServiceCarouselSection/>

            {/* SNS Marketing Section */}
            <SNSMarketingSection/>

            {/* Brand Channel Section */}
            <BrandChannelSection/>
            {/* Official Store Section */}
            <OfficialStoreSection/>
            {/* Live Commerce Section */}
            <LiveCommerceSection/>

            {/* CNX Mall Section */}
            <CNXMallSection/>

            {/* PPL Marketing Section */}
            <PPLMarketingSection/>
        </main>
    );
}
