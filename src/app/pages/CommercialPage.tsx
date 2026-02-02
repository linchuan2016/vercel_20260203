import { FadeIn, Section } from "@/app/components/ui/animation";
import { CheckCircle2, PenTool, TrendingUp, MonitorPlay } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export function CommercialPage() {
  const { t } = useLanguage();
  const services = t('commercial.services') as any[];

  return (
    <div className="pt-20 bg-neutral-950 min-h-screen">
      <Section>
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('commercial.title')}
          </h1>
          <p className="text-lg text-neutral-400 mb-16 max-w-2xl">
            {t('commercial.description')}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Service 1: Product Design */}
          <FadeIn delay={0.2}>
            <div className="p-8 md:p-12 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <PenTool className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{services[0].title}</h2>
              <p className="text-neutral-400 mb-8 leading-relaxed">
                {services[0].desc}
              </p>
              <ul className="space-y-4">
                {(services[0].features as string[]).map((feature: string) => (
                  <li key={feature} className="flex items-center gap-3 text-neutral-300">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Service 2: Copywriting */}
          <FadeIn delay={0.4}>
            <div className="p-8 md:p-12 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all group">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{services[1].title}</h2>
              <p className="text-neutral-400 mb-8 leading-relaxed">
                {services[1].desc}
              </p>
              <ul className="space-y-4">
                {(services[1].features as string[]).map((feature: string) => (
                  <li key={feature} className="flex items-center gap-3 text-neutral-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}
