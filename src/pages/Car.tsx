import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
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
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Gauge, Fuel, Calendar, Cog, BadgeCheck, Mail, UserCheck, FileCheck, ShieldCheck, Palette, Timer, Zap, Route, DollarSign, CarFront } from "lucide-react";
import client from "../api/client";
import { CarCard } from "../components/CarCard";
import ManagerContactModal from "../components/ManagerContactModal";
import { DrivetrainIcon, EngineIcon } from "../components/ui/Icons";
import { getLocalizedValue } from "../utils/localization";

type CarData = {
  id: string;
  title: string;
  title_ru?: string;
  title_en?: string;
  priceUsd: number;
  year: number;
  mileage?: number | null;
  transmission: string;
  transmission_ru?: string;
  transmission_en?: string;
  horsepower?: number | null;
  topSpeed?: number | null;
  fuelType: string;
  fuelType_ru?: string;
  fuelType_en?: string;
  condition: string;
  condition_ru?: string;
  condition_en?: string;
  descriptionMd: string;
  description_ru?: string;
  description_en?: string;
  specs_ru?: string;
  specs_en?: string;
  status: string;
  tags: string; // CSV
  tags_ru?: string;
  tags_en?: string;
  labels: string; // CSV
  images: { pathOrUrl: string; isMain: boolean; sortOrder: number }[];

  // New fields
  acceleration?: number | null;
  engineCapacity?: string;
  bodyType?: string;
  bodyType_ru?: string;
  bodyType_en?: string;
  driveType?: string;
  driveType_ru?: string;
  driveType_en?: string;
  color?: string;
  color_ru?: string;
  color_en?: string;
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
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export default function CarPage() {
  const { t, i18n } = useTranslation();
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

  if (loading) return <div className="p-10 text-center">{t('catalog.loading')}</div>;
  if (!car) return <div className="p-10 text-center">{t('catalog.no_cars')}</div>;

  const images = car.images && car.images.length > 0
    ? car.images.map(i => i.pathOrUrl)
    : [imgBmwM5Competition];

  // Localization logic
  const currentLang = i18n.language;

  const title = currentLang === 'en' ? (car.title_en || car.title) : (car.title_ru || car.title);
  const fuelType = getLocalizedValue(t, currentLang, car.fuelType_ru, car.fuelType_en, car.fuelType, 'filter_');
  const transmission = getLocalizedValue(t, currentLang, car.transmission_ru, car.transmission_en, car.transmission, 'filter_');
  const condition = getLocalizedValue(t, currentLang, car.condition_ru, car.condition_en, car.condition, 'filter_');
  
  const bodyType = getLocalizedValue(t, currentLang, car.bodyType_ru, car.bodyType_en, car.bodyType || "");
  const driveType = getLocalizedValue(t, currentLang, car.driveType_ru, car.driveType_en, car.driveType || "");
  const color = getLocalizedValue(t, currentLang, car.color_ru, car.color_en, car.color || "", 'color_');
  
  const rawDescription = currentLang === 'en' ? (car.description_en || car.descriptionMd) : (car.description_ru || car.descriptionMd);
  const specsField = currentLang === 'en' ? car.specs_en : car.specs_ru;
  
  const descriptionMain = rawDescription?.split("**Комплектация:**")[0];
  const descriptionSpecs = rawDescription?.split("**Комплектация:**")[1];
  const finalSpecs = specsField || descriptionSpecs;

  // Transform DB data to Display format
  const rawTags = currentLang === 'en' ? (car.tags_en || car.tags) : (car.tags_ru || car.tags);
  const rawTagsList = rawTags ? rawTags.split(',').filter(tag => tag.trim() !== '') : [];
  const tagsList = rawTagsList.filter(t => 
    t.trim() !== car.year.toString() && 
    t.trim().toLowerCase() !== fuelType.toLowerCase() && 
    t.trim().toLowerCase() !== transmission.toLowerCase()
  );
  
  const priceStr = `$${car.priceUsd.toLocaleString()}`;
  const distanceUnit = currentLang === 'en' ? 'km' : 'км';
  const topSpeedStr = car.topSpeed ? `${car.topSpeed} ${t('catalog.kmh')}` : "";
  const accelStr = car.acceleration ? `${car.acceleration} ${t('catalog.sec')}` : "";
  const hpStr = car.horsepower ? `${car.horsepower} ${t('catalog.hp')}` : "";
  const mileageStr = car.mileage === null || car.mileage === undefined ? "" : `${car.mileage.toLocaleString()} ${distanceUnit}`;
  const engineCapacityStr = car.engineCapacity || "";
  const driveTypeStr = driveType || "";
  const bodyTypeStr = bodyType || "";
  const colorStr = color || "";

  const SpecTile = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="rounded-xl border border-border bg-secondary/20 p-4 flex items-start gap-3 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-background/80 border border-border flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground font-medium leading-tight">{label}</div>
        <div className="text-lg md:text-xl font-semibold text-foreground leading-tight break-words">{value}</div>
      </div>
    </div>
  );

  const PriceTile = ({ value }: { value: string }) => (
    <div className="rounded-xl border border-foreground/15 bg-foreground text-background p-4 flex items-start gap-3 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-background/10 border border-white/10 flex items-center justify-center shrink-0">
        <DollarSign className="w-5 h-5 text-background" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-background/70 font-medium leading-tight">{t('car_page.price')}</div>
        <div className="text-lg md:text-xl font-semibold text-background leading-tight break-words">{value}</div>
      </div>
    </div>
  );

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
              <BreadcrumbLink href="/">{t('header.menu')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/catalog">{t('header.catalog')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
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
              <span className="text-[15px] font-bold text-foreground mr-4">{title}</span>
              
            <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground font-medium">
              {car.year ? (
                <span className="flex items-center gap-1.5 bg-secondary px-2 py-1 rounded-md">
                  <Calendar className="w-3.5 h-3.5" />
                  {car.year}
                </span>
              ) : null}
              {car.horsepower ? (
                <span className="hidden sm:flex items-center gap-1.5 bg-secondary px-2 py-1 rounded-md">
                  <Gauge className="w-3.5 h-3.5" />
                  {car.horsepower} {t('catalog.hp')}
                </span>
              ) : null}
              {fuelType ? (
                <span className="hidden sm:flex items-center gap-1.5 bg-secondary px-2 py-1 rounded-md">
                  <Fuel className="w-3.5 h-3.5" />
                  {fuelType}
                </span>
              ) : null}
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
            {title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {car.year ? (
              <span className="px-2.5 py-1 rounded-md border border-border text-foreground text-[11px] font-semibold uppercase tracking-wider">
                {car.year}
              </span>
            ) : null}
            {tagsList.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold uppercase tracking-wider ${tag === "Горячее" ? "border-red-500 text-red-600" : "border-border text-foreground"}`}
              >
                {tag}
              </span>
            ))}
          </div>


          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {topSpeedStr ? <SpecTile icon={Gauge} label={t('car_card.speed')} value={topSpeedStr} /> : null}
              {accelStr ? <SpecTile icon={Timer} label={t('car_card.acceleration')} value={accelStr} /> : null}
              {hpStr ? <SpecTile icon={Zap} label={t('car_card.power')} value={hpStr} /> : null}
              {fuelType ? <SpecTile icon={Fuel} label={t('catalog.fuel_type')} value={fuelType} /> : null}
              {transmission ? <SpecTile icon={Cog} label={t('catalog.transmission')} value={transmission} /> : null}
              {bodyTypeStr ? <SpecTile icon={CarFront} label={t('catalog.body_type')} value={bodyTypeStr} /> : null}
              {engineCapacityStr ? <SpecTile icon={EngineIcon} label={t('catalog.engine_capacity')} value={engineCapacityStr} /> : null}
              {driveTypeStr ? <SpecTile icon={DrivetrainIcon} label={t('catalog.drive_type')} value={driveTypeStr} /> : null}
              {colorStr ? <SpecTile icon={Palette} label={t('catalog.color')} value={colorStr} /> : null}
              {mileageStr ? <SpecTile icon={Route} label={t('catalog.mileage')} value={mileageStr} /> : null}
              {condition ? <SpecTile icon={BadgeCheck} label={t('car_page.condition')} value={condition} /> : null}
              {car.priceUsd ? <PriceTile value={priceStr} /> : null}
            </div>
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
              alt={title}
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
          <h2 className="text-xl md:text-2xl font-semibold">{t('car_page.more_photos')}</h2>
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
                <CarouselItem key={idx} className="pl-2 md:pl-4 lg:pl-6 basis-1/2 sm:basis-1/3 md:basis-1/4">
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
            <h2 className="text-xl md:text-2xl font-semibold mb-4">{t('car_page.description')}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line break-words">{descriptionMain}</p>
          </div>


        </motion.div>

        <motion.div className="flex flex-col gap-3" variants={itemVariants}>
          <div className="rounded-xl border border-border p-6 bg-background sticky top-[100px] flex flex-col gap-6">
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{t('car_page.consultation')}</span>
              <p className="text-lg font-medium mt-3 text-foreground leading-snug">{t('car_page.consultation_desc')}</p>
            </div>
            
            <div className="w-full h-px bg-border"></div>

            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-2 text-sm text-foreground">
                <UserCheck className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">{t('car_page.personal_manager')}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground">
                <FileCheck className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">{t('car_page.transparent_terms')}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground">
                <ShieldCheck className="w-5 h-5 text-muted-foreground"  />
                <span className="font-medium">{t('car_page.docs_insurance')}</span>
              </li>
            </ul>

            <ManagerContactModal carTitle={title} carId={car.id} carPrice={priceStr} carImage={images[0]}>
              <button className="mt-4 w-full group relative overflow-hidden rounded-xl bg-foreground text-background py-4 font-semibold shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:-rotate-12" />
                  <span>{t('car_page.contact_manager')}</span>
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
            <h2 className="text-xl md:text-2xl font-semibold">{t('car_page.similar_cars')}</h2>
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
              
              // Localization for similar cars
              const itemTitle = currentLang === 'en' ? (item.title_en || item.title) : (item.title_ru || item.title);
              const itemFuel = getLocalizedValue(t, currentLang, item.fuelType_ru, item.fuelType_en, item.fuelType, 'filter_');
              const itemTrans = getLocalizedValue(t, currentLang, item.transmission_ru, item.transmission_en, item.transmission, 'filter_');
              const itemDriveType = getLocalizedValue(t, currentLang, item.driveType_ru, item.driveType_en, item.driveType || "");
              
              const itemRawTags = currentLang === 'en' ? (item.tags_en || item.tags) : (item.tags_ru || item.tags);
              const itemTags = itemRawTags ? itemRawTags.split(',').filter(tag => tag.trim() !== '') : [];
              const itemHp = item.horsepower ? `${item.horsepower} ${t('catalog.hp')}` : "";
              const itemZeroTo100 = item.acceleration ? `${item.acceleration} ${t('catalog.sec')}` : "";

              return (
                <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-start">
                  <CarCard
                    title={itemTitle}
                    image={mainImg}
                    tags={itemTags}
                    year={item.year}
                    meta={[itemFuel, itemTrans]}
                    specs={{ hp: itemHp, zeroTo100: itemZeroTo100 }}
                    details={{
                      mileage: item.mileage ? `${item.mileage.toLocaleString()} ${currentLang === 'en' ? 'km' : 'км'}` : undefined,
                      engineCapacity: item.engineCapacity,
                      driveType: itemDriveType
                    }}
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
