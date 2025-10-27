"use client";

import Image from "next/image";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  images: string[];
}

const services: ServiceItem[] = [
  {
    id: "visit",
    number: "01",
    title: "방문형 체험단",
    description: "오프라인 매장 기반,\n현장 방문 후기 콘텐츠 + 방문객 유치",
    images: ["/images/home/visit-01.jpg", "/images/home/sns-01.jpg"],
  },
  {
    id: "product",
    number: "02",
    title: "제품형 체험단",
    description: "브랜드 제품 실사용 후기 중심 /\n노출 + 구매 전환 유도",
    images: ["/images/home/sns-12.jpg", "/images/home/sns-03.jpg"],
  },
  {
    id: "journalist",
    number: "03",
    title: "기자단",
    description: "중국 기자단·인플루언서 DB 기반의\n플랫폼 맞춤형 콘텐츠 제작",
    images: ["/images/home/sns-13.jpg", "/images/home/sns-02.jpg"],
  },
];

export default function SNSMarketingSection() {
  return (
    <section id="sns-marketing" className="bg-[#f3f3f3] py-32 px-[360px]">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="mb-32 pr-[400px]">
          <div className="bg-brand-purple inline-block px-3 py-2 mb-8">
            <h2 className="text-[48px] font-black text-brand-neon uppercase">
              SNS Marketing
            </h2>
          </div>
          <div className="text-[24px] font-semibold text-[#333333] leading-[1.35]">
            <p>BNB CNX는</p>
            <p>중국 소비자들의 SNS 반응을 실질적으로 확인할 수 있는</p>
            <p>가장 효과적인 솔루션, SNS Marketing을 제안합니다.</p>
          </div>
        </div>

        {/* Decoration */}
        <div className="absolute right-[360px] top-[120px] w-[419px] h-[632px]">
          <div className="relative w-full h-full">
            <Image
              src="/images/home/image-39.jpg"
              alt="Decoration"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Service Items */}
        <div className="space-y-5">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-[32px] p-10 overflow-hidden"
            >
              <div className="flex gap-5 h-[400px]">
                {index % 2 === 0 ? (
                  <>
                    {/* Images */}
                    {service.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="flex-1 bg-[#a8a8a8] rounded-2xl border border-black/10 overflow-hidden relative"
                      >
                        <Image
                          src={image}
                          alt={`${service.title} ${imgIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}

                    {/* Info Card */}
                    <div className="flex-1 bg-brand-purple rounded-2xl p-8 flex flex-col justify-between border border-black/10">
                      <p className="text-brand-neon text-[40px] font-black">
                        {service.number}
                      </p>
                      <div className="text-white">
                        <h3 className="text-[30px] font-black mb-3">
                          {service.title}
                        </h3>
                        <p className="text-[16px] font-semibold leading-[1.35] whitespace-pre-line">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Info Card */}
                    <div className="flex-1 bg-brand-purple rounded-2xl p-8 flex flex-col justify-between border border-black/10">
                      <p className="text-brand-neon text-[40px] font-black">
                        {service.number}
                      </p>
                      <div className="text-white">
                        <h3 className="text-[30px] font-black mb-3">
                          {service.title}
                        </h3>
                        <p className="text-[16px] font-semibold leading-[1.35] whitespace-pre-line">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Images */}
                    {service.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="flex-1 bg-[#a8a8a8] rounded-2xl border border-black/10 overflow-hidden relative"
                      >
                        <Image
                          src={image}
                          alt={`${service.title} ${imgIndex + 1}`}
                          fill
                          className="object-cover"
                        />
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
