import { FadeIn, Section } from "@/app/components/ui/animation";
import { Bot, Image, Sparkles, MessageSquare } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const icons = {
  "ChatGPT (OpenAI)": <MessageSquare className="w-6 h-6" />,
  "Claude (Anthropic)": <Bot className="w-6 h-6" />,
  "Midjourney": <Image className="w-6 h-6" />,
  "Gemini (Google)": <Sparkles className="w-6 h-6" />,
};

export function AIProducts() {
  const { t } = useLanguage();
  const products = t('ai.products') as any[];

  return (
    <div id="ai-products" className="bg-neutral-900 border-y border-white/5">
      <Section>
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('ai.title')}</h2>
            <p className="text-neutral-400 max-w-2xl text-lg">
              {t('ai.subtitle')}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, idx) => (
            <FadeIn key={product.name} delay={idx * 0.1}>
              <div className="group relative p-8 rounded-2xl bg-neutral-950 border border-white/10 hover:border-indigo-500/50 transition-colors duration-300 h-full">
                <div className="absolute top-8 right-8 text-neutral-600 group-hover:text-indigo-400 transition-colors">
                  {icons[product.name as keyof typeof icons]}
                </div>
                <div className="mb-4">
                  <span className="text-xs font-semibold tracking-wider uppercase text-indigo-400">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{product.name}</h3>
                <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                  {product.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </div>
  );
}
