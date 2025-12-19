import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import client from "../api/client";
import {
    Car,
    Settings,
    LogOut,
    User,
    Menu,
    X,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import "./admin.css";

export default function AdminLayout() {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
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

    if (loading) return <div className="h-screen flex items-center justify-center text-gray-500 font-sans">Loading...</div>;

    if (location.pathname === "/admin/login") {
        return <Outlet />;
    }

    if (!authorized) return null;

    const isActive = (path: string) => location.pathname.startsWith(path);

    const SidebarContent = () => (
        <>
            <div className="admin-sidebar-header">
                <span className={`admin-brand ${collapsed ? 'collapsed' : ''}`}>
                    {collapsed ? 'DC' : 'MashynBazar Admin'}
                </span>
                <button 
                    className="admin-mobile-toggle md:hidden" 
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <nav className="admin-nav">
                <Link
                    to="/admin/cars"
                    className={`admin-nav-item ${isActive('/admin/cars') ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                    title={collapsed ? "Inventory" : ""}
                >
                    <Car className="admin-nav-icon" />
                    <span className={collapsed ? 'hidden' : ''}>Inventory</span>
                </Link>
                <Link
                    to="/admin/settings"
                    className={`admin-nav-item ${isActive('/admin/settings') ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                    title={collapsed ? "Settings" : ""}
                >
                    <Settings className="admin-nav-icon" />
                    <span className={collapsed ? 'hidden' : ''}>Settings</span>
                </Link>
            </nav>

            <div className="admin-sidebar-footer desktop-only">
                <button 
                    className="admin-collapse-toggle"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
            </div>
        </>
    );

    return (
        <div className="admin-layout">
            <div 
                className={`admin-overlay ${mobileMenuOpen ? 'open' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
            />
            
            <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}>
                <SidebarContent />
            </aside>

            <div className={`admin-main ${collapsed ? 'collapsed' : ''}`}>
                <header className="admin-header">
                    <div className="admin-header-left">
                        <button 
                            className="admin-mobile-toggle"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <span className="admin-brand mobile-only">MashynBazar Admin</span>
                    </div>

                    <div className="admin-header-right">
                        <div className="admin-user-profile">
                            <div className="admin-user-avatar">
                                <User className="w-4 h-4" />
                            </div>
                            <div className="admin-user-info desktop-only">
                                <span className="admin-user-name">Admin User</span>
                                <span className="admin-user-role">Super Admin</span>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                client.post("/auth/logout").then(() => {
                                    setAuthorized(false);
                                    navigate("/admin/login");
                                });
                            }}
                            className="admin-logout-btn-icon"
                            title="Sign Out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
