import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import imgBmwM5Competition from "../assets/5ff7312c3dc0a1014ede77a74beefcf8924374ee.png";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { ArrowRight, ArrowLeft, Gauge, Fuel, Calendar, Cog, BadgeCheck, Mail, UserCheck, FileCheck, ShieldCheck } from "lucide-react";
import client from "../api/client";
import { CarCard } from "../components/CatalogSection";

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

export default function CarPage() {
  const { slug } = useParams(); // Using ID as slug
  const [car, setCar] = useState<CarData | null>(null);
  const [similarCars, setSimilarCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  
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
    <section className="car-page-section max-w-[1400px] mx-auto px-4 md:px-[40px] pb-[100px] md:pb-[140px] flex flex-col gap-[24px]">
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

      {showSticky && (
        <div className="sticky top-[72px] z-40">
          <div className="bg-white/90 backdrop-blur-md border border-neutral-200 rounded-[12px] px-[16px] py-[12px] flex items-center justify-between shadow-lg shadow-black/5">
            <div className="flex items-center gap-[12px]">
              <span className="text-[15px] font-medium text-[#141414]">{car.title}</span>
              <div className="hidden md:flex gap-[8px]">
                {tagsList.map((t) => (
                  <span key={t} className={`px-[10px] py-[4px] rounded-[4px] border text-[11px] font-semibold uppercase tracking-wider ${t === "Горячее" ? "border-red-500 text-red-600" : "border-neutral-200 text-[#141414]"}`}>{t}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-[12px] ml-auto">
              <div className="px-[20px] py-[10px] bg-[#141414] text-white rounded-[12px] font-semibold tracking-tight shadow-lg shadow-black/10">
                {priceStr}
              </div>
              <a href="#" className="btn-slide">
                <span className="circle">
                  <Mail className="w-5 h-5" />
                </span>
                <span className="title">Написать менеджеру</span>
                <span className="title title-hover">Написать менеджеру</span>
              </a>
            </div>
          </div>
        </div>
      )}


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
        <div className="flex flex-col gap-[20px]">
          <h1 className="text-[32px] md:text-[40px] font-medium text-[#141414] leading-tight">
            {car.title}
          </h1>
          <div className="flex flex-wrap gap-[8px]">
            {tagsList.map((t) => (
              <span
                key={t}
                className={`px-[10px] py-[4px] rounded-[4px] border text-[11px] font-semibold uppercase tracking-wider ${t === "Горячее" ? "border-red-500 text-red-600" : "border-neutral-200 text-[#141414]"}`}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-[8px]">
            <span className="text-[13px] text-neutral-500 bg-neutral-100 px-[8px] py-[4px] rounded-[4px]">{car.year}</span>
            <span className="text-[13px] text-neutral-500 bg-neutral-100 px-[8px] py-[4px] rounded-[4px]">{car.fuelType}</span>
            <span className="text-[13px] text-neutral-500 bg-neutral-100 px-[8px] py-[4px] rounded-[4px]">{car.transmission}</span>
          </div>

          <div className="grid grid-cols-2 gap-[12px] py-[12px] border-t border-neutral-200">
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[6px] text-neutral-500">
                <Gauge className="w-4 h-4" />
                <span className="text-[12px]">Макс. скорость</span>
              </div>
              <span className="text-[18px] md:text-[20px] font-medium text-[#141414]">{car.topSpeed ? `${car.topSpeed} км/ч` : "—"}</span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[6px] text-neutral-500">
                <Calendar className="w-4 h-4" />
                <span className="text-[12px]">Год выпуска</span>
              </div>
              <span className="text-[18px] md:text-[20px] font-medium text-[#141414]">{car.year}</span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[6px] text-neutral-500">
                <Cog className="w-4 h-4" />
                <span className="text-[12px]">КПП</span>
              </div>
              <span className="text-[18px] md:text-[20px] font-medium text-[#141414]">{car.transmission}</span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[6px] text-neutral-500">
                <Fuel className="w-4 h-4" />
                <span className="text-[12px]">Тип топлива</span>
              </div>
              <span className="text-[18px] md:text-[20px] font-medium text-[#141414]">{car.fuelType}</span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[6px] text-neutral-500">
                <Gauge className="w-4 h-4" />
                <span className="text-[12px]">Мощность</span>
              </div>
              <span className="text-[18px] md:text-[20px] font-medium text-[#141414]">{car.horsepower} л.с.</span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[6px] text-neutral-500">
                <BadgeCheck className="w-4 h-4" />
                <span className="text-[12px]">Состояние</span>
              </div>
              <span className="text-[18px] md:text-[20px] font-medium text-[#141414]">{car.condition}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-[12px]">
            <div className="px-[20px] py-[10px] bg-[#141414] text-white rounded-[12px] font-semibold tracking-tight shadow-lg shadow-black/10">
              {priceStr}
            </div>
            <button type="button" className="btn-slide">
              <span className="circle">
                <Mail className="w-5 h-5" />
              </span>
              <span className="title">Написать менеджеру</span>
              <span className="title title-hover">Написать менеджеру</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px]">
            <img
              src={images[activeImageIndex]}
              alt={car.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[12px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] md:text-[24px] font-semibold">Больше фото</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="w-[36px] h-[36px] flex items-center justify-center rounded-full border border-neutral-200 bg-white text-[#141414] hover:bg-neutral-50 transition-colors"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="w-[36px] h-[36px] flex items-center justify-center rounded-full border border-neutral-200 bg-white text-[#141414] hover:bg-neutral-50 transition-colors"
              aria-label="Next image"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-[4/3] w-full overflow-hidden rounded-[12px] transition-all hover:opacity-90 ${idx === activeImageIndex
                  ? "ring-2 ring-[#141414] ring-offset-2"
                  : "border border-neutral-100 hover:border-neutral-300"
                }`}
            >
              <img
                src={src}
                alt={`${car.title} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]" style={{ marginTop: "30px" }}>
        <div className="lg:col-span-2 flex flex-col gap-[24px]">
          <div>
            <h2 className="text-[20px] md:text-[24px] font-semibold mb-[16px]">Описание</h2>
            <p className="text-neutral-600 leading-relaxed whitespace-pre-line">{car.descriptionMd?.split("**Комплектация:**")[0]}</p>
          </div>

          <div>
            <h2 className="text-[20px] md:text-[24px] font-semibold mb-[16px]">Комплектация</h2>
            {/* Parse MD bullet points for features */}
            <div className="flex flex-wrap gap-[8px]">
              {car.descriptionMd?.split("**Комплектация:**")[1]?.split('\n').filter(l => l.trim().startsWith('*')).map((f, i) => (
                <span key={i} className="text-[13px] text-neutral-600 bg-neutral-100 px-[10px] py-[6px] rounded-[8px] border border-neutral-200">
                  {f.replace('*', '').trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[12px]">
          <div className="rounded-[20px] border border-neutral-100 p-[24px] bg-white sticky top-[100px] flex flex-col gap-6">
            <div>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Консультация</span>
              <p className="text-[18px] font-medium mt-3 text-[#141414] leading-snug">Рассчитаем доставку и растаможку, подберём лучшее предложение</p>
            </div>
            
            <div className="w-full h-px bg-neutral-100"></div>

            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-[14px] text-[#141414]">
                <UserCheck className="w-5 h-5 text-neutral-400" />
                <span className="font-medium">Персональный менеджер</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#141414]">
                <FileCheck className="w-5 h-5 text-neutral-400" />
                <span className="font-medium">Прозрачные условия сделки</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#141414]">
                <ShieldCheck className="w-5 h-5 text-neutral-400" />
                <span className="font-medium">Документы и страхование</span>
              </li>
            </ul>

            <a href="#" className="mt-2 btn-slide w-full justify-center group">
              <span className="circle group-hover:bg-white group-hover:text-[#141414]">
                <Mail className="w-5 h-5" />
              </span>
              <span className="title">Написать менеджеру</span>
              <span className="title title-hover">Написать менеджеру</span>
            </a>
          </div>
        </div>
      </div>

      {similarCars.length > 0 && (
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] md:text-[24px] font-semibold">Похожие автомобили</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollSimilar('left')}
                className="w-[36px] h-[36px] flex items-center justify-center rounded-full border border-neutral-200 bg-white text-[#141414] hover:bg-neutral-50 transition-colors"
                aria-label="Scroll left"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSimilar('right')}
                className="w-[36px] h-[36px] flex items-center justify-center rounded-full border border-neutral-200 bg-white text-[#141414] hover:bg-neutral-50 transition-colors"
                aria-label="Scroll right"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div 
            ref={similarCarsRef}
            className="flex gap-[24px] overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
        </div>
      )}
    </section>
  );
}
