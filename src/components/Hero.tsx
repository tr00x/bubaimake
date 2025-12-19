import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import imgLuxuryCar from "../assets/004828c83645d790d50bcdaba3753610b0e1f7e5.png";

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] max-h-[900px] overflow-hidden bg-background">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <motion.video 
          src="/herovid1.mp4" 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {/* Gradient Overlay - Darker at bottom/left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-transparent md:to-transparent" />
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end pb-[10%] md:justify-center md:pb-0 px-4 md:px-16 lg:px-24">
        <div className="max-w-4xl w-full flex flex-col gap-6 md:gap-10">
          {/* Heading */}
          <motion.h1 
            className="flex flex-col font-light text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
          >
            <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>Найдите свой</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>идеальный</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="font-normal text-white">автомобиль.</motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.div 
            className="text-base sm:text-lg md:text-xl text-gray-200 font-light leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            <p>Широкий выбор новых и подержанных автомобилей премиум-класса с гарантией качества и прозрачной историей.</p>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          >
            <Link 
              to="/catalog"
              className="bg-white text-black px-6 py-4 md:py-5 rounded-xl text-base font-medium hover:bg-neutral-100 active:scale-[0.98] transition-all text-center inline-block"
            >
              Смотреть каталог
            </Link>
            <Link 
              to="/#contacts"
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-4 md:py-5 rounded-xl text-base font-medium hover:bg-white/20 active:scale-[0.98] transition-all text-center inline-block"
            >
              Связаться с нами
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
