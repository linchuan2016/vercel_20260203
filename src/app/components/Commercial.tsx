import { FadeIn, Section } from "@/app/components/ui/animation";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export function Commercial() {
  const { t } = useLanguage();
  const competencies = t('commercial.competencies') as string[];

  return (
    <Section id="commercial" className="bg-neutral-950 border-t border-white/10">
      <div className="grid lg:grid-cols-2 gap-16">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('commercial.title')}
          </h2>
          <p className="text-lg text-neutral-400 mb-8">
            {t('commercial.description')}
          </p>
          
          <div className="bg-neutral-900 p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold text-white mb-4">{t('commercial.competenciesTitle')}</h3>
            <ul className="space-y-4">
              {competencies.map((item) => (
                <li key={item} className="flex items-start gap-3 text-neutral-300">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <div className="grid gap-6">
           <FadeIn delay={0.2}>
             <div className="p-8 bg-gradient-to-br from-indigo-900/20 to-neutral-900 rounded-2xl border border-indigo-500/20 hover:border-indigo-500/40 transition-colors h-full flex flex-col justify-between">
               <div>
                 <h3 className="text-2xl font-bold text-white mb-2">{t('commercial.consulting.title')}</h3>
                 <p className="text-neutral-400 mb-6">{t('commercial.consulting.desc')}</p>
               </div>
               <button className="flex items-center gap-2 text-white font-medium hover:gap-3 transition-all self-start">
                 {t('commercial.consulting.button')} <ArrowUpRight className="w-4 h-4" />
               </button>
             </div>
           </FadeIn>

           <FadeIn delay={0.4}>
             <div className="p-8 bg-neutral-900 rounded-2xl border border-white/5 hover:border-white/10 transition-colors h-full flex flex-col justify-between">
               <div>
                 <h3 className="text-2xl font-bold text-white mb-2">{t('commercial.mvp.title')}</h3>
                 <p className="text-neutral-400 mb-6">{t('commercial.mvp.desc')}</p>
               </div>
               <button className="flex items-center gap-2 text-white font-medium hover:gap-3 transition-all self-start">
                 {t('commercial.mvp.button')} <ArrowUpRight className="w-4 h-4" />
               </button>
             </div>
           </FadeIn>
        </div>
      </div>
    </Section>
  );
}
