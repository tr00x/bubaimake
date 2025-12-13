import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import imgBmwM5Competition from "figma:asset/5ff7312c3dc0a1014ede77a74beefcf8924374ee.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";
import { ArrowRight, Gauge, Fuel, Calendar, Cog, BadgeCheck } from "lucide-react";
import { CarCard } from "../components/CatalogSection";

type CarData = {
  title: string;
  price: string;
  tags: string[];
  specs: { label: string; value: string }[];
  images: string[];
  description: string;
  features: string[];
  performance?: {
    powerHP?: string;
    torqueNm?: string;
    zeroTo100?: string;
    vmax?: string;
  };
  dimensions?: {
    length?: string;
    width?: string;
    height?: string;
    wheelbase?: string;
  };
  consumption?: {
    wltpCombined?: string;
    co2Combined?: string;
  };
};

export default function CarPage() {
  const { slug } = useParams();
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setShowSticky(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const car: CarData = useMemo(() => {
    // Demo data; can be sourced from API later
    return {
      title: "BMW M5 Competition",
      price: "$138,889",
      tags: ["Горячее", "Новый"],
      specs: [
        { label: "Год", value: "2024" },
        { label: "Топливо", value: "Бензин" },
        { label: "КПП", value: "Автомат" },
        { label: "Мощность", value: "625 л.с." },
        { label: "0–100 км/ч", value: "3.3 сек" },
      ],
      images: [imgBmwM5Competition, imgBmwM5Competition, imgBmwM5Competition],
      description:
        "Спортивный седан премиум-класса с мощным двигателем и богатой комплектацией. Идеален для динамичной езды и комфортных поездок. Автомобиль с прозрачной историей и гарантией качества.",
      features: [
        "Кожа Nappa",
        "Премиальная аудиосистема",
        "Пакет M Sport",
        "Адаптивная подвеска",
        "Подогрев сидений",
        "Панорамная крыша",
      ],
      performance: {
        powerHP: "625 л.с.",
        torqueNm: "750 Нм",
        zeroTo100: "3.3 сек",
        vmax: "305 км/ч",
      },
      dimensions: {
        length: "4970 мм",
        width: "1903 мм",
        height: "1473 мм",
        wheelbase: "2982 мм",
      },
      consumption: {
        wltpCombined: "10.6–10.8 л/100 км",
        co2Combined: "240–245 г/км",
      },
    };
  }, [slug]);

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-[40px] pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] flex flex-col gap-[24px]">
      {showSticky && (
        <div className="sticky top-[72px] z-40">
          <div className="bg-white/90 backdrop-blur-md border border-neutral-200 rounded-[12px] px-[16px] py-[12px] flex items-center justify-between shadow-lg shadow-black/5">
            <div className="flex items-center gap-[12px]">
              <span className="text-[15px] font-medium text-[#141414]">{car.title}</span>
              <div className="hidden md:flex gap-[8px]">
                {car.tags.map((t) => (
                  <span key={t} className={`px-[10px] py-[4px] rounded-[4px] border text-[11px] font-semibold uppercase tracking-wider ${t === "Горячее" ? "border-red-500 text-red-600" : "border-neutral-200 text-[#141414]"}`}>{t}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-[12px] ml-auto">
              <div className="px-[20px] py-[10px] bg-[#141414] text-white rounded-[12px] font-semibold tracking-tight shadow-lg shadow-black/10">
                {car.price}
              </div>
              <a href="#" className="inline-flex items-center gap-[10px] px-[20px] py-[12px] rounded-[12px] bg-[#141414] text-white hover:bg-neutral-800 active:scale-95 transition-all shadow-lg shadow-black/10">
                <span className="text-[14px]">Оставить заявку</span>
                <ArrowRight className="w-4 h-4" />
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
            {car.tags.map((t) => (
              <span
                key={t}
                className={`px-[10px] py-[4px] rounded-[4px] border text-[11px] font-semibold uppercase tracking-wider ${t === "Горячее" ? "border-red-500 text-red-600" : "border-neutral-200 text-[#141414]"}`}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-[8px]">
            {car.specs.slice(0, 3).map((s) => (
              <span
                key={s.label}
                className="text-[13px] text-neutral-500 bg-neutral-100 px-[8px] py-[4px] rounded-[4px]"
              >
                {s.value}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-[12px] py-[12px] border-t border-neutral-200">
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[6px] text-neutral-500">
                <Gauge className="w-4 h-4" />
                <span className="text-[12px]">Макс. скорость</span>
              </div>
              <span className="text-[18px] md:text-[20px] font-medium text-[#141414]">{car.performance?.vmax || "—"}</span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[6px] text-neutral-500">
                <Calendar className="w-4 h-4" />
                <span className="text-[12px]">Год выпуска</span>
              </div>
              <span className="text-[18px] md:text-[20px] font-medium text-[#141414]">{car.specs.find(s=>s.label==="Год")?.value || "—"}</span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[6px] text-neutral-500">
                <Cog className="w-4 h-4" />
                <span className="text-[12px]">КПП</span>
              </div>
              <span className="text-[18px] md:text-[20px] font-medium text-[#141414]">{car.specs.find(s=>s.label==="КПП")?.value || "—"}</span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[6px] text-neutral-500">
                <Fuel className="w-4 h-4" />
                <span className="text-[12px]">Тип топлива</span>
              </div>
              <span className="text-[18px] md:text-[20px] font-medium text-[#141414]">{car.specs.find(s=>s.label==="Топливо")?.value || "—"}</span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[6px] text-neutral-500">
                <Gauge className="w-4 h-4" />
                <span className="text-[12px]">Мощность</span>
              </div>
              <span className="text-[18px] md:text-[20px] font-medium text-[#141414]">{car.performance?.powerHP || "—"}</span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[6px] text-neutral-500">
                <BadgeCheck className="w-4 h-4" />
                <span className="text-[12px]">Состояние</span>
              </div>
              <span className="text-[18px] md:text-[20px] font-medium text-[#141414]">{car.tags.includes("Новый") ? "Новый" : "C пробегом"}</span>
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <button className="px-[32px] py-[16px] bg-[#141414] text-white rounded-[14px] font-semibold tracking-tight shadow-lg shadow-black/10 hover:bg-neutral-900 active:scale-95 transition-all">
              {car.price}
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px]">
            <img
              src={car.images[activeImageIndex]}
              alt={car.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[12px]">
        <h2 className="text-[20px] md:text-[24px] font-semibold">Больше фото</h2>
        <div className="bg-white rounded-[16px] border border-[#e6e6e6] p-4">
          <Carousel className="rounded-[12px]">
            <CarouselContent className="flex gap-2">
              {car.images.map((src, idx) => (
                <CarouselItem
                  key={idx}
                  className="basis-auto min-w-[36px] md:min-w-[48px]"
                >
                  <button
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-full overflow-hidden rounded-[10px] border ${
                      idx === activeImageIndex
                        ? "border-[#141414] ring-2 ring-[#141414]"
                        : "border-[#e6e6e6]"
                    }`}
                    aria-label={`Фото ${idx + 1}`}
                  >
                    <div className="aspect-[4/3] bg-neutral-100">
                      <img
                        src={src}
                        alt={`${car.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="w-[40px] h-[40px] rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 shadow-sm active:scale-95 transition-all" />
            <CarouselNext className="w-[40px] h-[40px] rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 shadow-sm active:scale-95 transition-all" />
          </Carousel>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
        <div className="lg:col-span-2 flex flex-col gap-[16px]">
          <h2 className="text-[20px] md:text-[24px] font-semibold">Описание</h2>
          <p className="text-neutral-600 leading-relaxed">{car.description}</p>

          <h2 className="text-[20px] md:text-[24px] font-semibold mt-[8px]">Характеристики</h2>
          <div className="grid grid-cols-2 gap-[12px] py-[12px] border-y border-dashed border-neutral-200">
            {car.specs.map((s) => (
              <div key={s.label} className="flex flex-col gap-[2px]">
                <span className="text-[12px] text-neutral-400">{s.label}</span>
                <span className="text-[14px] font-medium text-[#141414]">{s.value}</span>
              </div>
            ))}
            {[
              { label: "Макс. скорость", value: car.performance?.vmax },
              { label: "Мощность", value: car.performance?.powerHP },
              { label: "Крутящий момент", value: car.performance?.torqueNm },
              { label: "0–100 км/ч", value: car.performance?.zeroTo100 },
            ].map((p) => (
              <div key={p.label} className="flex flex-col gap-[2px]">
                <span className="text-[12px] text-neutral-400">{p.label}</span>
                <span className="text-[14px] font-medium text-[#141414]">{p.value || "—"}</span>
              </div>
            ))}
          </div>

          

          <h2 className="text-[20px] md:text-[24px] font-semibold mt-[8px]">Комплектация</h2>
          <div className="flex flex-wrap gap-[8px]">
            {car.features.map((f) => (
              <span key={f} className="text-[13px] text-neutral-600 bg-neutral-100 px-[10px] py-[6px] rounded-[8px] border border-neutral-200">
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[12px]">
          <div className="rounded-[12px] border border-[#e6e6e6] p-[16px] bg-white shadow-sm">
            <span className="text-[13px] font-semibold text-neutral-500 uppercase tracking-wider">Консультация</span>
            <p className="text-[16px] font-medium mt-2 text-[#141414]">Рассчитаем доставку и растаможку, подберём лучшее предложение</p>
            <ul className="mt-3 flex flex-col gap-2 text-[13px] text-neutral-600">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Персональный менеджер</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Прозрачные условия сделки</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Документы и страхование</li>
            </ul>
            <a href="#" className="mt-4 ml-auto inline-flex items-center gap-[10px] px-[20px] py-[12px] rounded-[12px] bg-[#141414] text-white hover:bg-neutral-800 active:scale-95 transition-all shadow-lg shadow-black/10">
              <span className="text-[14px]">Написать менеджеру</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[16px]">
        <h2 className="text-[20px] md:text-[24px] font-semibold">Похожие автомобили</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
          {[
            {
              title: "Audi RS6 Performance",
              slug: "audi-rs6-performance",
              meta: ["2023", "Бензин", "Автомат"],
              specs: { hp: "630 л.с.", zeroTo100: "3.4 сек" },
              price: "$129,000",
              tags: [],
            },
            {
              title: "Mercedes-AMG E63 S",
              slug: "mercedes-amg-e63-s",
              meta: ["2022", "Бензин", "Автомат"],
              specs: { hp: "612 л.с.", zeroTo100: "3.2 сек" },
              price: "$119,500",
              tags: [],
            },
            {
              title: "Porsche Panamera Turbo S",
              slug: "porsche-panamera-turbo-s",
              meta: ["2021", "Бензин", "Автомат"],
              specs: { hp: "630 л.с.", zeroTo100: "3.1 сек" },
              price: "$139,900",
              tags: [],
            },
            {
              title: "BMW M3 Competition",
              slug: "bmw-m3-competition",
              meta: ["2024", "Бензин", "Автомат"],
              specs: { hp: "510 л.с.", zeroTo100: "3.8 сек" },
              price: "$96,700",
              tags: [],
            },
          ].map((item) => (
            <CarCard
              key={item.slug}
              title={item.title}
              image={imgBmwM5Competition}
              tags={item.tags}
              meta={item.meta}
              specs={item.specs}
              price={item.price}
              slug={item.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
