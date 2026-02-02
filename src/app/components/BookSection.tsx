import { FadeIn, Section } from "@/app/components/ui/animation";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useLanguage } from "@/app/context/LanguageContext";

const bookImages = [
  "https://images.unsplash.com/photo-1596522681657-8e9057309a7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFjayUyMG9mJTIwYWVzdGhldGljJTIwYm9va3MlMjBtaW5pbWFsJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY5OTU1NDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1765371514743-45bd8e6c0a28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd2hpdGUlMjB3b3Jrc3BhY2UlMjBkZXNrJTIwYWVzdGhldGljfGVufDF8fHx8MTc2OTk1NTQ0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1768101225267-c6fc5678c113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmFsJTIwc3RydWN0dXJlJTIwc3RlZWwlMjBhbmQlMjBnbGFzcyUyMG1pbmltYWx8ZW58MXx8fHwxNzY5OTU1NDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
];

export function BookSection() {
  const { t } = useLanguage();
  const books = t('books.items') as any[];

  return (
    <div id="books" className="bg-neutral-50 text-neutral-900 py-24">
      <Section className="py-0 md:py-0">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-200 pb-8">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-neutral-900">
              {t('books.title')}
            </h2>
            <p className="text-neutral-500 max-w-sm mt-6 md:mt-0">
              {t('books.description')}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {books.map((book, idx) => (
            <FadeIn key={book.title} delay={idx * 0.2}>
              <div className="flex flex-col gap-6 h-full">
                <div className="aspect-[3/4] overflow-hidden rounded-sm bg-neutral-200">
                  <ImageWithFallback
                    src={bookImages[idx]}
                    alt={book.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex flex-col grow">
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-xs font-bold tracking-widest uppercase text-neutral-400">{book.tag}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-medium mb-1">{book.title}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{book.author}</p>
                  <p className="text-neutral-600 leading-relaxed text-sm border-l-2 border-neutral-900 pl-4 mt-auto">
                    {book.thought}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </div>
  );
}
