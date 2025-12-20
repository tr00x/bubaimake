import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-16 border-t border-primary-foreground/10">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-4 max-w-[300px]">
            <span className="text-2xl font-bold">Mashyn Bazar</span>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>
          
          <div className="flex gap-12 flex-wrap">
            <div className="flex flex-col gap-4">
              <span className="font-semibold">{t('footer.company')}</span>
              <Link to="/features" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">{t('footer.about')}</Link>
              <Link to="/#contacts" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">{t('footer.contacts')}</Link>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">{t('footer.vacancies')}</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold">{t('footer.services')}</span>
              <Link to="/catalog" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">{t('footer.catalog_link')}</Link>
              <Link to="/#services" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">{t('footer.logistics')}</Link>
              <Link to="/#services" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">{t('footer.customs')}</Link>
            </div>
          </div>
        </div>
        
        <div className="h-px bg-primary-foreground/10 w-full" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>{t('footer.copyright', { year })}</p>
        </div>
      </div>
    </footer>
  );
}
