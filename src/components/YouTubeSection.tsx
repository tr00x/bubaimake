import React, { useRef } from "react";
import svgPaths from "../imports/svg-5qr6y18hqk";
import imgMashynBazar from "figma:asset/58ef5ee199d9ca1c60c8ac56288fb7dd033bd242.png";
import imgFrame7 from "figma:asset/b528f95013ebf6fb89190cc56de3eb716c15009b.png";
import { ChevronRight, ArrowRight, Play } from "lucide-react";

// YouTube Icon SVG
function YouTubeIcon() {
  return (
    <div className="relative w-[60px] h-[60px] md:w-[80px] md:h-[80px] shadow-2xl rounded-full bg-white flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="red" className="ml-1">
             <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
             <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
        </svg>
    </div>
  );
}

function VideoCard({ title, views }) {
    return (
        <div className="group bg-white rounded-[16px] border border-[#e6e6e6] flex flex-col gap-[14px] min-w-[280px] md:min-w-[320px] flex-1 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative w-full aspect-video bg-neutral-200 overflow-hidden">
                <img 
                    src={imgFrame7} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                     <div className="w-[48px] h-[48px] bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                        <Play className="w-5 h-5 ml-1 text-red-600" fill="currentColor" />
                     </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-white text-xs font-medium">
                    12:45
                </div>
            </div>
            <div className="flex flex-col gap-[8px] p-[16px] pt-0">
                <h3 className="text-[#141414] text-[16px] font-semibold leading-[1.4] line-clamp-2 group-hover:text-red-600 transition-colors">
                    {title}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-neutral-400 text-[13px]">{views}</span>
                </div>
            </div>
        </div>
    )
}

export default function YouTubeSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
      if (scrollRef.current) {
          const { current } = scrollRef;
          const scrollAmount = 300;
          current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-[40px] py-10 md:py-[80px] flex flex-col gap-[40px]">
      {/* Gradient Banner */}
      <div className="w-full relative rounded-[24px] bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none" />
        
        <div className="relative p-6 md:p-[50px] flex flex-col md:flex-row items-center justify-between gap-8 z-10">
            <div className="flex flex-col gap-[20px] items-start w-full md:max-w-[65%]">
                <div className="bg-white/80 backdrop-blur-sm border border-red-100 flex items-center gap-[8px] px-[14px] py-[8px] rounded-full shadow-sm">
                     <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                     </svg>
                     <span className="text-[#141414] text-[13px] font-semibold tracking-wide uppercase">Официальный канал</span>
                </div>
                <div className="flex flex-col gap-[16px]">
                    <h2 className="text-[#141414] text-[28px] md:text-[36px] font-bold tracking-tight leading-[1.1]">
                        Обзоры, тест‑драйвы и жизнь авторынка ОАЭ.
                    </h2>
                    <p className="text-[16px] md:text-[18px] text-neutral-600 leading-relaxed max-w-[500px]">
                        Подписывайтесь, чтобы первыми узнавать о новинках, ценах и эксклюзивных предложениях.
                    </p>
                </div>
            </div>
            
            <div className="shrink-0 animate-bounce-slow">
                <YouTubeIcon />
            </div>
        </div>
      </div>

      {/* Channel & Videos */}
      <div className="flex flex-col gap-[24px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-[16px]">
                 <div className="w-[64px] h-[64px] rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                     <img src={imgMashynBazar} alt="Channel Logo" className="w-full h-full object-cover"/>
                 </div>
                 <div className="flex flex-col gap-[2px]">
                     <h3 className="text-[#141414] text-[20px] font-bold">Mashyn Bazar</h3>
                     <p className="text-neutral-500 text-[14px]">81.9K подписчиков • 1.6M+ просмотров</p>
                 </div>
             </div>
             <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-[10px] px-[20px] py-[12px] bg-[#cc0000] hover:bg-[#b30000] text-white rounded-[10px] transition-colors shadow-lg shadow-red-600/20 w-full md:w-auto justify-center group">
                 <span className="text-[14px] font-medium">Подписаться на канал</span>
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </a>
        </div>

        {/* Video Scroller */}
        <div className="relative group/scroller">
            <div 
                ref={scrollRef}
                className="flex gap-[20px] overflow-x-auto pb-8 pt-2 scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <VideoCard title="Дешевые GR SPORT LAND CRUISER 300 VXR обзор и цена" views="12K просмотров • 2 дня назад" />
                <VideoCard title="Новый Range Rover 2024 - Полный обзор люкс внедорожника" views="45K просмотров • 5 дней назад" />
                <VideoCard title="Цены на авто в Дубае 2024. Стоит ли заказывать?" views="89K просмотров • 1 неделю назад" />
                <VideoCard title="Toyota Camry 2025 - Что изменилось?" views="32K просмотров • 2 недели назад" />
                <VideoCard title="Rolls Royce Cullinan - Самый дорогой SUV" views="150K просмотров • 1 месяц назад" />
            </div>
            
            {/* Scroll Controls (Desktop) */}
            <div className="hidden md:flex justify-end gap-2 mt-[-20px]">
                 <button onClick={() => scroll('left')} className="w-[40px] h-[40px] rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 shadow-sm active:scale-95 transition-all">
                    <ChevronRight className="w-5 h-5 rotate-180" />
                 </button>
                 <button onClick={() => scroll('right')} className="w-[40px] h-[40px] rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 shadow-sm active:scale-95 transition-all">
                    <ChevronRight className="w-5 h-5" />
                 </button>
            </div>
        </div>
      </div>
    </section>
  );
}
