
  import { createRoot } from "react-dom/client";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import App from "./App.tsx";
  import Home from "./pages/Home.tsx";
  import CatalogPage from "./pages/Catalog.tsx";
  import FeaturesPage from "./pages/Features.tsx";
  import BlogPage from "./pages/Blog.tsx";
  import CarPage from "./pages/Car.tsx";
  import "./index.css";
 
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:slug" element={<CarPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  
