import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import imgBmwM5Competition from "../assets/5ff7312c3dc0a1014ede77a74beefcf8924374ee.png";
import client from "../api/client";
import { CarCard } from "./CarCard";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getLocalizedValue } from "../utils/localization";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";

type CatalogSectionProps = {
  mode?: 'preview' | 'full';
};

interface Car {
  id: string;
  title: string;
  title_ru?: string;
  title_en?: string;
  images?: { isMain: boolean; pathOrUrl: string }[];
  tags?: string;
  tags_ru?: string;
  tags_en?: string;
  year: number;
  fuelType: string;
  fuelType_ru?: string;
  fuelType_en?: string;
  transmission: string;
  transmission_ru?: string;
  transmission_en?: string;
  horsepower?: number;
  topSpeed?: number;
  priceUsd: number;
}

export default function CatalogSection({ mode = 'preview' }: CatalogSectionProps) {
  const { t, i18n } = useTranslation();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || "";
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    client.get('/cars')
      .then(res => {
        setCars(res.data);
      })
      .catch(err => console.error("Failed to fetch cars", err))
      .finally(() => setLoading(false));
  }, []);

  // Extract unique brands with smart casing (prefer BMW over bmw)
  const brands = useMemo(() => {
    const brandMap = new Map<string, string>(); // normalized -> display
    
    cars.forEach(car => {
      const brand = car.title.trim().split(' ')[0];
      if (!brand) return;
      
      const normalized = brand.toLowerCase();
      
      if (!brandMap.has(normalized)) {
        brandMap.set(normalized, brand);
      } else {
        // If we already have it, prefer uppercase or capitalized version
        const existing = brandMap.get(normalized)!;
        // If current is all caps and existing is not, take current
        if (brand === brand.toUpperCase() && existing !== existing.toUpperCase()) {
          brandMap.set(normalized, brand);
        }
        // If current is Capitalized and existing is lowercase, take current
        else if (brand[0] === brand[0].toUpperCase() && existing[0] !== existing[0].toUpperCase()) {
          brandMap.set(normalized, brand);
        }
      }
    });
    
    return Array.from(brandMap.values()).sort();
  }, [cars]);

  const filteredCars = cars.filter(car => {
    const matchesSearch = !searchQuery || 
      car.title.toLowerCase().includes(searchQuery) || 
      (car.tags && car.tags.toLowerCase().includes(searchQuery));
      
    const matchesBrand = !selectedBrand || car.title.toLowerCase().startsWith(selectedBrand.toLowerCase());
    
    return matchesSearch && matchesBrand;
  });

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const displayCars = mode === 'preview' 
    ? filteredCars.slice(0, 12) 
    : filteredCars.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const clearFilters = () => {
    setSelectedBrand(null);
    if (searchQuery) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('q');
      setSearchParams(newParams);
    }
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-[40px] py-[60px] md:py-[100px] flex flex-col gap-[40px]">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-end justify-between gap-6 flex-wrap">
          <div className="flex flex-col gap-3">
            <motion.span 
              className="uppercase tracking-widest text-muted-foreground text-xs font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={mode === 'full' ? { opacity: 1, x: 0 } : undefined}
              whileInView={mode === 'preview' ? { opacity: 1, x: 0 } : undefined}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              {t('catalog.showroom')}
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-medium text-foreground leading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={mode === 'full' ? { opacity: 1, x: 0 } : undefined}
              whileInView={mode === 'preview' ? { opacity: 1, x: 0 } : undefined}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {t('catalog.title')}
            </motion.h2>
          </div>
        </div>

        {/* Filters - Hidden temporarily as requested */}
        {/* {(mode === 'full' || brands.length > 0) && (
          <motion.div 
            className="flex flex-wrap gap-2 items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button 
              onClick={() => setSelectedBrand(null)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${!selectedBrand ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
            >
              {t('catalog.all_brands') || 'Все'}
            </button>
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedBrand === brand ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
              >
                {brand}
              </button>
            ))}
            {(searchQuery || selectedBrand) && (
               <button 
                onClick={clearFilters}
                className="ml-auto flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2"
              >
                <X className="w-4 h-4" />
                {t('catalog.clear_filters') || 'Сбросить'}
              </button>
            )}
          </motion.div>
        )} */}
      </div>

      {/* Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial="hidden"
        animate={mode === 'full' ? "visible" : undefined}
        whileInView={mode === 'preview' ? "visible" : undefined}
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {loading ? (
          <div className="col-span-full text-center py-10 text-muted-foreground">{t('catalog.loading')}</div>
        ) : displayCars.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            {searchQuery ? t('catalog.no_results', { query: searchQuery }) : t('catalog.no_cars')}
          </div>
        ) : (
          displayCars.map((car, idx) => {
            const mainImage = car.images?.find((i) => i.isMain)?.pathOrUrl || car.images?.[0]?.pathOrUrl || imgBmwM5Competition;
            
            // Localization logic
            const currentLang = i18n.language;
            const title = currentLang === 'en' ? (car.title_en || car.title) : (car.title_ru || car.title);
            const fuelType = getLocalizedValue(t, currentLang, car.fuelType_ru, car.fuelType_en, car.fuelType, 'filter_');
            const transmission = getLocalizedValue(t, currentLang, car.transmission_ru, car.transmission_en, car.transmission, 'filter_');
            
            // Localized tags
            const rawTags = currentLang === 'en' ? (car.tags_en || car.tags) : (car.tags_ru || car.tags);
            const tags = rawTags ? rawTags.split(',').filter(tag => tag.trim() !== '') : [];
            
            const yearStr = car.year.toString();
            const filteredTags = tags.filter(tag => 
              tag.trim() !== yearStr && 
              tag.trim().toLowerCase() !== fuelType.toLowerCase() && 
              tag.trim().toLowerCase() !== transmission.toLowerCase()
            );

            // Transform DB data to UI props
            return (
              <motion.div
                key={`${car.id}-${idx}`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" }
                  }
                }}
              >
                <CarCard
                  title={title}
                  image={mainImage}
                  tags={filteredTags}
                  year={car.year}
                  meta={[
                    fuelType,
                    transmission
                  ]}
                  specs={{
                    hp: `${car.horsepower || 0} ${t('catalog.hp')}`,
                    zeroTo100: `${car.topSpeed || 0} ${t('catalog.kmh')}`
                  }}
                  price={`$${car.priceUsd.toLocaleString()}`}
                  id={car.id}
                />
              </motion.div>
            );
          })
        )}
      </motion.div>

      {mode === 'preview' ? (
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link 
            to="/catalog" 
            className="bg-primary text-primary-foreground px-6 py-4 md:py-5 rounded-xl text-base font-medium hover:bg-primary/90 active:scale-[0.98] transition-all text-center"
          >
            <span>{t('catalog.go_to_catalog')}</span>
          </Link>
        </motion.div>
      ) : (
        totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Pagination className="mt-12">
              <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  onClick={(e: React.MouseEvent) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                  className={`w-9 h-9 p-0 rounded-full flex items-center justify-center transition-all border-none ring-0 outline-none shadow-none bg-transparent ${currentPage === 1 ? "pointer-events-none opacity-30" : "cursor-pointer hover:bg-secondary"}`}
                  size="icon"
                >
                  <ChevronLeft className="w-5 h-5" />
                </PaginationLink>
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={false}
                    onClick={(e: React.MouseEvent) => { e.preventDefault(); handlePageChange(page); }}
                    className={`w-9 h-9 p-0 rounded-full flex items-center justify-center text-sm font-medium transition-all border-none ring-0 outline-none shadow-none ${
                      page === currentPage 
                        ? "bg-primary text-primary-foreground scale-110 font-bold" 
                        : "bg-transparent text-foreground hover:bg-secondary"
                    }`}
                    size="icon"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  onClick={(e: React.MouseEvent) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                  className={`w-9 h-9 p-0 rounded-full flex items-center justify-center transition-all border-none ring-0 outline-none shadow-none bg-transparent ${currentPage === totalPages ? "pointer-events-none opacity-30" : "cursor-pointer hover:bg-secondary"}`}
                  size="icon"
                >
                  <ChevronRight className="w-5 h-5" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          </motion.div>
        )
      )}
    </section>
  );
}
