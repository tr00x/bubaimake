import React from "react";
import svgPaths from "../imports/svg-5qr6y18hqk";
import { User, Phone, Mail, MessageSquare, Send, MapPin, Clock } from "lucide-react";

function ContactItem({ icon, label, children }) {
  return (
    <div className="flex gap-[16px] items-start w-full group">
       <div className="w-[40px] h-[40px] rounded-[10px] bg-neutral-50 text-[#141414] flex items-center justify-center shrink-0 group-hover:bg-[#141414] group-hover:text-white transition-colors duration-300">
           {icon}
       </div>
       <div className="flex flex-col gap-[2px]">
          <span className="text-[13px] font-medium text-neutral-400 uppercase tracking-wider">{label}</span>
          <div className="text-[16px] text-[#141414] font-medium leading-relaxed">
             {children}
          </div>
       </div>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-[40px] py-[60px] md:py-[100px] flex flex-col lg:flex-row gap-[40px] lg:gap-[80px] items-start">
      {/* Contact Info */}
      <div className="flex flex-col gap-[40px] w-full lg:w-[450px] shrink-0">
          <div className="flex flex-col gap-[12px]">
              <span className="uppercase tracking-widest text-neutral-400 text-[12px] font-semibold">Связь</span>
              <h2 className="text-[32px] md:text-[40px] font-medium text-[#141414] leading-tight">Наши контакты</h2>
              <p className="text-neutral-500 text-[16px] leading-relaxed">
                  Мы всегда на связи и готовы ответить на любые ваши вопросы. Выберите удобный способ связи.
              </p>
          </div>
          
          <div className="flex flex-col gap-[32px]">
             <ContactItem icon={<Phone className="w-5 h-5" />} label="Телефоны">
                 <div className="flex flex-col gap-1">
                    <a href="tel:+971544050707" className="hover:text-red-600 transition-colors">+971 54 405 0707</a>
                    <a href="tel:+971544050303" className="hover:text-red-600 transition-colors">+971 54 405 0303</a>
                    <span className="hover:text-red-600 transition-colors">Офис: +971 4 331 8397</span>
                 </div>
             </ContactItem>

             <ContactItem icon={<Mail className="w-5 h-5" />} label="Email">
                 <a href="mailto:info@mashynbazar.com" className="hover:text-red-600 transition-colors">info@mashynbazar.com</a>
                 <div className="text-neutral-400 text-sm">По вопросам сотрудничества</div>
             </ContactItem>

             <ContactItem icon={<MapPin className="w-5 h-5" />} label="Офис">
                 <p>Dubai, UAE</p>
                 <p className="text-neutral-400 text-sm">Al Quoz Industrial Area 3</p>
             </ContactItem>

             <ContactItem icon={<Clock className="w-5 h-5" />} label="Режим работы">
                 <p>Пн-Сб: 9:00 - 19:00</p>
                 <p className="text-neutral-400 text-sm">Вс: Выходной</p>
             </ContactItem>
          </div>
      </div>

      {/* Contact Form */}
      <div className="flex-1 w-full bg-white rounded-[24px] p-[24px] md:p-[40px] border border-neutral-100 shadow-xl shadow-black/5">
         <div className="flex flex-col gap-[24px]">
             <div className="flex flex-col gap-[8px]">
                 <h3 className="text-[24px] font-medium text-[#141414]">Напишите нам</h3>
                 <p className="text-neutral-500">Заполните форму, и наш менеджер свяжется с вами в течение 15 минут.</p>
             </div>

             <form className="flex flex-col gap-[20px]">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                     {/* Name */}
                     <div className="flex flex-col gap-[8px]">
                         <label className="text-[14px] font-medium text-[#141414]">Ваше имя</label>
                         <div className="bg-neutral-50 rounded-[12px] border border-transparent focus-within:border-[#141414] focus-within:bg-white transition-all flex items-center gap-[12px] px-[16px] h-[52px]">
                             <User className="w-5 h-5 text-neutral-400" />
                             <input type="text" placeholder="Иван Иванов" className="w-full bg-transparent outline-none text-[15px] text-[#141414] placeholder:text-neutral-400" />
                         </div>
                     </div>

                     {/* Phone */}
                     <div className="flex flex-col gap-[8px]">
                         <label className="text-[14px] font-medium text-[#141414]">Телефон</label>
                         <div className="bg-neutral-50 rounded-[12px] border border-transparent focus-within:border-[#141414] focus-within:bg-white transition-all flex items-center gap-[12px] px-[16px] h-[52px]">
                             <Phone className="w-5 h-5 text-neutral-400" />
                             <input type="tel" placeholder="+7 (999) 000-00-00" className="w-full bg-transparent outline-none text-[15px] text-[#141414] placeholder:text-neutral-400" />
                         </div>
                     </div>
                 </div>

                 {/* Email */}
                 <div className="flex flex-col gap-[8px]">
                     <label className="text-[14px] font-medium text-[#141414]">Email (необязательно)</label>
                     <div className="bg-neutral-50 rounded-[12px] border border-transparent focus-within:border-[#141414] focus-within:bg-white transition-all flex items-center gap-[12px] px-[16px] h-[52px]">
                         <Mail className="w-5 h-5 text-neutral-400" />
                         <input type="email" placeholder="example@mail.com" className="w-full bg-transparent outline-none text-[15px] text-[#141414] placeholder:text-neutral-400" />
                     </div>
                 </div>

                 {/* Message */}
                 <div className="flex flex-col gap-[8px]">
                     <label className="text-[14px] font-medium text-[#141414]">Сообщение</label>
                     <div className="bg-neutral-50 rounded-[12px] border border-transparent focus-within:border-[#141414] focus-within:bg-white transition-all flex items-start gap-[12px] p-[16px] min-h-[140px]">
                         <MessageSquare className="w-5 h-5 text-neutral-400 mt-1" />
                         <textarea placeholder="Меня интересует автомобиль..." className="w-full bg-transparent outline-none text-[15px] text-[#141414] placeholder:text-neutral-400 resize-none h-full" />
                     </div>
                 </div>

                 {/* Submit Button */}
                 <button type="button" className="bg-[#141414] text-white rounded-[12px] py-[16px] px-[24px] flex items-center justify-center gap-[10px] hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-lg shadow-black/10 mt-2">
                     <span className="text-[16px] font-medium">Отправить сообщение</span>
                     <Send className="w-4 h-4" />
                 </button>

                 <p className="text-center text-neutral-400 text-[13px]">
                     Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                 </p>
             </form>
         </div>
      </div>
    </section>
  );
}
