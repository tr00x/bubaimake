import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import svgPaths from "../imports/svg-5qr6y18hqk";
import imgBmwM5Competition from "../assets/5ff7312c3dc0a1014ede77a74beefcf8924374ee.png";
import { ArrowLeft, ArrowRight } from "lucide-react";
import client from "../api/client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./ui/pagination";

// Icons
const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14 2.66667H9.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.66667 2.66667H2" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 8H8" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.33333 8H2" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 13.3333H10.6667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 13.3333H2" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.33333 1.33333V4" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.33333 6.66667V9.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.6667 12V14.6667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HorsePowerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 9.33333L10.6667 6.66667" stroke="#737373" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d={svgPaths.p1a6e4100} stroke="#737373" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SpeedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6.66667 1.33333H9.33333" stroke="#737373" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 9.33333L10 7.33333" stroke="#737373" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d={svgPaths.p1a6375c0} stroke="#737373" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export type CarCardProps = {
  title: string;
  image: string;
  tags?: string[];
  meta?: string[];
  specs: { hp: string; zeroTo100: string };
  price: string;
  id: string; // Changed from slug to id for simplicity, or we map it
};

export function CarCard({ title, image, tags = [], meta = [], specs, price, id }: CarCardProps) {
  return (
    <Link to={`/catalog/${id}`} className="bg-white rounded-[16px] border border-[#e6e6e6] overflow-hidden flex flex-col group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-[12px] left-[12px] flex flex-wrap gap-[8px]">
          {tags.map((t) => (
            <div key={t} className={`bg-white/90 px-[10px] py-[4px] rounded-[4px] border backdrop-blur-sm shadow-sm flex items-center justify-center ${t === "Горячее" ? "border-red-500" : "border-neutral-200"}`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${t === "Горячее" ? "text-red-600" : "text-[#141414]"}`}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-[20px] flex flex-col gap-[16px] flex-1">
        <div className="flex flex-col gap-[8px]">
          <h3 className="text-[#141414] text-[20px] font-semibold tracking-tight">{title}</h3>
          <div className="flex flex-wrap gap-[8px]">
            {meta.map((text) => (
              <span key={text} className="text-[13px] text-neutral-500 bg-neutral-100 px-[8px] py-[4px] rounded-[4px]">
                {text}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[12px] py-[12px] border-t border-b border-dashed border-neutral-200">
          <div className="flex flex-col gap-[2px]">
            <div className="flex items-center gap-[4px]">
              <HorsePowerIcon />
              <span className="text-[12px] text-neutral-400">Мощность</span>
            </div>
            <span className="text-[14px] font-medium text-[#141414]">{specs.hp}</span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <div className="flex items-center gap-[4px]">
              <SpeedIcon />
              <span className="text-[12px] text-neutral-400">Разгон 0-100</span>
            </div>
            <span className="text-[14px] font-medium text-[#141414]">{specs.zeroTo100}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-[4px]">
          <span className="text-[#141414] text-[20px] font-bold tracking-tight">{price}</span>
          <span className="w-[36px] h-[36px] rounded-full bg-[#141414] flex items-center justify-center text-white group-hover:bg-red-600 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CatalogSection() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/cars')
      .then(res => {
        setCars(res.data);
      })
      .catch(err => console.error("Failed to fetch cars", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-[40px] py-[60px] md:py-[100px] flex flex-col gap-[40px]">
      {/* Header */}
      <div className="flex flex-row items-end justify-between gap-6 flex-wrap">
        <div className="flex flex-col gap-[12px]">
          <span className="uppercase tracking-widest text-neutral-400 text-[12px] font-semibold">Наш склад</span>
          <h2 className="text-[32px] md:text-[40px] font-medium text-[#141414] leading-tight">Каталог автомобилей</h2>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
        {loading ? (
          <div className="col-span-full text-center py-10 text-neutral-400">Загрузка...</div>
        ) : cars.length === 0 ? (
          <div className="col-span-full text-center py-10 text-neutral-400">Нет автомобилей в наличии</div>
        ) : (
          cars.map((car) => {
            const mainImage = car.images?.find((i: any) => i.isMain)?.pathOrUrl || car.images?.[0]?.pathOrUrl || imgBmwM5Competition;

            // Transform DB data to UI props
            return (
              <CarCard
                key={car.id}
                title={car.title}
                image={mainImage}
                tags={car.tags ? car.tags.split(',') : []}
                meta={[
                  car.year.toString(),
                  car.fuelType,
                  car.transmission
                ]}
                specs={{
                  hp: car.horsepower ? `${car.horsepower} л.с.` : '—',
                  zeroTo100: car.topSpeed ? '3.3 сек' : '—' // topSpeed/0-100 logic needing revisit if not in DB, assume demo
                }}
                price={`$${car.priceUsd.toLocaleString()}`}
                id={car.id}
              />
            );
          })
        )}
      </div>

      {/* Pagination - Keep static for now or wire up later */}
      <Pagination className="mt-8 max-w-[800px] mx-0 justify-start px-[12px] py-[10px] bg-white rounded-[12px]">
        <PaginationContent className="gap-2">
          {/* ... Pagination code same as before ... */}
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              size="default" // or whatever the size prop should be, or remove isActive/size if optional and defaulted.
              className="w-[40px] h-[40px] rounded-[12px] bg-[#141414] text-white border border-[#141414] flex items-center justify-center px-0 hover:-translate-y-[1px] transition"
            >
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
