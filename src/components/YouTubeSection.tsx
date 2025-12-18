"use client";

import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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
  viewCount?: string;
  length?: string;
}

export default function YouTubeSection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    // Only prevent default if moved significantly (drag threshold)
    if (Math.abs(x - startX) > 5) {
        e.preventDefault();
        const walk = (x - startX) * 1.5; // Scroll-fast
        scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
    }
  };

  useEffect(() => {
    // Load YouTube Subscribe Button script
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    const CACHE_KEY = "youtube_feed_cache_v12"; // Incremented version
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    const fetchVideos = () => {
       // Fetch from our local proxy which scrapes the Videos tab (excluding shorts)
       // Use relative URL so it works through tunnel/proxy
       const API_URL = "/api/youtube-videos";

       fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setVideos(data);
            // Save to cache
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              timestamp: Date.now(),
              videos: data
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
    <section className="max-w-[1400px] mx-auto px-4 md:px-[80px] py-10 md:py-[80px] flex flex-col gap-[40px]">
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
        {/* Header with Subscribe Button and Navigation */}
      <div className="flex justify-between items-center">
        {/* Subscribe Button */}
        <div className="flex justify-start">
            <div 
                className="g-ytsubscribe" 
                data-channelid="UCoMu2BkIcQHKkUy9dr3gNdQ" 
                data-layout="full" 
                data-count="default"
            ></div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3">
            <button 
                onClick={() => scroll('left')}
                disabled={!showLeftArrow}
                className="flex w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-sm items-center justify-center border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                aria-label="Previous videos"
            >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#0f0f0f]" />
            </button>
            <button 
                onClick={() => scroll('right')}
                disabled={!showRightArrow}
                className="flex w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-sm items-center justify-center border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                aria-label="Next videos"
            >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#0f0f0f]" />
            </button>
        </div>
      </div>

      {/* Custom Horizontal Scroll Slider (YouTube Style) */}
      {loading ? (
           // Skeleton / Loading State
           <div className="w-full h-[250px] bg-neutral-100 rounded-[16px] animate-pulse"></div>
      ) : videos.length > 0 ? (
          <div className="relative group/slider">
            
            {/* Scroll Container */}
            <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className={`flex overflow-x-auto gap-8 pb-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 items-start ${
                    isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-proximity'
                }`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {videos.slice(0, 15).map((video) => (
                <div 
                    key={video.id} 
                    className="flex-none snap-start shrink-0 w-[300px] md:w-[320px] max-w-[90vw]"
                >
                      <div 
                        onClick={() => setSelectedVideo(video.id)}
                        className="cursor-pointer group flex flex-col gap-3"
                      >
                        {/* Thumbnail Container */}
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-neutral-200 shadow-sm isolate pointer-events-none">
                           <img 
                            src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`} 
                            alt={video.title} 
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
                            onError={(e) => {
                                // Fallback to mqdefault if maxres fails
                                const target = e.target as HTMLImageElement;
                                if (target.src.includes('maxresdefault')) {
                                    target.src = `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`;
                                }
                            }}
                           />
                           {/* Duration Badge */}
                           {video.length && (
                             <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[12px] font-medium px-1.5 py-0.5 rounded-[4px] leading-none tracking-wide">
                               {video.length}
                             </div>
                           )}
                           {/* Hover Overlay */}
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                        </div>
                        
                        {/* Video Info */}
                        <div className="flex flex-col pr-2 gap-1">
                           <h4 className="text-[16px] font-medium leading-[1.4] line-clamp-2 text-[#0f0f0f] group-hover:text-black" title={video.title}>
                             {video.title}
                           </h4>
                           <div className="flex flex-wrap items-center text-[14px] text-[#606060] font-normal leading-tight">
                             {video.viewCount && (
                               <>
                                 <span>{video.viewCount}</span>
                                 <span className="mx-1">•</span>
                               </>
                             )}
                             <span>{video.date}</span>
                           </div>
                        </div>
                      </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
           // Fallback to Playlist if RSS fails or no videos found
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

      {/* Custom Video Modal */}
      {selectedVideo && (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.85)',
                zIndex: 999999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
            className="animate-in fade-in duration-200"
        >
            {/* Click outside to close */}
            <div 
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                onClick={() => setSelectedVideo(null)}
            />

            {/* Modal Container */}
            <div 
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '800px',
                    backgroundColor: '#000',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                }}
            >
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedVideo(null)}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        zIndex: 10,
                        padding: '8px',
                        color: 'white',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        backdropFilter: 'blur(4px)'
                    }}
                    className="hover:bg-black/80 transition-colors"
                    aria-label="Close video"
                >
                    <X size={20} />
                </button>

                {/* Video Container */}
                <div style={{ aspectRatio: '16/9', width: '100%', backgroundColor: '#000' }}>
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube-nocookie.com/embed/${selectedVideo}?autoplay=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`} 
                        title="YouTube video player"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                    ></iframe>
                </div>
            </div>
        </div>
      )}
    </section>
  );
}
