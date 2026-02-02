import { FadeIn, Section } from "@/app/components/ui/animation";
import { useLanguage } from "@/app/context/LanguageContext";
import { DigitModelDiagram } from "@/app/components/DigitModelDiagram";
import { PvipModelDiagram } from "@/app/components/PvipModelDiagram";
import { LeadModelDiagram } from "@/app/components/LeadModelDiagram";
import { ValueModelDiagram } from "@/app/components/ValueModelDiagram";

export function MethodologyPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-20 bg-neutral-950 min-h-screen">
      <Section>
        <FadeIn>
          <div className="mb-24">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t('tech.methodologyTitle')}</h1>
            <p className="text-neutral-400 max-w-2xl text-lg">
              {t('tech.methodologySubtitle')}
            </p>
          </div>
        </FadeIn>

        {/* Section 1: DIGIT Model */}
        <div className="mb-32">
          <FadeIn>
             <div className="flex items-center gap-4 mb-12">
                <span className="text-4xl font-bold text-white/10">01</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{t('tech.digitModel.title')}</h2>
                <div className="h-px bg-white/10 flex-grow ml-4"></div>
             </div>
             
             <div className="flex flex-col xl:flex-row gap-12 items-start">
                {/* Diagram */}
                <div className="w-full xl:w-2/3">
                   <DigitModelDiagram />
                </div>
                
                {/* Description Text */}
                <div className="w-full xl:w-1/3 flex flex-col justify-center h-full xl:pt-12">
                   <h4 className="text-xl text-blue-400 mb-8 leading-relaxed font-light border-b border-white/10 pb-6">{t('tech.digitModel.subtitle')}</h4>
                   <p className="text-neutral-300 leading-loose text-lg">
                      {t('tech.digitModel.desc')}
                   </p>
                </div>
             </div>
          </FadeIn>
        </div>

        {/* Section 2: PVIP Model */}
        <div className="mb-32">
          <FadeIn>
             <div className="flex items-center gap-4 mb-12">
                <span className="text-4xl font-bold text-white/10">02</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{t('tech.pvipModel.title')}</h2>
                <div className="h-px bg-white/10 flex-grow ml-4"></div>
             </div>

             <div className="flex flex-col xl:flex-row-reverse gap-12 items-start">
                {/* Diagram */}
                <div className="w-full xl:w-2/3">
                   <PvipModelDiagram />
                </div>
                
                {/* Description Text */}
                <div className="w-full xl:w-1/3 flex flex-col justify-center h-full xl:pt-12">
                   <h4 className="text-xl text-blue-400 mb-8 leading-relaxed font-light border-b border-white/10 pb-6">{t('tech.pvipModel.subtitle')}</h4>
                   <p className="text-neutral-300 leading-loose text-lg">
                      {t('tech.pvipModel.desc')}
                   </p>
                </div>
             </div>
          </FadeIn>
        </div>

        {/* Section 3: LEAD Model */}
        <div className="mb-32">
          <FadeIn>
             <div className="flex items-center gap-4 mb-12">
                <span className="text-4xl font-bold text-white/10">03</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{t('tech.leadModel.title')}</h2>
                <div className="h-px bg-white/10 flex-grow ml-4"></div>
             </div>
             
             <div className="flex flex-col xl:flex-row gap-12 items-start">
                {/* Diagram */}
                <div className="w-full xl:w-2/3">
                   <LeadModelDiagram />
                </div>
                
                {/* Description Text */}
                <div className="w-full xl:w-1/3 flex flex-col justify-center h-full xl:pt-12">
                   <h4 className="text-xl text-blue-400 mb-8 leading-relaxed font-light border-b border-white/10 pb-6">{t('tech.leadModel.subtitle')}</h4>
                   <p className="text-neutral-300 leading-loose text-lg">
                      {t('tech.leadModel.desc')}
                   </p>
                </div>
             </div>
          </FadeIn>
        </div>

        {/* Section 4: VALUE Model */}
        <div className="mb-16">
          <FadeIn>
             <div className="flex items-center gap-4 mb-12">
                <span className="text-4xl font-bold text-white/10">04</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{t('tech.valueModel.title')}</h2>
                <div className="h-px bg-white/10 flex-grow ml-4"></div>
             </div>
             
             <div className="flex flex-col xl:flex-row-reverse gap-12 items-start">
                {/* Diagram */}
                <div className="w-full xl:w-2/3">
                   <ValueModelDiagram />
                </div>
                
                {/* Description Text */}
                <div className="w-full xl:w-1/3 flex flex-col justify-center h-full xl:pt-12">
                   <h4 className="text-xl text-blue-400 mb-8 leading-relaxed font-light border-b border-white/10 pb-6">{t('tech.valueModel.subtitle')}</h4>
                   <p className="text-neutral-300 leading-loose text-lg">
                      {t('tech.valueModel.desc')}
                   </p>
                </div>
             </div>
          </FadeIn>
        </div>
        
      </Section>
    </div>
  );
}
