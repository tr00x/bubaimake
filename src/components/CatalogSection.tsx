import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import imgBmwM5Competition from "../assets/5ff7312c3dc0a1014ede77a74beefcf8924374ee.png";
import client from "../api/client";
import { CarCard } from "./CarCard";
import { ChevronLeft, ChevronRight, X, Filter, SlidersHorizontal, Check, CarFront, Gauge, Fuel, Zap, Paintbrush, Activity } from "lucide-react";
import { getLocalizedValue } from "../utils/localization";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "./ui/sheet";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

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
  mileage?: number;
  fuelType: string;
  fuelType_ru?: string;
  fuelType_en?: string;
  transmission: string;
  transmission_ru?: string;
  transmission_en?: string;
  horsepower?: number;
  topSpeed?: number;
  acceleration?: number;
  engineCapacity?: string;
  driveType?: string;
  driveType_ru?: string;
  driveType_en?: string;
  bodyType?: string;
  bodyType_ru?: string;
  bodyType_en?: string;
  priceUsd: number;
  color?: string;
  color_ru?: string;
  color_en?: string;
  condition?: string;
  condition_ru?: string;
  condition_en?: string;
}

export default function CatalogSection({ mode = 'preview' }: CatalogSectionProps) {
  const { t, i18n } = useTranslation();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const ITEMS_PER_PAGE = 12;

  // Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  
  // Ranges
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [yearRange, setYearRange] = useState<[number, number]>([1990, new Date().getFullYear()]);
  const [mileageRange, setMileageRange] = useState<[number, number]>([0, 500000]);
  const [horsepowerRange, setHorsepowerRange] = useState<[number, number]>([0, 2000]);

  // Selects
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [selectedTrans, setSelectedTrans] = useState<string[]>([]);
  const [selectedBody, setSelectedBody] = useState<string[]>([]);
  const [selectedDrive, setSelectedDrive] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  
  // Derived limits
  const [limits, setLimits] = useState({
    minPrice: 0,
    maxPrice: 1000000,
    minYear: 1990,
    maxYear: new Date().getFullYear(),
    minMileage: 0,
    maxMileage: 500000,
    minHorsepower: 0,
    maxHorsepower: 2000
  });

  useEffect(() => {
    client.get('/cars')
      .then(res => {
        const data: Car[] = res.data;
        setCars(data);
        
        // Calculate limits
        if (data.length > 0) {
          const prices = data.map(c => c.priceUsd);
          const years = data.map(c => c.year);
          const mileages = data.map(c => c.mileage || 0);
          const powers = data.map(c => c.horsepower || 0);

          const minP = Math.min(...prices);
          const maxP = Math.max(...prices);
          const minY = Math.min(...years);
          const maxY = Math.max(...years);
          const minM = Math.min(...mileages);
          const maxM = Math.max(...mileages);
          const minHP = Math.min(...powers);
          const maxHP = Math.max(...powers);
          
          const newLimits = {
            minPrice: Math.floor(minP / 1000) * 1000,
            maxPrice: Math.ceil(maxP / 1000) * 1000,
            minYear: minY,
            maxYear: maxY,
            minMileage: Math.floor(minM / 1000) * 1000,
            maxMileage: Math.ceil(maxM / 1000) * 1000,
            minHorsepower: Math.floor(minHP / 50) * 50,
            maxHorsepower: Math.ceil(maxHP / 50) * 50,
          };

          setLimits(newLimits);
          
          // Initialize ranges if not set by user interaction yet
          setPriceRange([newLimits.minPrice, newLimits.maxPrice]);
          setYearRange([newLimits.minYear, newLimits.maxYear]);
          setMileageRange([newLimits.minMileage, newLimits.maxMileage]);
          setHorsepowerRange([newLimits.minHorsepower, newLimits.maxHorsepower]);
        }
      })
      .catch(err => console.error("Failed to fetch cars", err))
      .finally(() => setLoading(false));
  }, []);

  // Sync search query from URL
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  const updateSearch = (val: string) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set('q', val);
    else newParams.delete('q');
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  // Extract unique values for filters
  const uniqueBrands = useMemo(() => {
    const brands = new Set<string>();
    cars.forEach(c => {
      const brand = c.title.trim().split(' ')[0];
      if (brand) brands.add(brand);
    });
    return Array.from(brands).sort();
  }, [cars]);

  const uniqueFuelTypes = useMemo(() => Array.from(new Set(cars.map(c => c.fuelType).filter((t): t is string => !!t))), [cars]);
  const uniqueTransmissions = useMemo(() => Array.from(new Set(cars.map(c => c.transmission).filter((t): t is string => !!t))), [cars]);
  const uniqueBodyTypes = useMemo(() => Array.from(new Set(cars.map(c => c.bodyType).filter((t): t is string => !!t))), [cars]);
  const uniqueDriveTypes = useMemo(() => Array.from(new Set(cars.map(c => c.driveType).filter((t): t is string => !!t))), [cars]);
  const uniqueColors = useMemo(() => Array.from(new Set(cars.map(c => c.color).filter((t): t is string => !!t))), [cars]);
  const uniqueConditions = useMemo(() => Array.from(new Set(cars.map(c => c.condition).filter((t): t is string => !!t))), [cars]);

  // Filtering Logic
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = !searchQuery || 
        car.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (car.tags && car.tags.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesBrand = selectedBrand === "all" || car.title.toLowerCase().startsWith(selectedBrand.toLowerCase());
      
      const matchesPrice = car.priceUsd >= priceRange[0] && car.priceUsd <= priceRange[1];
      const matchesYear = car.year >= yearRange[0] && car.year <= yearRange[1];
      const matchesMileage = (car.mileage || 0) >= mileageRange[0] && (car.mileage || 0) <= mileageRange[1];
      const matchesHP = (car.horsepower || 0) >= horsepowerRange[0] && (car.horsepower || 0) <= horsepowerRange[1];
      
      const matchesFuel = selectedFuel.length === 0 || selectedFuel.includes(car.fuelType);
      const matchesTrans = selectedTrans.length === 0 || selectedTrans.includes(car.transmission);
      const matchesBody = selectedBody.length === 0 || (car.bodyType && selectedBody.includes(car.bodyType));
      const matchesDrive = selectedDrive.length === 0 || (car.driveType && selectedDrive.includes(car.driveType));
      const matchesColor = selectedColor.length === 0 || (car.color && selectedColor.includes(car.color));
      const matchesCondition = selectedCondition.length === 0 || (car.condition && selectedCondition.includes(car.condition));

      return matchesSearch && matchesBrand && matchesPrice && matchesYear && matchesMileage && matchesHP &&
             matchesFuel && matchesTrans && matchesBody && matchesDrive && matchesColor && matchesCondition;
    });
  }, [cars, searchQuery, selectedBrand, priceRange, yearRange, mileageRange, horsepowerRange, 
      selectedFuel, selectedTrans, selectedBody, selectedDrive, selectedColor, selectedCondition]);

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

  const clearAllFilters = () => {
    setSelectedBrand("all");
    setPriceRange([limits.minPrice, limits.maxPrice]);
    setYearRange([limits.minYear, limits.maxYear]);
    setMileageRange([limits.minMileage, limits.maxMileage]);
    setHorsepowerRange([limits.minHorsepower, limits.maxHorsepower]);
    setSelectedFuel([]);
    setSelectedTrans([]);
    setSelectedBody([]);
    setSelectedDrive([]);
    setSelectedColor([]);
    setSelectedCondition([]);
    updateSearch("");
  };

  const activeFilterCount = [
    selectedBrand !== "all",
    priceRange[0] > limits.minPrice || priceRange[1] < limits.maxPrice,
    yearRange[0] > limits.minYear || yearRange[1] < limits.maxYear,
    mileageRange[0] > limits.minMileage || mileageRange[1] < limits.maxMileage,
    horsepowerRange[0] > limits.minHorsepower || horsepowerRange[1] < limits.maxHorsepower,
    selectedFuel.length > 0,
    selectedTrans.length > 0,
    selectedBody.length > 0,
    selectedDrive.length > 0,
    selectedColor.length > 0,
    selectedCondition.length > 0
  ].filter(Boolean).length;

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-[40px] py-[60px] md:py-[100px] flex flex-col gap-[30px]">
      {/* Header */}
      <div className="flex flex-col gap-6">
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
            <div className="flex flex-wrap items-end justify-between gap-4">
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
                
                {mode === 'full' && (
                    <div className="text-muted-foreground text-sm">
                        {t('catalog.found_cars', { count: filteredCars.length })}
                    </div>
                )}
            </div>
        </div>

        {/* Filters Bar - Only in Full Mode */}
        {mode === 'full' && (
            <motion.div 
                className="flex flex-col lg:flex-row gap-4 p-4 rounded-2xl bg-secondary/30 border border-border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex flex-1 flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 min-w-[200px]">
                        <Input 
                            placeholder={t('catalog.search_placeholder') || "Search..."} 
                            value={searchQuery}
                            onChange={(e) => updateSearch(e.target.value)}
                            className="w-full bg-background border-border/50"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => updateSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-background border-border/50">
                            <SelectValue placeholder={t('catalog.brand')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t('catalog.all_brands') || "All Brands"}</SelectItem>
                            {uniqueBrands.map(brand => (
                                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-3">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="w-full lg:w-auto bg-background border-border/50 gap-2 min-w-[140px]">
                                <SlidersHorizontal className="w-4 h-4" />
                                {t('catalog.filters')}
                                {activeFilterCount > 0 && (
                                    <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center rounded-full ml-1">
                                        {activeFilterCount}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:w-[500px] overflow-y-auto">
                            <SheetHeader className="px-6">
                                <SheetTitle>{t('catalog.all_filters')}</SheetTitle>
                                <SheetDescription>
                                    {t('catalog.filters_desc')}
                                </SheetDescription>
                            </SheetHeader>
                            
                            <div className="py-6 px-6 space-y-6">
                                {/* Condition Tabs */}
                                <Tabs 
                                    defaultValue="all" 
                                    value={selectedCondition.length === 0 ? "all" : selectedCondition[0]} 
                                    onValueChange={(val) => {
                                        if (val === "all") setSelectedCondition([]);
                                        else setSelectedCondition([val]);
                                    }}
                                    className="w-full"
                                >
                                    <TabsList className="w-full grid grid-cols-3">
                                        <TabsTrigger value="all">{t('catalog.condition_all')}</TabsTrigger>
                                        <TabsTrigger value="New">{t('filter_new')}</TabsTrigger>
                                        <TabsTrigger value="Used">{t('filter_used')}</TabsTrigger>
                                    </TabsList>
                                </Tabs>

                                <Accordion type="multiple" defaultValue={["price", "specs"]} className="w-full">
                                    
                                    {/* Main Specs */}
                                    <AccordionItem value="price">
                                        <AccordionTrigger className="hover:no-underline">
                                            <div className="flex items-center gap-2">
                                                <CarFront className="w-4 h-4 text-primary" />
                                                <span>{t('catalog.main_info')}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-6 pt-4 px-1">
                                            {/* Price */}
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <Label>{t('catalog.price')}</Label>
                                                    <span className="text-sm text-muted-foreground">${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</span>
                                                </div>
                                                <Slider
                                                    value={priceRange}
                                                    min={limits.minPrice}
                                                    max={limits.maxPrice}
                                                    step={1000}
                                                    onValueChange={(val: any) => setPriceRange(val)}
                                                />
                                            </div>

                                            {/* Year */}
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <Label>{t('catalog.year')}</Label>
                                                    <span className="text-sm text-muted-foreground">{yearRange[0]} - {yearRange[1]}</span>
                                                </div>
                                                <Slider
                                                    value={yearRange}
                                                    min={limits.minYear}
                                                    max={limits.maxYear}
                                                    step={1}
                                                    onValueChange={(val: any) => setYearRange(val)}
                                                />
                                            </div>

                                            {/* Mileage */}
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <Label>{t('catalog.mileage')}</Label>
                                                    <span className="text-sm text-muted-foreground">{mileageRange[0].toLocaleString()} - {mileageRange[1].toLocaleString()} km</span>
                                                </div>
                                                <Slider
                                                    value={mileageRange}
                                                    min={limits.minMileage}
                                                    max={limits.maxMileage}
                                                    step={1000}
                                                    onValueChange={(val: any) => setMileageRange(val)}
                                                />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    {/* Technical Specs */}
                                    <AccordionItem value="specs">
                                        <AccordionTrigger className="hover:no-underline">
                                            <div className="flex items-center gap-2">
                                                <Gauge className="w-4 h-4 text-primary" />
                                                <span>{t('catalog.tech_specs')}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-6 pt-4 px-1">
                                            {/* Horsepower */}
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <Label>{t('catalog.horsepower')}</Label>
                                                    <span className="text-sm text-muted-foreground">{horsepowerRange[0]} - {horsepowerRange[1]} hp</span>
                                                </div>
                                                <Slider
                                                    value={horsepowerRange}
                                                    min={limits.minHorsepower}
                                                    max={limits.maxHorsepower}
                                                    step={10}
                                                    onValueChange={(val: any) => setHorsepowerRange(val)}
                                                />
                                            </div>

                                            {/* Body Type */}
                                            <div className="space-y-3">
                                                <Label>{t('catalog.body_type')}</Label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {uniqueBodyTypes.map(type => (
                                                        <div key={type} className="flex items-center space-x-2">
                                                            <Checkbox 
                                                                id={`body-${type}`} 
                                                                checked={selectedBody.includes(type)}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) setSelectedBody([...selectedBody, type]);
                                                                    else setSelectedBody(selectedBody.filter(t => t !== type));
                                                                }}
                                                            />
                                                            <Label htmlFor={`body-${type}`} className="text-sm font-normal cursor-pointer">
                                                                {getLocalizedValue(t, i18n.language, undefined, undefined, type)}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Transmission */}
                                            <div className="space-y-3">
                                                <Label>{t('catalog.transmission')}</Label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {uniqueTransmissions.map(type => (
                                                        <div key={type} className="flex items-center space-x-2">
                                                            <Checkbox 
                                                                id={`trans-${type}`} 
                                                                checked={selectedTrans.includes(type)}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) setSelectedTrans([...selectedTrans, type]);
                                                                    else setSelectedTrans(selectedTrans.filter(t => t !== type));
                                                                }}
                                                            />
                                                            <Label htmlFor={`trans-${type}`} className="text-sm font-normal cursor-pointer">
                                                                {getLocalizedValue(t, i18n.language, undefined, undefined, type, 'filter_')}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Drive Type */}
                                            <div className="space-y-3">
                                                <Label>{t('catalog.drive_type')}</Label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {uniqueDriveTypes.map(type => (
                                                        <div key={type} className="flex items-center space-x-2">
                                                            <Checkbox 
                                                                id={`drive-${type}`} 
                                                                checked={selectedDrive.includes(type)}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) setSelectedDrive([...selectedDrive, type]);
                                                                    else setSelectedDrive(selectedDrive.filter(t => t !== type));
                                                                }}
                                                            />
                                                            <Label htmlFor={`drive-${type}`} className="text-sm font-normal cursor-pointer">
                                                                {getLocalizedValue(t, i18n.language, undefined, undefined, type)}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Fuel */}
                                            <div className="space-y-3">
                                                <Label>{t('catalog.fuel_type')}</Label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {uniqueFuelTypes.map(type => (
                                                        <div key={type} className="flex items-center space-x-2">
                                                            <Checkbox 
                                                                id={`fuel-${type}`} 
                                                                checked={selectedFuel.includes(type)}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) setSelectedFuel([...selectedFuel, type]);
                                                                    else setSelectedFuel(selectedFuel.filter(t => t !== type));
                                                                }}
                                                            />
                                                            <Label htmlFor={`fuel-${type}`} className="text-sm font-normal cursor-pointer">
                                                                {getLocalizedValue(t, i18n.language, undefined, undefined, type, 'filter_')}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    {/* Appearance & Condition */}
                                    <AccordionItem value="appearance">
                                        <AccordionTrigger className="hover:no-underline">
                                            <div className="flex items-center gap-2">
                                                <Paintbrush className="w-4 h-4 text-primary" />
                                                <span>{t('catalog.appearance')}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-6 pt-4 px-1">
                                            {/* Color */}
                                            <div className="space-y-3">
                                                <Label>{t('catalog.color')}</Label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {uniqueColors.map(type => (
                                                        <div key={type} className="flex items-center space-x-2">
                                                            <Checkbox 
                                                                id={`color-${type}`} 
                                                                checked={selectedColor.includes(type)}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) setSelectedColor([...selectedColor, type]);
                                                                    else setSelectedColor(selectedColor.filter(t => t !== type));
                                                                }}
                                                            />
                                                            <Label htmlFor={`color-${type}`} className="text-sm font-normal cursor-pointer">
                                                                {getLocalizedValue(t, i18n.language, undefined, undefined, type, 'color_')}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>

                            <SheetFooter className="pt-4 border-t">
                                <div className="flex w-full gap-2">
                                    <Button variant="outline" className="flex-1" onClick={clearAllFilters}>
                                        {t('catalog.clear_filters')}
                                    </Button>
                                    <SheetClose asChild>
                                        <Button className="flex-1">{t('catalog.apply')}</Button>
                                    </SheetClose>
                                </div>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>

                    {activeFilterCount > 0 && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={clearAllFilters}
                            className="text-muted-foreground hover:text-destructive"
                            title={t('catalog.clear_filters')}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    )}
                </div>
            </motion.div>
        )}
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
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                <Filter className="w-8 h-8" />
            </div>
            <div>
                <h3 className="text-lg font-medium">{t('catalog.no_results_title')}</h3>
                <p className="text-muted-foreground max-w-sm mt-1">{t('catalog.no_results_desc')}</p>
            </div>
            <Button variant="outline" onClick={clearAllFilters} className="mt-2">
                {t('catalog.clear_filters')}
            </Button>
          </div>
        ) : (
          displayCars.map((car, idx) => {
            const mainImage = car.images?.find((i) => i.isMain)?.pathOrUrl || car.images?.[0]?.pathOrUrl || imgBmwM5Competition;
            
            // Localization logic
            const currentLang = i18n.language;
            const title = currentLang === 'en' ? (car.title_en || car.title) : (car.title_ru || car.title);
            const fuelType = getLocalizedValue(t, currentLang, car.fuelType_ru, car.fuelType_en, car.fuelType, 'filter_');
            const transmission = getLocalizedValue(t, currentLang, car.transmission_ru, car.transmission_en, car.transmission, 'filter_');
            const driveType = getLocalizedValue(t, currentLang, car.driveType_ru, car.driveType_en, car.driveType || "");
            const meta = [fuelType, transmission].filter((v) => Boolean(v && v.trim()));
            
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
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <CarCard
                  id={car.id}
                  title={title}
                  price={`$${car.priceUsd.toLocaleString()}`}
                  image={mainImage}
                  year={car.year}
                  meta={meta}
                  tags={filteredTags.slice(0, 3)}
                  details={{
                    mileage: car.mileage ? `${car.mileage.toLocaleString()} km` : undefined,
                    engineCapacity: car.engineCapacity,
                    driveType: driveType
                  }}
                  specs={{
                    hp: car.horsepower ? `${car.horsepower} hp` : '',
                    zeroTo100: car.acceleration ? `${car.acceleration}s` : ''
                  }}
                />
              </motion.div>
            );
          })
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}
