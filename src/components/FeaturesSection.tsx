import React from "react";
import { CheckCircle2, FileText, Clock, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div 
      className="bg-card rounded-2xl p-6 md:p-7 flex flex-col gap-4 border border-border hover:border-ring/50 transition-colors flex-1 min-w-[280px] group"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
    >
       <div className="w-14 h-14 rounded-xl bg-background flex items-center justify-center border border-border text-foreground">
          {icon}
       </div>
       <h3 className="text-lg md:text-xl font-medium text-card-foreground leading-tight">{title}</h3>
       <div className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {description}
       </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="bg-secondary/20 border-y border-border">
        <div className="container mx-auto px-4 md:px-10 py-20 flex flex-col gap-12 items-center">
          <motion.div 
            className="flex flex-col gap-4 items-center text-center max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
             <span className="uppercase tracking-widest text-muted-foreground text-xs font-semibold">Почему мы</span>
             <h2 className="text-3xl font-medium text-foreground">Преимущества работы с нами</h2>
          </motion.div>
          
          <motion.div 
            className="flex flex-col md:flex-row flex-wrap gap-6 w-full justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
             <FeatureCard 
               icon={<CheckCircle2 className="w-10 h-10 text-primary" />}
               title="Сопровождение 24/7"
               description="Личный менеджер на связи на каждом этапе сделки"
             />
             <FeatureCard 
               icon={<FileText className="w-10 h-10 text-primary" />}
               title="Полный пакет документов"
               description="Оформление инвойсов, таможенных деклараций и сертификатов"
             />
             <FeatureCard 
               icon={<Clock className="w-10 h-10 text-primary" />}
               title="Соблюдение сроков"
               description="Четкие SLA и план работ, зафиксированные в договоре"
             />
             <FeatureCard 
               icon={<Globe className="w-10 h-10 text-primary" />}
               title="Глобальная логистика"
               description="Отлаженные маршруты доставки авто, авиа и морским транспортом"
             />
          </motion.div>
        </div>
    </section>
  );
}
