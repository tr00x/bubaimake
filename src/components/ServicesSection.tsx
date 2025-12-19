import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { 
  SalesIcon, 
  SearchIcon, 
  PartsIcon, 
  AccIcon, 
  RepairIcon, 
  TuningIcon, 
  RegIcon, 
  TransportIcon, 
  ContainerIcon 
} from "./ui/Icons";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  className?: string;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(({ icon, title, description, features, className = "" }, ref) => {
  const dark = className?.includes("text-white") || className?.includes("!text-white");
  return (
    <motion.div 
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`flex flex-col bg-card rounded-2xl border border-border hover:border-ring/50 transition-colors group h-full ${className}`}
    >
      <div className="p-6 md:p-8 flex flex-col gap-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${dark ? "border border-white/20 bg-white/10 text-white" : "border border-border bg-background text-foreground"}`}>
          {icon}
        </div>
        <h3 className={`text-xl md:text-2xl font-medium leading-tight ${dark ? "text-white" : "text-card-foreground"}`}>{title}</h3>
        <div className={`text-sm md:text-base leading-relaxed ${dark ? "text-white/80" : "text-muted-foreground"}`}>
          {description}
        </div>
        <div className="flex flex-col gap-2.5 mt-2">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${dark ? "bg-white" : "bg-primary"}`} />
              <span className={`text-sm md:text-[15px] leading-snug ${dark ? "text-white/80" : "text-muted-foreground"}`}>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});
ServiceCard.displayName = "ServiceCard";

const servicesData = [
  {
    icon: <SalesIcon/>,
    title: "Продажа автомобилей",
    description: "Новые и авто с пробегом, прозрачные условия. Огромный выбор в наличии и под заказ.",
    features: ["Широкий выбор марок", "Проверенная юридическая чистота", "Помощь в оформлении"]
  },
  {
    icon: <SearchIcon/>,
    title: "Подбор автомобилей",
    description: "Находим нужную комплектацию и идеальное состояние под ваш бюджет.",
    features: ["Глубокая аналитика рынка", "Техническая инспекция", "Ведение переговоров"]
  },
  {
    icon: <PartsIcon/>,
    title: "Подбор запчастей",
    description: "Оригинал и качественные аналоги с быстрой доставкой.",
    features: ["Подбор по VIN-коду", "Гарантия на детали", "Экспресс-доставка"]
  },
  {
    icon: <AccIcon/>,
    title: "Автоаксессуары",
    description: "Всё для комфорта и стайлинга вашего автомобиля.",
    features: ["Премиальные бренды", "Профессиональная установка", "Гарантийная поддержка"]
  },
  {
    icon: <RepairIcon/>,
    title: "Сервис и ремонт",
    description: "Диагностика, слесарные работы, электрика и кузовной ремонт любой сложности.",
    features: ["Оригинальные расходники", "Квалифицированные механики", "Гарантия на работы"]
  },
  {
    icon: <TuningIcon/>,
    title: "Тюнинг ателье",
    description: "Технические доработки и изменение внешнего вида под ваши задачи.",
    features: ["Чип-тюнинг (Stage 1-3)", "Аэродинамические обвесы", "Перешив салона"]
  },
  {
    icon: <RegIcon/>,
    title: "Регистрация в ОАЭ",
    description: "Постановка на учет, страхование и снятие с учета для экспорта.",
    features: ["Официальное оформление", "Ускоренная процедура", "Помощь с номерами"]
  },
  {
    icon: <TransportIcon/>,
    title: "Логистика и экспорт",
    description: "Доставка автомобилей в любую точку мира под ключ.",
    features: ["Авиа, море и автовозы", "Таможенное оформление", "Страхование груза"]
  },
  {
    icon: <ContainerIcon/>,
    title: "Контейнерная погрузка",
    description: "Профессиональная загрузка и крепление автомобилей для безопасной транспортировки.",
    features: ["Спецкрепления и обрешетка", "Фотоотчет погрузки", "Оптимизация пространства"]
  }
];

export default function ServicesSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleServices = isExpanded ? servicesData : servicesData.slice(0, 4);

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      // Scroll back to the start of the section
      const section = document.getElementById('services');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <section id="services" className="container mx-auto px-4 md:px-10 py-16 md:py-24 flex flex-col gap-10 md:gap-16">
      {/* Header */}
      <motion.div 
        className="flex flex-col gap-4 items-center text-center max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
         <span className="uppercase tracking-widest text-muted-foreground text-xs font-semibold">Направления</span>
         <h2 className="text-3xl md:text-4xl font-medium text-foreground leading-[1.1]">Услуги компании</h2>
         <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Полный комплекс услуг для автовладельцев: от подбора и покупки до доставки и сервисного обслуживания.
         </p>
      </motion.div>

      <div className="flex flex-col gap-8 items-center">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full"
        >
          <AnimatePresence mode="popLayout">
            {visibleServices.map((service, index) => (
               <ServiceCard 
                 key={service.title}
                 {...service}
                 className={isExpanded && index === servicesData.length - 1 ? "xl:col-span-4 lg:col-span-3 sm:col-span-2" : ""}
               />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div layout>
            <Button
                variant="outline"
                size="lg"
                onClick={handleToggle}
                className="gap-2 rounded-full px-8 h-12 text-base font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center"
            >
                <span className="relative flex items-center gap-2">
                    {isExpanded ? "Свернуть" : "Показать все услуги"}
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                </span>
            </Button>
        </motion.div>
      </div>
    </section>
  );
}
