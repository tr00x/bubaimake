import React from "react";
import svgPaths from "../imports/svg-5qr6y18hqk";

function ServiceCard({ icon, title, description, features, className = "" }) {
  const dark = className?.includes("text-white") || className?.includes("!text-white");
  return (
    <div className={`flex flex-col bg-neutral-50 rounded-[16px] border border-[#e6e6e6] hover:border-neutral-300 transition-colors group h-full ${className}`}>
      <div className="p-[24px] md:p-[32px] flex flex-col gap-[16px]">
        <div className={`w-[56px] h-[56px] rounded-[12px] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300 ${dark ? "border border-white/20 bg-white/10 text-white" : "border border-[#e6e6e6] bg-white text-[#141414]"}`}>
          {icon}
        </div>
        <h3 className={`text-[20px] md:text-[22px] font-medium leading-[1.3] ${dark ? "text-white" : "text-[#141414]"}`}>{title}</h3>
        <div className={`text-[14px] md:text-[15px] leading-[1.5] ${dark ? "text-white/80" : "text-neutral-500"}`}>
          {description}
        </div>
        <div className="flex flex-col gap-[10px] mt-[8px]">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-[10px]">
              <div className={`w-[6px] h-[6px] rounded-full mt-[8px] shrink-0 ${dark ? "bg-white" : "bg-[#141414]"}`} />
              <span className={`text-[13px] md:text-[14px] leading-[1.4] ${dark ? "text-white/80" : "text-neutral-600"}`}>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Icons (Kept same as before but ensured correct sizing)
const SalesIcon = () => (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
        <path d={svgPaths.p382997c0} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={svgPaths.p2ad65a80} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.5 14.1667H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={svgPaths.p3849af00} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
        <path d={svgPaths.pcddfd00} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5 17.5L13.9167 13.9167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PartsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
        <path d={svgPaths.p20f4ecf0} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 18.3333V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={svgPaths.p1077a480} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.25 3.55833L13.75 7.85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AccIcon = () => (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
        <path d={svgPaths.p39961300} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={svgPaths.p2f53ac80} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const RepairIcon = () => (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
        <path d={svgPaths.p794da00} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TuningIcon = () => (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
        <path d={svgPaths.p24941500} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.6667 2.5V5.83333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.3333 4.16667H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.33333 14.1667V15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.16667 15H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const RegIcon = () => (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
        <path d={svgPaths.p3713e00} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={svgPaths.pd2076c0} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={svgPaths.p12751280} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TransportIcon = () => (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
        <path d={svgPaths.pdab9800} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ContainerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
        <path d="M2.5 18.3333H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 15V9.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.33333 15V9.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.6667 15V9.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 15V9.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={svgPaths.p2524ba40} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function ServicesSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-[40px] py-[60px] md:py-[100px] flex flex-col gap-[40px] md:gap-[60px]">
      {/* Header */}
      <div className="flex flex-col gap-[16px] items-center text-center max-w-[600px] mx-auto">
         <span className="uppercase tracking-widest text-neutral-400 text-[12px] font-semibold">Направления</span>
         <h2 className="text-[32px] md:text-[40px] font-medium text-[#141414] leading-[1.1]">Услуги компании</h2>
         <p className="text-[16px] md:text-[18px] text-neutral-500 leading-relaxed">
            Полный комплекс услуг для автовладельцев: от подбора и покупки до доставки и сервисного обслуживания.
         </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]">
         
         <ServiceCard 
           icon={<SalesIcon/>}
           title="Продажа автомобилей"
           description="Новые и авто с пробегом, прозрачные условия. Огромный выбор в наличии и под заказ."
           features={["Широкий выбор марок", "Проверенная юридическая чистота", "Помощь в оформлении"]}
         />
         <ServiceCard 
           icon={<SearchIcon/>}
           title="Подбор автомобилей"
           description="Находим нужную комплектацию и идеальное состояние под ваш бюджет."
           features={["Глубокая аналитика рынка", "Техническая инспекция", "Ведение переговоров"]}
         />
         <ServiceCard 
           icon={<PartsIcon/>}
           title="Подбор запчастей"
           description="Оригинал и качественные аналоги с быстрой доставкой."
           features={["Подбор по VIN-коду", "Гарантия на детали", "Экспресс-доставка"]}
         />
         <ServiceCard 
           icon={<AccIcon/>}
           title="Автоаксессуары"
           description="Всё для комфорта и стайлинга вашего автомобиля."
           features={["Премиальные бренды", "Профессиональная установка", "Гарантийная поддержка"]}
         />

         <ServiceCard 
           icon={<RepairIcon/>}
           title="Сервис и ремонт"
           description="Диагностика, слесарные работы, электрика и кузовной ремонт любой сложности."
           features={["Оригинальные расходники", "Квалифицированные механики", "Гарантия на работы"]}
         />
         <ServiceCard 
           icon={<TuningIcon/>}
           title="Тюнинг ателье"
           description="Технические доработки и изменение внешнего вида под ваши задачи."
           features={["Чип-тюнинг (Stage 1-3)", "Аэродинамические обвесы", "Перешив салона"]}
         />
         <ServiceCard 
           icon={<RegIcon/>}
           title="Регистрация в ОАЭ"
           description="Полное сопровождение процедур постановки и снятия с учета."
           features={["Сбор документов", "Минимальные сроки", "Официальное оформление"]}
         />
         <ServiceCard 
           icon={<TransportIcon/>}
           title="Международная логистика"
           description="Безопасная доставка автомобилей в любую точку мира."
           features={["Страхование на всю стоимость", "GPS-отслеживание", "Таможенная очистка"]}
         />
         
        <ServiceCard 
          icon={<ContainerIcon/>}
          title="Контейнерные перевозки и таможня"
          description="Комплексное решение для оптовых клиентов и перегонщиков. Встречаем груз, проводим таможенную очистку, доставляем в страны СНГ."
          features={["Работа во всех портах ОАЭ", "Полное таможенное сопровождение", "Логистика «до двери»"]}
        />
      </div>
    </section>
  );
}
