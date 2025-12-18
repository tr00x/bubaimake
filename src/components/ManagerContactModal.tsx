import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { MessageCircle, Send, Car, User, MessageSquare } from "lucide-react";
import { Phone } from "lucide-react";

interface ManagerContactModalProps {
  carTitle?: string;
  carId?: string;
  children: React.ReactNode;
}

export default function ManagerContactModal({
  carTitle,
  carId,
  children,
}: ManagerContactModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    try {
      // In a real app, this would be an API call
      console.log("Form submitted:", {
        ...formData,
        carTitle,
        carId,
        source: window.location.href,
      });

      // Construct message for manager
      const fullMessage = `
Новая заявка с сайта!
Автомобиль: ${carTitle || "Не указан"}
ID: ${carId || "Не указан"}
Ссылка: ${window.location.href}

Имя: ${formData.name}
Контакты: ${formData.contact}
Сообщение: ${formData.message}
      `.trim();
      
      console.log("Message to manager:", fullMessage);

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Сообщение отправлено! Менеджер свяжется с вами в ближайшее время.");
      setOpen(false);
      setFormData({ name: "", contact: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при отправке сообщения. Пожалуйста, попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const defaultMessage = carTitle 
    ? `Здравствуйте! Меня интересует автомобиль ${carTitle}. Расскажите подробнее о доставке и условиях.`
    : "Здравствуйте! Меня интересует консультация по подбору автомобиля.";

  // Pre-fill message if empty when opening
  React.useEffect(() => {
    // Only set default message if user hasn't typed anything yet
    if (open && !formData.message) {
      // Leave empty as requested by user
      // setFormData(prev => ({ ...prev, message: "" })); 
    }
  }, [open, carTitle]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-2xl font-bold">Связаться с менеджером</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Выберите удобный способ связи
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              className="group flex w-full items-center justify-center gap-2 h-16 bg-gray-100/50 hover:!bg-[#cc0000] rounded-xl transition-all duration-300 border border-transparent hover:border-[#cc0000] outline-none"
              onClick={() => window.open('https://wa.me/1234567890', '_blank')}
            >
              <svg 
                className="w-6 h-6 transition-colors duration-300 group-hover:!fill-white" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ fill: '#25D366' }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span 
                className="font-bold text-base transition-colors duration-300 group-hover:!text-white"
                style={{ color: '#25D366' }}
              >
                WhatsApp
              </span>
            </button>
            <button 
              type="button"
              className="group flex w-full items-center justify-center gap-2 h-16 bg-gray-100/50 hover:!bg-[#cc0000] rounded-xl transition-all duration-300 border border-transparent hover:border-[#cc0000] outline-none"
              onClick={() => window.open('https://t.me/tr00x', '_blank')}
            >
              <svg 
                className="w-6 h-6 transition-colors duration-300 group-hover:!fill-white" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ fill: '#229ED9' }}
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span 
                className="font-bold text-base transition-colors duration-300 group-hover:!text-white"
                style={{ color: '#229ED9' }}
              >
                Telegram
              </span>
            </button>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg text-center">
             <p className="text-sm font-medium text-foreground/80">
               Не стесняйтесь, пишите в менеджер — так быстрее!
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
              <span className="bg-white px-4 text-muted-foreground">
                Или заполните форму
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          {carTitle && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/60 rounded-xl p-4 flex items-center gap-6 shadow-sm relative overflow-hidden group">
              <div 
                className="absolute right-0 top-0 pointer-events-none"
                style={{ 
                  transform: 'translate(25%, -25%)',
                  width: '150px',
                  height: '150px'
                }}
              >
                 <Car 
                   style={{ 
                     width: '100%', 
                     height: '100%', 
                     color: '#e7000b',
                     opacity: 0.1
                   }} 
                 />
              </div>
              <div className="z-10 ml-8">
                <Car className="w-8 h-6 text-[#cc0000]" />
              </div>
              <div className="flex flex-col z-10">
                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Интересует автомобиль</span>
                <span className="text-lg font-bold text-foreground leading-tight">{carTitle}</span>
              </div>
            </div>
          )}
          <div className="grid gap-2 group">
            <div className="flex items-center gap-2 pl-1">
              <User className="w-4 h-4 text-muted-foreground/70 transition-colors duration-300 group-focus-within:text-[#cc0000]" />
              <Label htmlFor="name" className="text-sm font-medium text-foreground/80 transition-colors duration-300 group-focus-within:text-foreground">Ваше имя</Label>
            </div>
            <input
              id="name"
              placeholder="Как к вам обращаться?"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full bg-muted/30 border border-muted-foreground/20 focus:bg-white focus:border-[#cc0000] outline-none transition-all h-12 rounded-xl px-4 text-base shadow-sm placeholder:text-muted-foreground/50 text-foreground"
            />
          </div>
          <div className="grid gap-2 group">
            <div className="flex items-center gap-2 pl-1">
              <Phone className="w-4 h-4 text-muted-foreground/70 transition-colors duration-300 group-focus-within:text-[#cc0000]" />
              <Label htmlFor="contact" className="text-sm font-medium text-foreground/80 transition-colors duration-300 group-focus-within:text-foreground">Телефон или Telegram</Label>
            </div>
            <input
              id="contact"
              placeholder="Ваш номер телефона или @username"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
              className="w-full bg-muted/30 border border-muted-foreground/20 focus:bg-white focus:border-[#cc0000] outline-none transition-all h-12 rounded-xl px-4 text-base shadow-sm placeholder:text-muted-foreground/50 text-foreground"
            />
          </div>
          <div className="grid gap-2 group">
            <div className="flex items-center gap-2 pl-1">
              <MessageSquare className="w-4 h-4 text-muted-foreground/70 transition-colors duration-300 group-focus-within:text-[#cc0000]" />
              <Label htmlFor="message" className="text-sm font-medium text-foreground/80 transition-colors duration-300 group-focus-within:text-foreground">Сообщение</Label>
            </div>
            <textarea
              id="message"
              placeholder="Какой автомобиль вас интересует?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-muted/30 border border-muted-foreground/20 focus:bg-white focus:border-[#cc0000] outline-none transition-all resize-y rounded-xl px-4 py-3 text-base shadow-sm placeholder:text-muted-foreground/50 text-foreground min-h-[120px]"
              required
            />
          </div>
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full flex items-center justify-center bg-[#141414] text-white hover:bg-[#cc0000] h-[40px] text-base font-medium rounded-xl"
              style={{ height: '40px' }}
            >
              {loading ? "Отправка..." : "Отправить"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
