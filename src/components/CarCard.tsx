import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HorsePowerIcon, SpeedIcon } from "./ui/Icons";
import { useTranslation } from "react-i18next";

export type CarCardProps = {
  title: string;
  image: string;
  tags?: string[];
  meta?: string[];
  specs: { hp: string; zeroTo100: string };
  price: string;
  id: string;
  year?: number;
};

export function CarCard({ title, image, tags = [], meta = [], specs, price, id, year }: CarCardProps) {
  const { t } = useTranslation();

  return (
    <Link to={`/catalog/${id}`} className="bg-background rounded-2xl border border-border overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[4/3] w-full bg-secondary overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {year && (
            <div className="bg-background/90 px-2.5 py-1 rounded-md border border-border backdrop-blur-sm flex items-center justify-center">
              <span className="text-[11px] font-semibold text-foreground uppercase tracking-wider">{year}</span>
            </div>
          )}
          {tags.map((tag, idx) => (
            <div key={`${tag}-${idx}`} className={`bg-background/90 px-2.5 py-1 rounded-md border backdrop-blur-sm flex items-center justify-center ${tag === "Горячее" ? "border-red-500" : "border-border"}`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${tag === "Горячее" ? "text-red-600" : "text-foreground"}`}>{tag}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <h3 className="text-foreground text-xl font-semibold tracking-tight">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {meta.map((text, idx) => (
              <span key={`${text}-${idx}`} className="text-[13px] text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                {text}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-dashed border-border">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1 text-muted-foreground">
              <HorsePowerIcon />
              <span className="text-xs">{t('car_card.power')}</span>
            </div>
            <span className="text-sm font-medium text-foreground">{specs.hp}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1 text-muted-foreground">
              <SpeedIcon />
              <span className="text-xs">{t('car_card.acceleration')}</span>
            </div>
            <span className="text-sm font-medium text-foreground">{specs.zeroTo100}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-foreground text-xl font-bold tracking-tight">{price}</span>
          <span className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center text-background group-hover:bg-red-600 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
