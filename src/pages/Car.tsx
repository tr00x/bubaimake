import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import imgBmwM5Competition from "../assets/5ff7312c3dc0a1014ede77a74beefcf8924374ee.png";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../components/ui/carousel";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Gauge, Fuel, Calendar, Cog, BadgeCheck, Mail, UserCheck, FileCheck, ShieldCheck, DollarSign } from "lucide-react";
import client from "../api/client";
import { CarCard } from "../components/CarCard";
import ManagerContactModal from "../components/ManagerContactModal";

type CarData = {
  id: string;
  title: string;
  priceUsd: number;
  year: number;
  mileage: number;
  transmission: string;
  horsepower: number;
  topSpeed: number;
  fuelType: string;
  condition: string;
  descriptionMd: string;
  status: string;
  tags: string; // CSV
  labels: string; // CSV
  images: { pathOrUrl: string; isMain: boolean }[];
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function CarPage() {
  const { slug } = useParams(); // Using ID as slug
  const [car, setCar] = useState<CarData | null>(null);
  const [similarCars, setSimilarCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    // We don't listen to 'select' to avoid conflict when carousel items fit on screen (and api.selectedScrollSnap() stays 0)
    // allowing us to manually control activeImageIndex for the main image.
  }, [api]);

  const handlePrevImage = () => {
    if (!images.length) return;
    setActiveImageIndex((prev) => {
      const newIndex = prev === 0 ? images.length - 1 : prev - 1;
      api?.scrollTo(newIndex); 
      return newIndex;
    });
  };

  const handleNextImage = () => {
    if (!images.length) return;
    setActiveImageIndex((prev) => {
      const newIndex = (prev + 1) % images.length;
      api?.scrollNext(); // Use scrollNext for smooth looping
      return newIndex;
    });
  };

  // Swipe handlers for main image
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextImage();
    } else if (isRightSwipe) {
      handlePrevImage();
    }
    
    // Reset
    touchEndX.current = null;
    touchStartX.current = null;
  };

  // Ref for similar cars scroll container
  const similarCarsRef = useRef<HTMLDivElement>(null);

  const scrollSimilar = (direction: 'left' | 'right') => {
    if (similarCarsRef.current) {
      const scrollAmount = 350; // Approx card width + gap
      const newScrollLeft = direction === 'left' 
        ? similarCarsRef.current.scrollLeft - scrollAmount
        : similarCarsRef.current.scrollLeft + scrollAmount;
      
      similarCarsRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (slug) {
      setLoading(true);
      // Fetch current car
      client.get(`/cars/${slug}`)
        .then(res => {
          setCar(res.data);
          setActiveImageIndex(0); // Reset image index on car change
        })
        .catch(err => console.error("Failed to fetch car", err))
        .finally(() => setLoading(false));

      // Fetch similar cars (all active cars for now, filter client side)
      client.get('/cars')
        .then(res => {
          // Filter out current car and take up to 12 similar cars for the carousel
          const others = res.data.filter((c: CarData) => c.id !== slug);
          setSimilarCars(others.slice(0, 12));
        })
        .catch(err => console.error("Failed to fetch similar cars", err));
    }
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      setShowSticky(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return <div className="p-10 text-center">Загрузка...</div>;
  if (!car) return <div className="p-10 text-center">Автомобиль не найден</div>;

  const images = car.images && car.images.length > 0
    ? car.images.map(i => i.pathOrUrl)
    : [imgBmwM5Competition];

  // Transform DB data to Display format
  const tagsList = car.tags ? car.tags.split(',') : [];
  const priceStr = `$${car.priceUsd.toLocaleString()}`;

  return (
    <motion.section 
      className="max-w-[1400px] mx-auto px-4 md:px-10 pt-24 md:pt-32 pb-24 md:pb-36 flex flex-col gap-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/catalog">Каталог</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{car.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>

      {showSticky && (
        <motion.div 
          className="sticky top-[72px] z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="bg-background/90 backdrop-blur-md border border-border rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center">
              <span className="text-[15px] font-bold text-foreground mr-4">{car.title}</span>
              
              <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5 bg-secondary px-2 py-1 rounded-md">
                   <Calendar className="w-3.5 h-3.5" />
                   {car.year}
                </span>
                <span className="hidden sm:flex items-center gap-1.5 bg-secondary px-2 py-1 rounded-md">
                   <Gauge className="w-3.5 h-3.5" />
                   {car.horsepower} л.с.
                </span>
                <span className="hidden sm:flex items-center gap-1.5 bg-secondary px-2 py-1 rounded-md">
                   <Fuel className="w-3.5 h-3.5" />
                   {car.fuelType}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <div className="hidden md:flex gap-2">
                {tagsList.map((t) => (
                  <span key={t} className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold uppercase tracking-wider ${t === "Горячее" ? "border-red-500 text-red-600" : "border-border text-foreground"}`}>{t}</span>
                ))}
              </div>
              <div className="px-5 py-2.5 bg-foreground text-background rounded-xl font-semibold tracking-tight whitespace-nowrap">
                {priceStr}
              </div>
            </div>
          </div>
        </motion.div>
      )}


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div className="flex flex-col gap-5" variants={itemVariants}>
          <h1 className="text-3xl md:text-4xl font-medium text-foreground leading-tight">
            {car.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {tagsList.map((t) => (
              <span
                key={t}
                className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold uppercase tracking-wider ${t === "Горячее" ? "border-red-500 text-red-600" : "border-border text-foreground"}`}
              >
                {t}
              </span>
            ))}
          </div>


          <div className="grid grid-cols-2 gap-3 py-3 border-t border-border">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Gauge className="w-4 h-4" />
                <span className="text-xs">Макс. скорость</span>
              </div>
              <span className="text-lg md:text-xl font-medium text-foreground">{car.topSpeed ? `${car.topSpeed} км/ч` : "—"}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Gauge className="w-4 h-4" />
                <span className="text-xs">Разгон 0-100</span>
              </div>
              <span className="text-lg md:text-xl font-medium text-foreground">{car.topSpeed ? `3.5 сек` : "—"}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Gauge className="w-4 h-4" />
                <span className="text-xs">Мощность</span>
              </div>
              <span className="text-lg md:text-xl font-medium text-foreground">{car.horsepower} л.с.</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Fuel className="w-4 h-4" />
                <span className="text-xs">Тип топлива</span>
              </div>
              <span className="text-lg md:text-xl font-medium text-foreground">{car.fuelType}</span>
            </div>
             <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">Год выпуска</span>
              </div>
              <span className="text-lg md:text-xl font-medium text-foreground">{car.year}</span>
            </div>
             <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <BadgeCheck className="w-4 h-4" />
                <span className="text-xs">Состояние</span>
              </div>
              <span className="text-lg md:text-xl font-medium text-foreground">{car.condition === 'new' ? 'Новый' : 'С пробегом'}</span>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-border">
             <div className="flex items-center gap-2 text-muted-foreground">
                
                <span className="text-sm font-medium">Стоимость</span>
              </div>
              <span className="text-[15px] leading-none sm:text-4xl font-bold text-foreground tracking-tight">{priceStr}</span>
            </div>
        </motion.div>

        <motion.div className="relative" variants={itemVariants}>
          <div 
            className="relative aspect-[4/3] w-full overflow-hidden rounded-xl touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.img
              key={activeImageIndex}
              src={images[activeImageIndex]}
              alt={car.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div className="flex flex-col gap-3" variants={itemVariants}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold">Больше фото</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrevImage}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-secondary transition-colors"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-secondary transition-colors"
              aria-label="Next image"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="px-1">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 lg:-ml-6">
              {images.map((src, idx) => (
                <CarouselItem key={idx} className="pl-2 md:pl-4 lg:pl-6 basis-1/4">
                  <div className="relative w-full p-1">
                    <button
                      onClick={() => {
                        setActiveImageIndex(idx);
                        api?.scrollTo(idx);
                      }}
                      className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl transition-all hover:opacity-90 ${
                        idx === activeImageIndex
                          ? "ring-2 ring-foreground ring-offset-2"
                          : "border border-border hover:border-muted-foreground"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${car.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-4 lg:-left-12" />
              <CarouselNext className="-right-4 lg:-right-12" />
            </div>
          </Carousel>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <motion.div className="lg:col-span-2 flex flex-col gap-6" variants={itemVariants}>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Описание</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{car.descriptionMd?.split("**Комплектация:**")[0]}</p>
          </div>


        </motion.div>

        <motion.div className="flex flex-col gap-3" variants={itemVariants}>
          <div className="rounded-xl border border-border p-6 bg-background sticky top-[100px] flex flex-col gap-6">
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Консультация</span>
              <p className="text-lg font-medium mt-3 text-foreground leading-snug">Рассчитаем доставку и растаможку, подберём лучшее предложение</p>
            </div>
            
            <div className="w-full h-px bg-border"></div>

            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-2 text-sm text-foreground">
                <UserCheck className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Персональный менеджер</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground">
                <FileCheck className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium"> Прозрачные условия сделки</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground">
                <ShieldCheck className="w-5 h-5 text-muted-foreground"  />
                <span className="font-medium"> Документы и страхование</span>
              </li>
            </ul>

            <ManagerContactModal carTitle={car.title} carId={car.id} carPrice={priceStr} carImage={images[0]}>
              <button className="mt-4 w-full group relative overflow-hidden rounded-xl bg-foreground text-background py-4 font-semibold shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:-rotate-12" />
                  <span>Написать менеджеру</span>
                </div>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>
            </ManagerContactModal>
          </div>
        </motion.div>
      </div>

      {similarCars.length > 0 && (
        <motion.div className="flex flex-col gap-4 mt-24" variants={itemVariants}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold">Похожие автомобили</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollSimilar('left')}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-secondary transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSimilar('right')}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-secondary transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div 
            ref={similarCarsRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          >
            {similarCars.map((item) => {
              const mainImg = item.images?.find(i => i.isMain)?.pathOrUrl || item.images?.[0]?.pathOrUrl || imgBmwM5Competition;
              return (
                <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-start">
                  <CarCard
                    title={item.title}
                    image={mainImg}
                    tags={item.tags ? item.tags.split(',') : []}
                    meta={[item.year.toString(), item.fuelType, item.transmission]}
                    specs={{ hp: `${item.horsepower} л.с.`, zeroTo100: item.topSpeed ? '3.5 сек' : '—' }}
                    price={`$${item.priceUsd.toLocaleString()}`}
                    id={item.id}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}