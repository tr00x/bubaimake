import Header from "./components/Header";
import { Outlet, Link } from "react-router-dom";
import ScrollToAnchor from "./components/ScrollToAnchor";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <div className="bg-white min-h-screen font-sans text-[#141414] antialiased selection:bg-red-500 selection:text-white">
      <ScrollToAnchor />
      <Toaster />
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="bg-[#141414] text-white py-[60px] border-t border-neutral-800">
        <div className="max-w-[1400px] mx-auto px-4 md:px-[40px] flex flex-col gap-[40px]">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="flex flex-col gap-4 max-w-[300px]">
                   <span className="text-2xl font-bold">Mashyn Bazar</span>
                   <p className="text-neutral-400 text-sm leading-relaxed">
                       Ваш надежный партнер в мире автомобилей из ОАЭ. Продажа, подбор, логистика и сервис.
                   </p>
                </div>
                
                <div className="flex gap-12 flex-wrap">
                    <div className="flex flex-col gap-4">
                        <span className="font-semibold">Компания</span>
                        <Link to="/features" className="text-neutral-400 hover:text-white transition-colors text-sm">О нас</Link>
                        <Link to="/#contacts" className="text-neutral-400 hover:text-white transition-colors text-sm">Контакты</Link>
                        <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Вакансии</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="font-semibold">Услуги</span>
                        <Link to="/catalog" className="text-neutral-400 hover:text-white transition-colors text-sm">Каталог авто</Link>
                        <Link to="/#services" className="text-neutral-400 hover:text-white transition-colors text-sm">Логистика</Link>
                        <Link to="/#services" className="text-neutral-400 hover:text-white transition-colors text-sm">Таможня</Link>
                    </div>
                </div>
            </div>
            
            <div className="h-px bg-neutral-800 w-full" />
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
                <p>© 2026 Dubai Mashyn Bazar. All rights reserved.</p>
                
            </div>
        </div>
      </footer>
    </div>
  );
}
