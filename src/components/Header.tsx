import React, { useEffect, useState } from "react";
import svgPaths from "../imports/svg-5qr6y18hqk";
import { Search } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function LogoSvg() {
  return (
    <div className="h-[32px] md:h-[40px] relative shrink-0 w-auto aspect-[96/40]">
      <svg className="block size-full" fill="none" viewBox="0 0 97 40">
        <g clipPath="url(#clip0_1_138)">
          <path d={svgPaths.p1c32aa00} fill="#56A873" />
          <path d={svgPaths.p3cb77080} fill="#C53631" />
          <path d={svgPaths.pbb92680} fill="#1A1819" />
        </g>
        <defs>
          <clipPath id="clip0_1_138">
            <rect fill="white" height="40" width="96.0731" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/catalog?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-200" : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="shrink-0 hover:opacity-80 transition-opacity">
          <LogoSvg />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
            <Link to="/#catalog" className="text-[15px] font-medium text-[#141414] hover:text-red-600 transition-colors">
                Каталог
            </Link>
            <Link 
                to="/#youtube" 
                className="text-[15px] font-medium text-[#141414] hover:text-red-600 transition-colors"
            >
                YouTube
            </Link>
            <Link 
                to="/#services" 
                className="text-[15px] font-medium text-[#141414] hover:text-red-600 transition-colors"
            >
                Услуги
            </Link>
            <Link 
                to="/#contacts" 
                className="text-[15px] font-medium text-[#141414] hover:text-red-600 transition-colors"
            >
                Контакты
            </Link>
        </nav>

        {/* Actions */}
        <div className="flex gap-[12px] items-center">
          {/* Search */}
          <div className="flex gap-[8px] h-[40px] md:h-[44px] items-center px-[14px] md:px-[16px] bg-neutral-50 rounded-[12px] border border-transparent hover:border-neutral-200 hover:bg-white transition-all w-[160px] md:w-[240px] group cursor-text focus-within:border-neutral-300 focus-within:bg-white">
            <Search className="w-4 h-4 text-neutral-400 group-hover:text-[#141414]" />
            <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Поиск авто..." 
                className="bg-transparent border-none outline-none text-[14px] text-[#141414] placeholder:text-neutral-400 w-full"
            />
          </div>

          {/* CTA */}
          <Link to="/catalog" className="hidden md:flex bg-[#141414] text-white h-[44px] px-[20px] rounded-[12px] items-center gap-[8px] hover:bg-neutral-800 active:scale-95 transition-all shadow-lg shadow-black/5">
             <span className="text-[14px] font-medium">Каталог</span>
          </Link>
        </div>
      </div>

    </header>
  );
}
