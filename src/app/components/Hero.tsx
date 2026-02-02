import { FadeIn, Section } from "@/app/components/ui/animation";
import { ArrowRight, Quote } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useLanguage } from "@/app/context/LanguageContext";
import { Link } from "react-router-dom";

const quoteImages = [
  "https://images.unsplash.com/photo-1475078891680-4a52da36b99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBhYnN0cmFjdCUyMGJsdWVwcmludCUyMHRlY2hub2xvZ3klMjBkaWdpdGFsJTIwc3RydWN0dXJlfGVufDF8fHx8MTc3MDAxODI2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1516713603512-4daf73be9d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwaHVtYW4lMjBjb25uZWN0aW9uJTIwcm9ib3QlMjBoYW5kJTIwdG91Y2hpbmclMjBodW1hbiUyMGhhbmQlMjBmdXR1cmlzdGljfGVufDF8fHx8MTc3MDAxODI2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
];

export function Hero() {
  const { t } = useLanguage();
  const titleParts = t('hero.title') as string[];
  const quotes = t('about.quotes') as any[];

  return (
    <div className="bg-neutral-950">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764336312138-14a5368a6cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBicmFpbiUyMGFpJTIwYXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZSUyMGNvbmNlcHR8ZW58MXx8fHwxNzY5OTU1NDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Abstract AI"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        </div>

        <Section className="relative z-10 w-full">
          <div className="max-w-4xl">
            <FadeIn>
              <h1 className={`text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1] ${
                titleParts[0].match(/[\u4e00-\u9fa5]/) ? "font-black tracking-widest" : "font-bold tracking-tighter"
              }`}>
                {titleParts[0].replace(/[.。]$/, "")} <br />
                {titleParts[1].replace(/[.。]$/, "")} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  {titleParts[2].replace(/[.。]$/, "")}
                </span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mb-12 leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/commercial"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors"
                >
                  {t('hero.strategy')} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/insights"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  {t('hero.read')}
                </Link>
              </div>
            </FadeIn>
          </div>
        </Section>
      </div>

      {/* Quotes Section (Previously About) */}
      <Section className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Quotes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {quotes.map((quote: any, idx: number) => (
              <FadeIn key={idx} delay={0.2 + (idx * 0.1)}>
                <div className="h-full bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 flex flex-col">
                  {/* Image Header */}
                  <div className="h-64 relative overflow-hidden shrink-0">
                    <ImageWithFallback 
                      src={quoteImages[idx % quoteImages.length]} 
                      alt="Quote illustration"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                    <div className="absolute bottom-6 left-8">
                       <div className="bg-indigo-500/20 backdrop-blur-md p-3 rounded-xl border border-indigo-500/30">
                         <Quote className="w-6 h-6 text-indigo-200" />
                       </div>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-8 pt-6 flex-1 flex flex-col justify-between">
                    <blockquote className="text-xl text-neutral-300 leading-relaxed font-light mb-8">
                      "{quote.text}"
                    </blockquote>
                    
                    <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                      <div className="w-8 h-[1px] bg-indigo-500"></div>
                      <cite className="text-white font-medium tracking-wide not-italic">
                        {quote.author}
                      </cite>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </Section>
    </div>
  );
}
