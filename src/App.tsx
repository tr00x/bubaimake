import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToAnchor from "./components/ScrollToAnchor";
import { Toaster } from "./components/ui/sonner";
import Preloader from "./components/Preloader";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Only show preloader if it hasn't been shown in this session
    return !sessionStorage.getItem('hasSeenPreloader');
  });
  const location = useLocation();

  useEffect(() => {
    if (isLoading) {
      const minTimePromise = new Promise(resolve => setTimeout(resolve, 2000)); // Minimum 2s display
      
      const loadPromise = new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve(true);
        } else {
          window.addEventListener('load', () => resolve(true));
        }
      });

      // Wait for both minimum time and window load
      Promise.all([minTimePromise, loadPromise]).then(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasSeenPreloader', 'true');
      });
    }
  }, [isLoading]);

  return (
    <div className="bg-background min-h-screen font-sans text-foreground antialiased selection:bg-destructive selection:text-white flex flex-col">
      <Preloader isLoading={isLoading} />
      <ScrollToAnchor />
      <Toaster />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
