import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import CatalogPage from "./pages/Catalog.tsx";
import FeaturesPage from "./pages/Features.tsx";
import BlogPage from "./pages/Blog.tsx";
import CarPage from "./pages/Car.tsx";
import AdminLayout from "./admin/AdminLayout.tsx";
import AdminLogin from "./admin/AdminLogin.tsx";
import AdminCarList from "./admin/AdminCarList.tsx";
import CarEditor from "./admin/CarEditor.tsx";
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

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/cars" replace />} />
        <Route path="cars" element={<AdminCarList />} />
        <Route path="cars/new" element={<CarEditor />} />
        <Route path="cars/:id" element={<CarEditor />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

