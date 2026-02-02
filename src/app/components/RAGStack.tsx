import { FadeIn, Section } from "@/app/components/ui/animation";
import { Database, Search, Workflow, BrainCircuit } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const icons = {
  "LangChain": <Workflow className="w-8 h-8 text-orange-400" />,
  "Pinecone / Weaviate": <Database className="w-8 h-8 text-cyan-400" />,
  "LlamaIndex": <Search className="w-8 h-8 text-purple-400" />,
  "OpenAI / Cohere": <BrainCircuit className="w-8 h-8 text-green-400" />
};

export function RAGStack() {
  const { t } = useLanguage();
  const tools = t('rag.tools') as any[];

  return (
    <Section id="rag-tools" className="bg-neutral-950">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              {t('rag.title')}
            </h2>
            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
              {t('rag.description')}
            </p>
            <div className="h-px w-20 bg-indigo-500 mb-8" />
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((tool, idx) => (
            <FadeIn key={tool.name} delay={0.2 + idx * 0.1}>
              <div className="p-6 rounded-xl bg-neutral-900 border border-white/5 hover:bg-neutral-800 transition-colors h-full">
                <div className="mb-4">{icons[tool.name as keyof typeof icons]}</div>
                <h4 className="text-sm font-medium text-neutral-500 mb-1 uppercase tracking-wide">{tool.title}</h4>
                <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-sm text-neutral-400">{tool.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
