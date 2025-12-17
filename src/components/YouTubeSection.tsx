"use client";

import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "./ui/dialog";

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

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  isShort: boolean;
}

export default function YouTubeSection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load YouTube Subscribe Button script
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    const CACHE_KEY = "youtube_feed_cache_v3"; // Incremented version to include shorts
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    const fetchVideos = () => {
       const RSS_URL = "https://www.youtube.com/feeds/videos.xml?channel_id=UCoMu2BkIcQHKkUy9dr3gNdQ";
       const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

       fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          if (data.items && data.items.length > 0) {
            const fetchedVideos = data.items
              .map((item: any) => {
               // guid format: "yt:video:VIDEO_ID"
               const videoId = item.guid.split(":")[2];
               const isShort = item.link.includes('shorts') || item.title.toLowerCase().includes('#shorts');
               return {
                 id: videoId,
                 title: item.title,
                 thumbnail: isShort 
                    ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` // Attempt maxres for shorts
                    : `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
                 date: new Date(item.pubDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }),
                 isShort
               };
            });
            setVideos(fetchedVideos);
            // Save to cache
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              timestamp: Date.now(),
              videos: fetchedVideos
            }));
          }
        })
        .catch(err => console.error("Failed to fetch YouTube feed", err))
        .finally(() => setLoading(false));
    };

    // Check cache
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
          setVideos(parsed.videos);
          setLoading(false);
        } else {
          fetchVideos();
        }
      } catch (e) {
        fetchVideos();
      }
    } else {
      fetchVideos();
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    }
  }, []);

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

      {/* Main Content Area */}
      <div className="flex flex-col gap-8">
        {/* Subscribe Button */}
        <div className="flex justify-start">
            <div 
                className="g-ytsubscribe" 
                data-channelid="UCoMu2BkIcQHKkUy9dr3gNdQ" 
                data-layout="full" 
                data-count="default"
            ></div>
        </div>

        {/* Carousel */}
        {loading ? (
           // Skeleton / Loading State
           <div className="w-full h-[250px] bg-neutral-100 rounded-[16px] animate-pulse"></div>
        ) : videos.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {videos.map((video) => (
                <CarouselItem 
                    key={video.id} 
                    className={`pl-4 ${video.isShort ? 'basis-[160px] md:basis-[200px]' : 'basis-[280px] md:basis-[360px] lg:basis-[400px]'}`}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer group flex flex-col gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-all border border-transparent hover:border-neutral-100 hover:shadow-sm h-full">
                        <div className={`relative w-full ${video.isShort ? 'aspect-[9/16]' : 'aspect-video'} rounded-lg overflow-hidden bg-neutral-200`}>
                           <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className={`w-full h-full ${video.isShort ? 'object-cover' : 'object-cover'} group-hover:scale-105 transition-transform duration-300`} 
                            onError={(e) => {
                                // Fallback to mqdefault if maxres fails
                                (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`;
                            }}
                           />
                           <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-[48px] h-[48px] bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                                <Play className="w-6 h-6 ml-1 text-red-600" fill="currentColor" />
                              </div>
                           </div>
                           {video.isShort && (
                               <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 rounded text-[10px] text-white font-medium flex items-center gap-1">
                                   <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.07-2.04 2-3.49-.07-1.42-.93-2.67-2.22-3.25z"/></svg>
                                   Shorts
                               </div>
                           )}
                        </div>
                        <div className="flex flex-col gap-1.5">
                           <h4 className="text-[14px] font-medium leading-snug line-clamp-2 text-[#141414] group-hover:text-red-600 transition-colors">
                             {video.title}
                           </h4>
                           <span className="text-[12px] text-neutral-400">{video.date}</span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className={`p-0 bg-black border-neutral-800 overflow-hidden ${video.isShort ? 'sm:max-w-[400px] h-[80vh]' : 'sm:max-w-[900px]'}`}>
                      <DialogTitle className="sr-only">{video.title}</DialogTitle>
                      <div className={`w-full ${video.isShort ? 'h-full' : 'aspect-video'}`}>
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`} 
                            title={video.title}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                        ></iframe>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 bg-white hover:bg-neutral-100 border-neutral-200" />
            <CarouselNext className="hidden md:flex -right-4 bg-white hover:bg-neutral-100 border-neutral-200" />
          </Carousel>
        ) : (
           // Fallback to Playlist if RSS fails
            <div className="w-full aspect-video rounded-[16px] overflow-hidden shadow-sm border border-neutral-200 bg-neutral-100">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/videoseries?list=UUoMu2BkIcQHKkUy9dr3gNdQ" 
                    title="Mashyn Bazar Latest Videos" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                ></iframe>
            </div>
        )}
      </div>
    </section>
  );
}
