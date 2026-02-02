import { FadeIn, Section } from "@/app/components/ui/animation";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useLanguage } from "@/app/context/LanguageContext";

const bookImages = [
  // Humanities
  "https://images.unsplash.com/photo-1752243775252-8ae76793cafc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxPdXRsaWVycyUyME1hbGNvbG0lMjBHbGFkd2VsbCUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NzAwMjYyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", // Outliers
  "https://images.unsplash.com/photo-1536777525605-e146b6cef617?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaGUlMjBNeXRoaWNhbCUyME1hbiUyME1vbnRoJTIwYm9va3xlbnwxfHx8fDE3NzAwMjYyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", // Mythical Man-Month
  "https://images.unsplash.com/photo-1583135781456-ef77340de85c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHdW5zJTIwR2VybXMlMjBhbmQlMjBTdGVlbCUyMGJvb2t8ZW58MXx8fHwxNzcwMDI2Mjc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", // Guns Germs Steel
  "https://images.unsplash.com/photo-1755545730104-3cb4545282b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYXBpZW5zJTIwWXV2YWwlMjBOb2FoJTIwSGFyYXJpJTIwYm9va3xlbnwxfHx8fDE3NzAwMjYyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", // Sapiens
  "https://images.unsplash.com/photo-1641444473327-ea736547d7bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYWNrZXJzJTIwYW5kJTIwUGFpbnRlcnMlMjBib29rfGVufDF8fHx8MTc3MDAyNjI3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", // Hackers & Painters

  // Product
  "https://images.unsplash.com/photo-1710799885122-428e63eff691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwdXNlciUyMHJlc2VhcmNoJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzcwMDI2Mjc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", // Real Needs
  "https://images.unsplash.com/photo-1696041761060-5c7c81656978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx4aWFvbWklMjBib29rJTIwc2Vuc2UlMjBvZiUyMHBhcnRpY2lwYXRpb258ZW58MXx8fHwxNzcwMDI2Mjc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", // Participation
  "https://images.unsplash.com/photo-1533749871411-5e21e14bcc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwbWFuYWdlbWVudCUyMHN0cmF0ZWd5JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzcwMDI2Mjc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", // Product Methodology
  "https://images.unsplash.com/photo-1710091913161-187984fb63fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYWNraW5nJTIwR3Jvd3RoJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc3MDAyNjI3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", // Hacking Growth
  "https://images.unsplash.com/photo-1647529734822-4d0aabf776e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTY3J1bSUyMEFnaWxlJTIwTWFuYWdlbWVudCUyMGJvb2t8ZW58MXx8fHwxNzcwMDI2Mjc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", // Agile Management
];

export function InsightsPage() {
  const { t } = useLanguage();
  const categories = t('insights.categories');
  const humanities = categories?.humanities;
  const product = categories?.product;

  if (!humanities || !product) return null;

  return (
    <div className="pt-20 bg-neutral-50 min-h-screen text-neutral-900">
      <Section>
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-200 pb-8">
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-neutral-900">
              {t('insights.title')}
            </h1>
            <p className="text-neutral-500 max-w-sm mt-6 md:mt-0">
              {t('insights.description')}
            </p>
          </div>
        </FadeIn>

        {/* Humanities Section */}
        <div className="mb-24">
          <FadeIn>
            <h2 className="text-3xl font-serif font-medium mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-neutral-300"></span>
              {humanities.title}
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {humanities.books.map((book: any, idx: number) => (
              <FadeIn key={book.title} delay={idx * 0.1}>
                <div className="flex flex-col sm:flex-row gap-8 bg-white p-6 rounded-lg shadow-sm border border-neutral-100 hover:shadow-md transition-shadow h-full">
                  <div className="w-full sm:w-40 aspect-[2/3] shrink-0 overflow-hidden rounded-sm bg-neutral-200">
                    <ImageWithFallback
                      src={bookImages[idx]}
                      alt={book.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex flex-col grow">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-bold tracking-widest uppercase text-indigo-500 bg-indigo-50 px-2 py-1 rounded-sm">{book.tag}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-medium mb-1">{book.title}</h3>
                    <p className="text-sm text-neutral-500 mb-4">{book.author}</p>
                    <p className="text-neutral-600 leading-relaxed text-sm border-l-2 border-indigo-500 pl-4 mt-auto italic">
                      "{book.thought}"
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Product Section */}
        <div>
           <FadeIn>
            <h2 className="text-3xl font-serif font-medium mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-neutral-300"></span>
              {product.title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {product.books.map((book: any, idx: number) => (
              <FadeIn key={book.title} delay={idx * 0.1}>
                <div className="flex flex-col sm:flex-row gap-8 bg-white p-6 rounded-lg shadow-sm border border-neutral-100 hover:shadow-md transition-shadow h-full">
                  <div className="w-full sm:w-40 aspect-[2/3] shrink-0 overflow-hidden rounded-sm bg-neutral-200">
                    <ImageWithFallback
                      src={bookImages[humanities.books.length + idx]}
                      alt={book.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex flex-col grow">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-bold tracking-widest uppercase text-indigo-500 bg-indigo-50 px-2 py-1 rounded-sm">{book.tag}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-medium mb-1">{book.title}</h3>
                    <p className="text-sm text-neutral-500 mb-4">{book.author}</p>
                    <p className="text-neutral-600 leading-relaxed text-sm border-l-2 border-indigo-500 pl-4 mt-auto italic">
                      "{book.thought}"
                    </p>
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
