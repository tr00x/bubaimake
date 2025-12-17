
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import client from "../api/client";
import {
    LayoutDashboard,
    Car,
    Settings,
    LogOut,
    User,
    PanelLeft
} from "lucide-react";
import { Button } from "../components/ui/button";

// Basic Sidebar implementation structure without full complex SidebarProvider logic if uncertain,
// but let's try to mimic a nice clean sidebar manually or use if simpler.
// Actually, let's stick to a reliable flex layout with fixed sidebar for now 
// to avoid complex Provider wiring debugging if not configured in App.tsx.
// It's safer and looks 99% the same.

export default function AdminLayout() {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        client.get("/auth/me")
            .then(() => setAuthorized(true))
            .catch(() => {
                setAuthorized(false);
                if (location.pathname !== "/admin/login") {
                    navigate("/admin/login");
                }
            })
            .finally(() => setLoading(false));
    }, [location.pathname, navigate]);

    if (loading) return <div className="h-screen flex items-center justify-center text-neutral-500">Loading admin environment...</div>;

    if (location.pathname === "/admin/login") {
        return <Outlet />;
    }

    if (!authorized) return null;

    const isActive = (path: string) => location.pathname.startsWith(path);

    return (
        <div className="min-h-screen bg-neutral-50 flex font-sans">
            {/* Sidebar - Desktop */}
            <aside className="w-[280px] bg-white border-r border-neutral-200 hidden md:flex flex-col sticky top-0 h-screen shadow-sm z-30">
                <div className="h-20 flex items-center px-8 border-b border-neutral-100">
                    <span className="text-xl font-bold tracking-tight text-[#141414]">DubaiCars<span className="text-neutral-400 font-normal"> Admin</span></span>
                </div>

                <nav className="flex-1 py-8 px-6 space-y-2">
                    <Link
                        to="/admin/cars"
                        className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive('/admin/cars')
                                ? "bg-[#141414] text-white shadow-md"
                                : "text-neutral-500 hover:text-[#141414] hover:bg-neutral-100"
                            }`}
                    >
                        <Car className={`w-5 h-5 ${isActive('/admin/cars') ? "text-white" : "text-neutral-400 group-hover:text-[#141414]"}`} />
                        Inventory
                    </Link>
                    <Link
                        to="/admin/settings"
                        className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive('/admin/settings')
                                ? "bg-[#141414] text-white shadow-md"
                                : "text-neutral-500 hover:text-[#141414] hover:bg-neutral-100"
                            }`}
                    >
                        <Settings className={`w-5 h-5 ${isActive('/admin/settings') ? "text-white" : "text-neutral-400 group-hover:text-[#141414]"}`} />
                        Settings
                    </Link>
                </nav>

                <div className="p-6 border-t border-neutral-100 bg-neutral-50/50">
                    <div className="flex items-center gap-3 px-2 py-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-sm">
                            <User className="w-5 h-5 text-neutral-600" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#141414]">Admin User</span>
                            <span className="text-xs text-neutral-500">Super Admin</span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                            client.post("/auth/logout").then(() => {
                                setAuthorized(false);
                                navigate("/admin/login");
                            });
                        }}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="h-16 bg-white border-b border-neutral-200 md:hidden flex items-center justify-between px-4 sticky top-0 z-20 shadow-sm">
                    <span className="text-lg font-bold text-[#141414]">Admin</span>
                    <Button variant="ghost" size="icon">
                        <PanelLeft className="w-6 h-6" />
                    </Button>
                </header>

                <main className="flex-1 p-6 md:p-12 overflow-y-auto w-full max-w-[1600px] mx-auto">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
