import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import logo from "../assets/58ef5ee199d9ca1c60c8ac56288fb7dd033bd242.png";
import "./admin.css"; // Import custom CSS

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await client.post("/auth/login", { username, password });
            toast.success("Вход выполнен успешно");
            navigate("/admin/cars");
        } catch (err) {
            toast.error("Неверные учетные данные");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <Toaster />
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <div className="admin-login-logo-container">
                        <img src={logo} alt="Logo" className="admin-login-logo" />
                    </div>
                    <h1 className="admin-login-title">Панель администратора</h1>
                    <p className="admin-login-subtitle">Войдите для управления контентом</p>
                </div>

                <form onSubmit={handleLogin} className="admin-login-form">
                    <div className="admin-input-group">
                        <label className="admin-label">Имя пользователя</label>
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                            placeholder="admin"
                            className="admin-input"
                        />
                    </div>
                    <div className="admin-input-group">
                        <label className="admin-label">Пароль</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            placeholder="••••••••"
                            className="admin-input"
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="admin-button"
                    >
                        {isLoading ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div className="spinner" />
                                <span>Вход...</span>
                            </div>
                        ) : "Войти"}
                    </button>
                </form>
            </div>
        </div>
    );
}
