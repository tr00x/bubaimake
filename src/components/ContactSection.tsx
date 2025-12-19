import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import client from "../api/client";
import { toast } from "sonner";

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function ContactItem({ icon, label, children }: ContactItemProps) {
  return (
    <div className="flex gap-4 items-start w-full group">
       <div className="w-10 h-10 rounded-xl bg-muted/50 text-foreground flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
           {icon}
       </div>
       <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
          <div className="text-base text-foreground font-medium leading-relaxed">
             {children}
          </div>
       </div>
    </div>
  );
}

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const contactInfo = `Phone: ${formData.phone}${formData.email ? `, Email: ${formData.email}` : ""}`;
      
      await client.post('/contact', {
        name: formData.name,
        contact: contactInfo,
        message: formData.message,
        link: window.location.href,
        source: 'Контактная форма',
      });

      toast.success("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при отправке сообщения. Пожалуйста, попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacts" className="container mx-auto px-4 md:px-10 py-16 md:py-24 flex flex-col lg:flex-row gap-10 lg:gap-20 items-start overflow-hidden">
      {/* Contact Info */}
      <motion.div 
        className="flex flex-col gap-10 w-full lg:w-[450px] shrink-0"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
          <div className="flex flex-col gap-3">
              <span className="uppercase tracking-widest text-muted-foreground text-xs font-semibold">Связь</span>
              <h2 className="text-3xl md:text-4xl font-medium text-foreground leading-tight">Наши контакты</h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                  Мы всегда на связи и готовы ответить на любые ваши вопросы. Выберите удобный способ связи.
              </p>
          </div>
          
          <div className="flex flex-col gap-8">
             <ContactItem icon={<Phone className="w-5 h-5" />} label="Телефоны">
                 <div className="flex flex-col gap-1">
                    <a href="tel:+971544050707" className="hover:text-primary transition-colors">+971 54 405 0707</a>
                    <a href="tel:+971544050303" className="hover:text-primary transition-colors">+971 54 405 0303</a>
                    <span className="text-muted-foreground">Офис: +971 4 331 8397</span>
                 </div>
             </ContactItem>

             <ContactItem icon={<Mail className="w-5 h-5" />} label="Email">
                 <a href="mailto:info@mashynbazar.com" className="hover:text-primary transition-colors">info@mashynbazar.com</a>
                 <div className="text-muted-foreground text-sm">По вопросам сотрудничества</div>
             </ContactItem>

             <ContactItem icon={<MapPin className="w-5 h-5" />} label="Офис">
                 <p>Dubai, UAE</p>
                 <p className="text-muted-foreground text-sm">Al Quoz Industrial Area 3</p>
             </ContactItem>

             <ContactItem icon={<Clock className="w-5 h-5" />} label="Режим работы">
                 <p>Пн-Сб: 9:00 - 19:00</p>
                 <p className="text-muted-foreground text-sm">Вс: Выходной</p>
             </ContactItem>
          </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div 
        className="w-full bg-card rounded-3xl p-6 md:p-10 border border-border"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
               <h3 className="text-2xl font-medium text-foreground">Оставить заявку</h3>
               <p className="text-muted-foreground">Заполните форму, и наш менеджер свяжется с вами в течение 15 минут.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Ваше имя</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="h-12 px-4 rounded-xl bg-background border border-border focus:border-ring focus:ring-1 focus:ring-ring outline-none transition-all"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
               </div>
               <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">Номер телефона</label>
                  <input 
                    type="tel" 
                    id="phone"
                    required
                    className="h-12 px-4 rounded-xl bg-background border border-border focus:border-ring focus:ring-1 focus:ring-ring outline-none transition-all"
                    placeholder="+7 (999) 000-00-00"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <label htmlFor="email" className="text-sm font-medium text-foreground">Email (необязательно)</label>
               <input 
                 type="email" 
                 id="email"
                 className="h-12 px-4 rounded-xl bg-background border border-border focus:border-ring focus:ring-1 focus:ring-ring outline-none transition-all"
                 placeholder="example@mail.com"
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
               />
            </div>

            <div className="flex flex-col gap-2">
               <label htmlFor="message" className="text-sm font-medium text-foreground">Сообщение</label>
               <textarea 
                 id="message"
                 rows={4}
                 className="p-4 rounded-xl bg-background border border-border focus:border-ring focus:ring-1 focus:ring-ring outline-none transition-all resize-none"
                 placeholder="Интересует покупка BMW X5..."
                 value={formData.message}
                 onChange={(e) => setFormData({...formData, message: e.target.value})}
               />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 h-12 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Отправка..." : "Отправить заявку"}
            </button>
            
            <p className="text-xs text-muted-foreground text-center mt-2">
              Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
            </p>
        </form>
      </motion.div>
    </section>
  );
}
