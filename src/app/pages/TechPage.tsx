import { FadeIn, Section } from "@/app/components/ui/animation";
import { Bot, Image, Sparkles, MessageSquare, Database, Search, Workflow, BrainCircuit, Terminal, BookOpen, PenTool, Code, Table, BarChart, TrendingUp, Target, LayoutGrid } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const productIcons = {
  "ChatGPT (OpenAI)": <MessageSquare className="w-6 h-6" />,
  "Claude (Anthropic)": <Bot className="w-6 h-6" />,
  "Midjourney": <Image className="w-6 h-6" />,
  "Gemini (Google)": <Sparkles className="w-6 h-6" />,
};

const devToolIcons = {
  "Cursor": <Terminal className="w-6 h-6" />,
  "Molbot": <Bot className="w-6 h-6" />,
  "NotebookLM": <BookOpen className="w-6 h-6" />,
  "Manus": <PenTool className="w-6 h-6" />,
};

const toolIcons = {
  "LangChain": <Workflow className="w-8 h-8 text-orange-400" />,
  "Pinecone / Weaviate": <Database className="w-8 h-8 text-cyan-400" />,
  "Milvus / Attu": <LayoutGrid className="w-8 h-8 text-purple-400" />,
  "OpenAI / Cohere": <BrainCircuit className="w-8 h-8 text-green-400" />
};

const dataStackIcons = {
  "Python": <Code className="w-8 h-8 text-yellow-400" />,
  "SQL": <Database className="w-8 h-8 text-blue-400" />,
  "Pandas": <Table className="w-8 h-8 text-white" />,
  "Matplotlib": <BarChart className="w-8 h-8 text-orange-300" />,
  "Google Analytics": <TrendingUp className="w-8 h-8 text-yellow-500" />,
  "Data Tracking": <Target className="w-8 h-8 text-red-400" />
};

export function TechPage() {
  const { t } = useLanguage();
  const products = t('tech.products') as any[];
  const tools = t('tech.tools') as any[];
  const devTools = t('tech.devTools') as any[] || [];
  const dataStack = t('tech.dataStack') as any[] || [];

  return (
    <div className="pt-20 bg-neutral-950 min-h-screen">
      <Section>
        <FadeIn>
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t('tech.title')}</h1>
            <p className="text-neutral-400 max-w-2xl text-lg">
              {t('tech.subtitle')}
            </p>
          </div>
        </FadeIn>

        {/* 1. Big Data (Moved to First Block) */}
        <div className="mb-24">
           <FadeIn>
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-yellow-500 pl-4">
              {t('tech.dataTitle') || "Big Data & Analytics"}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dataStack.map((tool, idx) => (
              <FadeIn key={tool.name} delay={idx * 0.1}>
                <div className="p-6 rounded-xl bg-neutral-900 border border-white/5 hover:bg-neutral-800 transition-colors h-full">
                  <div className="mb-4">{dataStackIcons[tool.name as keyof typeof dataStackIcons]}</div>
                  <h4 className="text-sm font-medium text-neutral-500 mb-1 uppercase tracking-wide">{tool.category}</h4>
                  <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-sm text-neutral-400">{tool.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* 2. Dev Tools (AI Efficiency) */}
        <div className="mb-24">
          <FadeIn>
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-green-500 pl-4">
              {t('tech.devTitle') || "AI Efficiency Tools"}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devTools.map((tool, idx) => (
              <FadeIn key={tool.name} delay={idx * 0.1}>
                <div className="group relative p-8 rounded-2xl bg-neutral-900 border border-white/5 hover:border-green-500/50 transition-colors duration-300 h-full">
                  <div className="absolute top-8 right-8 text-neutral-600 group-hover:text-green-400 transition-colors">
                    {devToolIcons[tool.name as keyof typeof devToolIcons]}
                  </div>
                  <div className="mb-4">
                    <span className="text-xs font-semibold tracking-wider uppercase text-green-400">
                      {tool.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{tool.name}</h3>
                  <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                    {tool.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* 3. AI Products (Existing) */}
        <div className="mb-24">
          <FadeIn>
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">
              {t('tech.aiTitle')}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, idx) => (
              <FadeIn key={product.name} delay={idx * 0.1}>
                <div className="group relative p-8 rounded-2xl bg-neutral-900 border border-white/5 hover:border-indigo-500/50 transition-colors duration-300 h-full">
                  <div className="absolute top-8 right-8 text-neutral-600 group-hover:text-indigo-400 transition-colors">
                    {productIcons[product.name as keyof typeof productIcons]}
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
        </div>

        {/* 4. RAG Stack (Existing) */}
        <div>
           <FadeIn>
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-cyan-500 pl-4">
              {t('tech.ragTitle')}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tools.map((tool, idx) => (
              <FadeIn key={tool.name} delay={0.2 + idx * 0.1}>
                <div className="p-6 rounded-xl bg-neutral-900 border border-white/5 hover:bg-neutral-800 transition-colors h-full">
                  <div className="mb-4">{toolIcons[tool.name as keyof typeof toolIcons]}</div>
                  <h4 className="text-sm font-medium text-neutral-500 mb-1 uppercase tracking-wide">{tool.title}</h4>
                  <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-sm text-neutral-400">{tool.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
