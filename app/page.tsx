import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ServiceCarouselSection from '@/components/home/ServiceCarouselSection';
import SNSMarketingSection from '@/components/home/SNSMarketingSection';
import BrandChannelSection from '@/components/home/BrandChannelSection';
import OfficialStoreSection from '@/components/home/OfficialStoreSection';
import LiveCommerceSection from '@/components/home/LiveCommerceSection';
import CNXMallSection from '@/components/home/CNXMallSection';
import PPLMarketingSection from '@/components/home/PPLMarketingSection';

export const metadata: Metadata = {
   title: 'BNB CNX - 홈',
   description: '중국 소비자와 가장 가까운 SNS 마케팅 전문 파트너',
};

export default function Home() {
   return (
      <main className="min-h-screen home-page">
         <div className="space-y-4 md:space-y-10 cnx-wrapper">
            <HeroSection />
         </div>

         {/* Service Carousel Section */}
         <ServiceCarouselSection />

         {/* SNS Marketing Section */}
         <SNSMarketingSection />

         {/* Brand Channel Section */}
         <BrandChannelSection />
         {/* Official Store Section */}
         <OfficialStoreSection />
         {/* Live Commerce Section */}
         <LiveCommerceSection />

         {/* CNX Mall Section */}
         <CNXMallSection />

         {/* PPL Marketing Section */}
         <PPLMarketingSection />
      </main>
   );
}
