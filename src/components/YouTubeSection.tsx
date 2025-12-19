"use client";

import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { LogoIcon } from "./ui/Icons";

// YouTube Icon SVG
function YouTubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" className={className}>
         <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
         <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
    </svg>
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
  }, []);

  return (
    <section className="container mx-auto px-4 md:px-20 py-6 md:py-10 flex flex-col gap-6">
      {/* New Redesigned Banner with Animated Gradient */}
      <div className="relative w-full overflow-hidden rounded-[24px] p-6 md:p-8 isolate bg-gradient-to-r from-[#FFF1F2] to-[#FFFAF0]">
        {/* Animated Background */}
        <motion.div 
            className="absolute inset-0 z-[-1]"
            initial={{
                background: "linear-gradient(to right, #FFF1F2, #FFFAF0)"
            }}
            animate={{
                background: [
                    "linear-gradient(to right, #FFF1F2, #FFFAF0)", // Very light rose to ivory
                    "linear-gradient(to right, #FFFAF0, #FFF5F5)", // Ivory to light rose
                    "linear-gradient(to right, #FFF5F5, #FFF1F2)", // Light rose back to start
                    "linear-gradient(to right, #FFF1F2, #FFFAF0)"  // Loop
                ]
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
            }}
        />
        
        {/* Moving Blobs for "Enliven" effect - adjusted opacity */}
        <motion.div 
            className="absolute top-[-20%] right-[-10%] w-[200px] h-[200px] rounded-full bg-orange-200/50 blur-3xl z-[-1]"
            animate={{
                y: [0, 50, 0],
                x: [0, -30, 0],
                scale: [1, 1.1, 1]
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
        <motion.div 
            className="absolute bottom-[-20%] left-[-10%] w-[150px] h-[150px] rounded-full bg-red-200/40 blur-3xl z-[-1]"
            animate={{
                y: [0, -40, 0],
                x: [0, 30, 0],
                scale: [1, 1.2, 1]
            }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
            }}
        />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-4 items-start max-w-2xl">
                
                {/* Text */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                    Обзоры, тест-драйвы и жизнь авторынка ОАЭ.
                </h2>
                <p className="text-gray-500 max-w-lg text-sm md:text-base leading-relaxed">
                    Подписывайтесь, чтобы первыми узнавать о новинках, ценах и эксклюзивных предложениях.
                </p>
            </div>
            
            {/* Circular Button */}
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.youtube.com/channel/UCoMu2BkIcQHKkUy9dr3gNdQ?sub_confirmation=1', '_blank')}
                className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center group cursor-pointer transition-shadow duration-300"
                aria-label="Subscribe to YouTube channel"
            >
                <div className="w-6 h-6 md:w-8 md:h-8 text-red-600 group-hover:scale-110 transition-transform duration-300">
                    <YouTubeIcon className="text-red-600" />
                </div>
            </motion.button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-6">
        {/* Header with Navigation */}
      <div className="flex justify-between items-center pb-2">
        {/* Left Side: Avatar + Text */}
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 border border-border">
                <LogoIcon className="w-[85%] h-auto" /> 
           </div>
           <div className="flex flex-col gap-0.5">
               <span className="text-sm md:text-base font-bold leading-none text-foreground">Mashyn Bazar</span>
               <span className="text-[10px] md:text-xs text-muted-foreground font-medium">YouTube Channel</span>
           </div>
        </div>

        {/* Right Side: Button + Arrows */}
        <div className="flex items-center gap-4 md:gap-6">
            <Button 
                size="sm" 
                onClick={() => window.open('https://www.youtube.com/channel/UCoMu2BkIcQHKkUy9dr3gNdQ?sub_confirmation=1', '_blank')}
                className="h-8 md:h-9 bg-[#CC0000] hover:bg-[#FF0000] text-white rounded-full px-4 md:px-5 text-xs md:text-sm font-bold uppercase tracking-wide shadow-none transition-all hover:scale-105 active:scale-95"
            >
                Подписаться
            </Button>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
                <Button 
                    variant="outline"
                    size="icon"
                    onClick={() => scroll('left')}
                    disabled={!showLeftArrow}
                    className="h-8 w-8 rounded-full"
                    aria-label="Previous videos"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                    variant="outline"
                    size="icon"
                    onClick={() => scroll('right')}
                    disabled={!showRightArrow}
                    className="h-8 w-8 rounded-full"
                    aria-label="Next videos"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </div>

      {/* Custom Horizontal Scroll Slider (YouTube Style) */}
      {loading ? (
           // Skeleton / Loading State
           <div className="w-full h-[250px] bg-muted rounded-2xl animate-pulse"></div>
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
                className={`flex overflow-x-auto gap-4 pb-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 items-start ${
                    isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-proximity'
                }`}
            >
              {videos.slice(0, 15).map((video, index) => (
                <motion.div 
                    key={video.id} 
                    className="flex-none snap-start shrink-0 w-[300px] md:w-[320px] max-w-[90vw]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                >
                      <div 
                        onClick={() => setSelectedVideo(video.id)}
                        className="cursor-pointer group flex flex-col gap-3 h-full rounded-xl bg-card border border-border/40 p-3 transition-all duration-300"
                      >
                        {/* Thumbnail Container */}
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted isolate pointer-events-none">
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
                             <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded-[4px] leading-none tracking-wide">
                               {video.length}
                             </div>
                           )}
                           {/* Hover Overlay */}
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                        </div>
                        
                        {/* Video Info */}
                        <div className="flex flex-col pr-2 gap-1">
                           <h4 className="text-base font-medium leading-snug line-clamp-2 text-foreground group-hover:text-primary" title={video.title}>
                             {video.title}
                           </h4>
                           <div className="flex flex-wrap items-center text-sm text-muted-foreground font-normal leading-tight">
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
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
           // Fallback to Playlist if RSS fails or no videos found
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-border bg-muted">
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
            className="fixed inset-0 bg-black/85 z-[999999] flex items-center justify-center p-5 animate-in fade-in duration-200"
        >
            {/* Click outside to close */}
            <div 
                className="absolute inset-0"
                onClick={() => setSelectedVideo(null)}
            />

            {/* Modal Container */}
            <div 
                className="relative w-full max-w-[800px] bg-black rounded-xl overflow-hidden"
            >
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-3 right-3 z-10 p-2 text-white bg-black/60 border-none cursor-pointer flex items-center justify-center rounded-full backdrop-blur-sm hover:bg-black/80 transition-colors"
                    aria-label="Close video"
                >
                    <X size={20} />
                </button>

                {/* Video Container */}
                <div className="aspect-video w-full bg-black">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube-nocookie.com/embed/${selectedVideo}?autoplay=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`} 
                        title="YouTube video player"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                        className="w-full h-full block border-none"
                    ></iframe>
                </div>
            </div>
        </div>
      )}
    </section>
  );
}
