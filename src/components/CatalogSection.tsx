import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import imgBmwM5Competition from "../assets/5ff7312c3dc0a1014ede77a74beefcf8924374ee.png";
import client from "../api/client";
import { CarCard } from "./CarCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  images?: { isMain: boolean; pathOrUrl: string }[];
  tags?: string;
  year: number;
  fuelType: string;
  transmission: string;
  horsepower?: number;
  topSpeed?: number;
  priceUsd: number;
}

export default function CatalogSection({ mode = 'preview' }: CatalogSectionProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
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

  const filteredCars = cars.filter(car => 
    !searchQuery || 
    car.title.toLowerCase().includes(searchQuery) || 
    (car.tags && car.tags.toLowerCase().includes(searchQuery))
  );

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

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-[40px] py-[60px] md:py-[100px] flex flex-col gap-[40px]">
      {/* Header */}
      <div className="flex flex-row items-end justify-between gap-6 flex-wrap">
        <div className="flex flex-col gap-3">
          <motion.span 
            className="uppercase tracking-widest text-muted-foreground text-xs font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={mode === 'full' ? { opacity: 1, x: 0 } : undefined}
            whileInView={mode === 'preview' ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Наш шоурум
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-medium text-foreground leading-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={mode === 'full' ? { opacity: 1, x: 0 } : undefined}
            whileInView={mode === 'preview' ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Каталог автомобилей
          </motion.h2>
        </div>
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
          <div className="col-span-full text-center py-10 text-muted-foreground">Загрузка...</div>
        ) : displayCars.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            {searchQuery ? `По запросу "${searchQuery}" ничего не найдено` : "Нет автомобилей в наличии"}
          </div>
        ) : (
          displayCars.map((car) => {
            const mainImage = car.images?.find((i) => i.isMain)?.pathOrUrl || car.images?.[0]?.pathOrUrl || imgBmwM5Competition;

            // Transform DB data to UI props
            return (
              <motion.div
                key={car.id}
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
                  title={car.title}
                  image={mainImage}
                  tags={car.tags ? car.tags.split(',') : []}
                  meta={[
                    car.year.toString(),
                    car.fuelType,
                    car.transmission
                  ]}
                  specs={{
                    hp: `${car.horsepower || 0} л.с.`,
                    zeroTo100: `${car.topSpeed || 0} сек`
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
            <span>Перейти в каталог</span>
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
