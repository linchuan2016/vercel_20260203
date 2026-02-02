import { FadeIn } from "@/app/components/ui/animation";
import { Mail } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-neutral-950 py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{t('footer.title')}</h2>
          <div className="flex justify-center gap-6 mb-12">
            <a 
              href="mailto:491356605@qq.com" 
              className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>491356605@qq.com</span>
            </a>
          </div>
          <p className="text-neutral-600 text-sm">
            {t('footer.copyright')}
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}
