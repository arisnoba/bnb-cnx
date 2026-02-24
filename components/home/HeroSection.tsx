'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlurFade } from '@/components/ui/blur-fade';
import { ArrowRight } from 'lucide-react';

const videoHero = '/images/home/hero.mp4';

const partnerLogos = [
   { name: '샤오홍슈', src: '/images/partners/샤오홍슈.png' },
   { name: '더우인', src: '/images/partners/더우인.png' },
   { name: '따종디엔핑', src: '/images/partners/따종디엔핑.png' },
   { name: '웨이보', src: '/images/partners/웨이보.png' },
   { name: '타오바오', src: '/images/partners/타오바오.png' },
   { name: '티몰', src: '/images/partners/티몰.png' },
];

export default function HeroSection() {
   const [isMuted, setIsMuted] = useState(true);
   const videoRef = useRef<HTMLVideoElement>(null);

   const toggleMute = () => {
      if (videoRef.current) {
         videoRef.current.muted = !videoRef.current.muted;
         setIsMuted(videoRef.current.muted);
      }
   };

   return (
      <section className="relative flex bg-brand-purple overflow-hidden md:aspect-[16/9] hero-section md:h-auto">
         <div className="absolute inset-0 z-20 bg-black/70" />
         <video ref={videoRef} className="object-cover absolute inset-0 z-0 w-full h-full" autoPlay loop muted playsInline>
            <source src={videoHero} type="video/mp4" />
         </video>

         {/* Mute/Unmute Toggle Button - Absolute Center */}
         <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 md:right-[clamp(24px,-1.4545454545px+4.2424242424vw,80px)] md:bottom-[clamp(24px,-1.4545454545px+4.2424242424vw+80px,160px)] z-40 p-3 sm:p-4 rounded-full border sm:border-2 border-white text-white transition-all duration-300 hover:md:scale-110 hover:md:border-[#baff00] hover:md:text-[#baff00] opacity-70"
         >
            {isMuted ? (
               <svg className="w-5 md:w-6 h-5 md:h-6" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-6.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
               </svg>
            ) : (
               <svg className="w-5 md:w-6 h-5 md:h-6" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
               </svg>
            )}
         </button>

         <div className="flex relative z-30 flex-col justify-end mx-auto w-full">
            {/* title */}
            <BlurFade className="text-white font-black leading-[1.2] tracking-[1.2px] uppercase mb-6" inView delay={0.15}>
               <h1>
                  중국 소비자와 가장 가까운 <br />
                  SNS 마케팅 전문 파트너
               </h1>
            </BlurFade>
            {/* logo */}
            <BlurFade className="flex gap-2 justify-between items-center" inView delay={0.3}>
               <div>
                  <Image src="/images/common/logo.svg" alt="BNB CNX Logo" width={152} height={24} className="object-contain w-auto hero-logo" />
               </div>
            </BlurFade>
            <div className="flex flex-col gap-6 justify-between mt-6 md:items-center md:flex-row">
               {/* tags */}
               <BlurFade className="flex flex-wrap gap-1.5 w-full" inView delay={0.15}>
                  {partnerLogos.map((logo, index) => (
                     <span key={index} className="flex gap-1.5 items-center px-2 py-1 xl:px-4 xl:py-2 text-sm md:text-base lg:text-lg font-bold rounded-full bg-brand-purple/40 text-brand-neon">
                        #{logo.name}
                        <Image src={logo.src} alt={logo.name} width={247} height={150} className="inline-block w-5 h-5" />
                     </span>
                  ))}
               </BlurFade>
               {/* contact button */}
               <Link key="/contact" href="/contact">
                  <button className="flex gap-2 items-center py-2 pr-4 pl-2 text-xl font-bold text-black rounded-full transition bg-brand-neon hover:bg-brand-purple hover:text-brand-neon">
                     <span className="flex justify-center items-center w-8 h-8 bg-black rounded-full">
                        <ArrowRight className="w-6 h-6 text-brand-neon" />
                     </span>
                     <p className="text-base font-bold">문의하기</p>
                  </button>
               </Link>
            </div>
         </div>
      </section>
   );
}
