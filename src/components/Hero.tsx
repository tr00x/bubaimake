import React from "react";
import imgLuxuryCar from "figma:asset/004828c83645d790d50bcdaba3753610b0e1f7e5.png";

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] max-h-[900px] overflow-hidden bg-[#141414]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={imgLuxuryCar} 
          alt="Luxury Car" 
          className="w-full h-full object-cover object-[center_70%] sm:object-center"
        />
        {/* Gradient Overlay - Darker at bottom/left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-transparent md:to-transparent" />
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end pb-[10%] md:justify-center md:pb-0 px-4 md:px-[60px] lg:px-[100px]">
        <div className="max-w-[896px] w-full flex flex-col gap-[24px] md:gap-[40px] animate-in fade-in slide-in-from-bottom-10 duration-700">
          {/* Heading */}
          <h1 className="flex flex-col font-light text-white text-[36px] sm:text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] tracking-[-0.03em] drop-shadow-sm">
            <span>Найдите свой</span>
            <span>идеальный</span>
            <span className="font-normal text-white">автомобиль.</span>
          </h1>

          {/* Subheading */}
          <div className="text-[16px] sm:text-[18px] md:text-[20px] text-gray-200 font-light leading-[1.5] max-w-[600px] drop-shadow-sm">
            <p>Широкий выбор новых и подержанных автомобилей премиум-класса с гарантией качества и прозрачной историей.</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-[16px] w-full sm:w-auto mt-2">
            <button className="bg-white text-[#141414] px-[24px] py-[16px] md:py-[20px] rounded-[12px] text-[15px] md:text-[16px] font-medium hover:bg-neutral-100 active:scale-[0.98] transition-all text-center shadow-lg shadow-black/10">
              Смотреть каталог
            </button>
            <button className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[rgba(255,255,255,0.3)] text-white px-[24px] py-[16px] md:py-[20px] rounded-[12px] text-[15px] md:text-[16px] font-medium hover:bg-[rgba(255,255,255,0.2)] active:scale-[0.98] transition-all text-center">
              Связаться с нами
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
