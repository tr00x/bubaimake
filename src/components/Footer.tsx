import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 border-t border-primary-foreground/10">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-4 max-w-[300px]">
            <span className="text-2xl font-bold">Mashyn Bazar</span>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Ваш надежный партнер в мире автомобилей из ОАЭ. Продажа, подбор, логистика и сервис.
            </p>
          </div>
          
          <div className="flex gap-12 flex-wrap">
            <div className="flex flex-col gap-4">
              <span className="font-semibold">Компания</span>
              <Link to="/features" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">О нас</Link>
              <Link to="/#contacts" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Контакты</Link>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Вакансии</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold">Услуги</span>
              <Link to="/catalog" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Каталог авто</Link>
              <Link to="/#services" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Логистика</Link>
              <Link to="/#services" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Таможня</Link>
            </div>
          </div>
        </div>
        
        <div className="h-px bg-primary-foreground/10 w-full" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© 2026 Dubai Mashyn Bazar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
