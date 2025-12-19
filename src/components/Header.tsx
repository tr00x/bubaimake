import React, { useEffect, useState } from "react";
import { Search, Menu, Phone, Car, FileText, Youtube, MapPin, Clock, Mail } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "./ui/sheet";
import { LogoIcon } from "./ui/Icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/catalog?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks = [
    { name: "YouTube", href: "/#youtube", icon: Youtube },
    { name: "Каталог", href: "/#catalog", icon: Car },
    { name: "Услуги", href: "/#services", icon: FileText },
    { name: "Контакты", href: "/#contacts", icon: Phone },
  ];

  const isHome = location.pathname === "/";

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHome 
          ? (scrolled 
              ? "translate-y-0 bg-background/90 backdrop-blur-md border-b border-border" 
              : "-translate-y-full bg-transparent border-transparent")
          : "translate-y-0 bg-background/90 backdrop-blur-md border-b border-border"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link to="/" className="shrink-0 hover:opacity-80 transition-opacity">
          <div className="h-[32px] md:h-[40px] relative shrink-0 w-auto aspect-[96/40]">
            <LogoIcon className="block size-full" />
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="flex max-md:hidden items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.href} 
              className="flex items-center gap-2 text-sm lg:text-base font-medium text-foreground hover:text-destructive transition-colors"
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 md:gap-4 flex-1 md:flex-none justify-end">
          {/* Search */}
          <div className="flex gap-2 h-10 md:h-11 items-center px-3 md:px-4 bg-secondary/50 rounded-xl border border-transparent hover:border-border hover:bg-background transition-all flex-1 md:flex-none md:w-48 lg:w-60 group cursor-text focus-within:border-ring focus-within:bg-background">
            <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0" />
            <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Поиск..." 
                className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full min-w-[50px]"
            />
          </div>

          {/* Desktop/Mobile CTA */}
          <Link 
            to="/catalog" 
            className="flex bg-primary text-primary-foreground h-10 md:h-11 px-3 md:px-5 rounded-xl items-center gap-2 hover:bg-red-600 active:scale-95 transition-all shrink-0"
          >
             <Car className="w-4 h-4" />
             <span className="hidden md:inline text-sm font-medium">Каталог</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-secondary">
                  <Menu className="h-6 w-6 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 overflow-y-auto">
                <SheetHeader className="p-6 border-b text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <span className="font-bold text-xl">Меню</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col py-6">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <Link
                        to={link.href}
                        className="flex items-center gap-4 px-6 py-4 text-base font-medium hover:bg-secondary transition-colors text-foreground"
                      >
                        <link.icon className="w-5 h-5 text-muted-foreground" />
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                  
                  {/* Contact Info Block */}
                  <div className="px-6 mt-6 pt-6 border-t border-border flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                       <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Контакты</h3>
                       
                       <div className="flex gap-3 items-start">
                          <Phone className="w-4 h-4 text-primary mt-1" />
                          <div className="flex flex-col gap-1 text-sm">
                              <a href="tel:+971544050707" className="hover:text-primary transition-colors font-medium">+971 54 405 0707</a>
                              <a href="tel:+971544050303" className="hover:text-primary transition-colors font-medium">+971 54 405 0303</a>
                          </div>
                       </div>

                       <div className="flex gap-3 items-start">
                          <Mail className="w-4 h-4 text-primary mt-1" />
                          <div className="flex flex-col gap-1 text-sm">
                              <a href="mailto:info@mashynbazar.com" className="hover:text-primary transition-colors font-medium">info@mashynbazar.com</a>
                          </div>
                       </div>

                       <div className="flex gap-3 items-start">
                          <MapPin className="w-4 h-4 text-primary mt-1" />
                          <div className="flex flex-col gap-1 text-sm">
                              <span className="font-medium">Dubai, UAE</span>
                              <span className="text-muted-foreground">Al Quoz Industrial Area 3</span>
                          </div>
                       </div>

                       <div className="flex gap-3 items-start">
                          <Clock className="w-4 h-4 text-primary mt-1" />
                          <div className="flex flex-col gap-1 text-sm">
                              <span className="font-medium">Пн-Сб: 9:00 - 19:00</span>
                              <span className="text-muted-foreground">Вс: Выходной</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
