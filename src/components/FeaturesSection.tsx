import React from "react";
import svgPaths from "../imports/svg-5qr6y18hqk";
import { CheckCircle2, FileText, Clock, Globe } from "lucide-react";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-neutral-50 rounded-[16px] p-[24px] md:p-[28px] flex flex-col gap-[16px] border border-[#e6e6e6] hover:border-neutral-300 transition-colors flex-1 min-w-[280px] group">
       <div className="w-[56px] h-[56px] rounded-[12px] bg-white flex items-center justify-center border border-[#e6e6e6] shadow-sm text-[#141414]">
          {icon}
       </div>
       <h3 className="text-[18px] md:text-[20px] font-medium text-[#141414] leading-[1.3]">{title}</h3>
       <div className="text-[14px] md:text-[15px] text-neutral-500 leading-[1.5]">
          {description}
       </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-[40px] py-[80px] flex flex-col gap-[50px] items-center">
          <div className="flex flex-col gap-[16px] items-center text-center max-w-[600px]">
             <span className="uppercase tracking-widest text-neutral-400 text-[12px] font-semibold">Почему мы</span>
             <h2 className="text-[32px] font-medium text-[#141414]">Преимущества работы с нами</h2>
          </div>
          
          <div className="flex flex-col md:flex-row flex-wrap gap-[24px] w-full justify-center">
             <FeatureCard 
               icon={<CheckCircle2 className="w-10 h-10 text-[#141414]" />}
               title="Сопровождение 24/7"
               description="Личный менеджер на связи на каждом этапе сделки"
             />
             <FeatureCard 
               icon={<FileText className="w-10 h-10 text-[#141414]" />}
               title="Полный пакет документов"
               description="Оформление инвойсов, таможенных деклараций и сертификатов"
             />
             <FeatureCard 
               icon={<Clock className="w-10 h-10 text-[#141414]" />}
               title="Соблюдение сроков"
               description="Четкие SLA и план работ, зафиксированные в договоре"
             />
             <FeatureCard 
               icon={<Globe className="w-10 h-10 text-[#141414]" />}
               title="Глобальная логистика"
               description="Отлаженные маршруты доставки авто, авиа и морским транспортом"
             />
          </div>
        </div>
    </section>
  );
}
