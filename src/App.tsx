import Header from "./components/Header";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="bg-white min-h-screen font-sans text-[#141414] antialiased selection:bg-red-500 selection:text-white">
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
                        <a href="/features" className="text-neutral-400 hover:text-white transition-colors text-sm">О нас</a>
                        <a href="/contacts" className="text-neutral-400 hover:text-white transition-colors text-sm">Контакты</a>
                        <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Вакансии</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="font-semibold">Услуги</span>
                        <a href="/catalog" className="text-neutral-400 hover:text-white transition-colors text-sm">Каталог авто</a>
                        <a href="/services" className="text-neutral-400 hover:text-white transition-colors text-sm">Логистика</a>
                        <a href="/services" className="text-neutral-400 hover:text-white transition-colors text-sm">Таможня</a>
                    </div>
                </div>
            </div>
            
            <div className="h-px bg-neutral-800 w-full" />
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
                <p>© 2024 Mashyn Bazar. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
