import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

export const translations = {
  en: {
    nav: {
      home: "Home",
      methodology: "Methodology",
      tech: "Tech Stack",
      insights: "Insights",
      commercial: "Commercial",
      login: "Login",
      register: "Register",
      logout: "Logout",
      connect: "Connect"
    },
    hero: {
      title: ["Design.", "Intelligence.", "Commerce."],
      subtitle: "Product leader with 13 years of experience at the intersection of Design, Intelligence, and Commerce.",
      strategy: "View Strategy",
      read: "Read Insights"
    },
    about: {
      intro: "I am a Product Manager with 13 years of experience. My core philosophy integrates \"Design, Intelligence, and Commerce,\" focusing on driving the full product lifecycle.",
      quotes: [
        {
          text: "Product managers must evolve into Full Stack Builders, who can integrate design, technology, and business to drive comprehensive value creation.",
          author: "LinkedIn"
        },
        {
          text: "In the era of AI, product managers will be more important than ever—they are the critical bridge between technology and human needs.",
          author: "Andrew Ng"
        }
      ]
    },
    tech: {
      title: "Technology Stack",
      subtitle: "The tools and frameworks powering the next generation of AI applications.",
      methodologyTitle: "Methodology",
      methodologySubtitle: "Frameworks that guide product execution and innovation.",
      digitModel: {
        title: "DIGIT Model",
        subtitle: "Digital Implementation Model: Target-oriented Workflow & Toolset Iteration",
        desc: "A comprehensive framework connecting strategic definition to operational execution through continuous iteration of workflows and tools.",
        labels: {
          definition: "Definition",
          definitionZh: "Target Definition",
          indicator: "Indicator",
          indicatorZh: "Key Metrics",
          workflow: "Workflow",
          workflowZh: "Execution Grid",
          tools: "Tools",
          toolsZh: "Tech Stack",
          iteration: "Iteration",
          iterationZh: "Continuous Cycle"
        }
      },
      pvipModel: {
        title: "PVIP Iteration Method",
        subtitle: "Pain Point · Value · Iteration · Priority",
        desc: "A balanced iteration framework that prioritizes value delivery by constantly evaluating pain points and priorities.",
        labels: {
          pain: "Pain Point",
          value: "Value",
          iteration: "Iteration",
          priority: "Priority"
        }
      },
      leadModel: {
        title: "LEAD Model",
        subtitle: "Layout · Evolve · Audience · Digitalize",
        desc: "A strategic framework connecting cost and certainty through four quadrants: Top-level Design, Process Evolution, Target Audience, and Digital Technology.",
        labels: {
          layout: "Layout",
          layoutZh: "Top-level Design",
          evolve: "Evolve",
          evolveZh: "Process Evolution",
          audience: "Audience",
          audienceZh: "Target Audience",
          digitalize: "Digitalize",
          digitalizeZh: "Digital Technology",
          yAxisTop: "High Certainty",
          yAxisBottom: "Low Certainty",
          xAxisLeft: "Low Cost",
          xAxisRight: "High Cost",
          q1Sub: "0-1",
          q2Sub: "1-10",
          q3Sub: "0-100",
          q4Sub: "10-100",
          q1Keywords: ["Product Roadmap", "Org Readiness"],
          q2Keywords: ["Experiment Mode", "Orchestration"],
          q3Keywords: ["End Users", "Internal Users"],
          q4Keywords: ["AI", "Digital Systems"]
        }
      },
      valueModel: {
        title: "VALUE Model",
        subtitle: "Product Value Quantification Model",
        desc: "A pyramid structure quantifying product value from effort to commercialization.",
        labels: {
          l5: "VALUE",
          l5Desc: "Commercial Value",
          l4: "Asset",
          l4Desc: "Potential Business",
          l3: "Level of Use",
          l3Desc: "Quality of Use",
          l2: "Usage",
          l2Desc: "User Coverage",
          l1: "Effort",
          l1Desc: "Number of Requirements"
        }
      },
      devTitle: "AI Efficiency Tools",
      devTools: [
        { name: "Cursor", category: "AI Editor", description: "The AI-first code editor building software faster." },
        { name: "Moltbot", category: "AI Agent", description: "Advanced autonomous agent for complex task execution." },
        { name: "NotebookLM", category: "Knowledge", description: "Personalized AI research assistant grounded in your documents." },
        { name: "Manus", category: "Automation", description: "AI-powered tool for streamlined workflow automation." }
      ],
      aiTitle: "Global AI Landscape",
      ragTitle: "RAG Technology Stack",
      dataTitle: "Big Data & Analytics",
      dataStack: [
        { name: "Python", category: "Core", description: "Primary language for data science and machine learning." },
        { name: "SQL", category: "Query", description: "Standard language for relational database management." },
        { name: "Pandas", category: "Processing", description: "Powerful data analysis and manipulation library." },
        { name: "Matplotlib", category: "Visualization", description: "Comprehensive plotting library for data visualization." },
        { name: "Google Analytics", category: "Analytics", description: "Web traffic and user behavior tracking." },
        { name: "Data Tracking", category: "Telemetry", description: "Custom event tracking implementation." }
      ],
      products: [
        {
          name: "ChatGPT (OpenAI)",
          category: "LLM Leader",
          description: "The pioneer of conversational AI, setting the standard for reasoning and creativity."
        },
        {
          name: "Claude (Anthropic)",
          category: "Safe & Ethical AI",
          description: "Known for its massive context window and nuanced understanding of complex tasks."
        },
        {
          name: "Midjourney",
          category: "Generative Art",
          description: "Unparalleled artistic quality in text-to-image generation, redefining digital creativity."
        },
        {
          name: "Gemini (Google)",
          category: "Multimodal Native",
          description: "Seamlessly reasoning across text, images, video, and audio in real-time."
        }
      ],
      tools: [
        {
          title: "Orchestration",
          name: "LangChain",
          desc: "The framework for developing applications powered by language models."
        },
        {
          title: "Vector Database",
          name: "Pinecone / Weaviate",
          desc: "Long-term memory for AI, enabling semantic search and context retrieval."
        },
        {
          title: "Vector Ops",
          name: "Milvus / Attu",
          desc: "Cloud-native vector database for scalable similarity search, with Attu for visual management."
        },
        {
          title: "Embeddings",
          name: "OpenAI / Cohere",
          desc: "Transforming text into vectors to capture semantic meaning."
        }
      ]
    },
    insights: {
      title: "Curated Insights",
      description: "Books and philosophies that shape my product thinking.",
      categories: {
        humanities: {
          title: "Humanities",
          books: [
            {
              title: "Outliers",
              author: "Malcolm Gladwell",
              thought: "Success is rarely a solitary journey. It is the accumulation of hidden advantages, timing, and 10,000 hours of practice.",
              tag: "Sociology"
            },
            {
              title: "The Mythical Man-Month",
              author: "Fred Brooks",
              thought: "Adding manpower to a late software project makes it later. A timeless lesson in project management complexity.",
              tag: "Engineering"
            },
            {
              title: "Guns, Germs, and Steel",
              author: "Jared Diamond",
              thought: "A fundamental framework for understanding how environmental factors shape the fate of human societies.",
              tag: "Macro History"
            },
            {
              title: "Sapiens: A Brief History of Humankind",
              author: "Yuval Noah Harari",
              thought: "We rule the world because we are the only animal that can believe in things that exist purely in our own imagination, such as gods, states, money, and human rights.",
              tag: "History"
            },
            {
              title: "Hackers & Painters",
              author: "Paul Graham",
              thought: "Hacking and painting have a lot in common. In fact, of all the different types of people, hackers and painters are among the most alike.",
              tag: "Philosophy"
            }
          ]
        },
        product: {
          title: "Product & Business",
          books: [
            {
              title: "The Real Needs",
              author: "Liang Ning",
              thought: "Product thinking is about understanding the changing emotions and deep desires of human beings.",
              tag: "Product"
            },
            {
              title: "The Sense of Participation",
              author: "Wanqiang Li",
              thought: "Building a brand is about building a movement. Empower users to become part of the product development process.",
              tag: "Growth"
            },
            {
              title: "Product Methodology",
              author: "Yu Jun",
              thought: "Product managers are the CEO of the product. They must understand the transaction cost and utility to create value.",
              tag: "Methodology"
            },
            {
              title: "Hacking Growth",
              author: "Sean Ellis",
              thought: "Growth is not a one-time hack, but a systematic process of experimentation and data-driven decision making.",
              tag: "Growth"
            },
            {
              title: "Agile Management",
              author: "Jeff Sutherland",
              thought: "The art of doing twice the work in half the time. Iterative development is the key to adapting to change.",
              tag: "Management"
            }
          ]
        }
      }
    },
    commercial: {
      title: "Commercial Services",
      description: "Professional services to accelerate your business growth.",
      services: [
        {
          title: "Product Design & Consulting",
          desc: "End-to-end product strategy, from ideation to MVP. I help startups validate assumptions and build scalable architectures.",
          features: ["Market Research", "User Journey Mapping", "Prototyping", "Tech Stack Selection"]
        },
        {
          title: "Copywriting & Creative Writing",
          desc: "Compelling storytelling for the AI era. I craft narratives that demystify complex technologies and engage global audiences.",
          features: ["Brand Voice", "Creative Writing", "Social Media Writing", "Video Editing"]
        }
      ]
    },
    auth: {
      loginTitle: "Welcome Back",
      registerTitle: "Join the Future",
      email: "Email Address",
      password: "Password",
      submitLogin: "Sign In",
      submitRegister: "Create Account",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      linkRegister: "Register here",
      linkLogin: "Login here",
      error: "An error occurred. Please try again."
    },
    footer: {
      title: "Contact",
      copyright: "© 2026 FuturePM. All rights reserved."
    }
  },
  zh: {
    nav: {
      home: "首页",
      methodology: "方法论",
      tech: "技术栈",
      insights: "洞察",
      commercial: "商业服务",
      login: "登录",
      register: "注册",
      logout: "退出",
      connect: "联系"
    },
    hero: {
      title: ["设计。", "智能。", "商业。"],
      subtitle: "拥有13年经验的产品领导者，专注于设计、智能与商业的融合领域。",
      strategy: "查看策略",
      read: "阅读感悟"
    },
    about: {
      intro: "我是一名产品经理，拥有13年产品经理从业经验，以“设计、智能、商业三位一体”为核心工作思路，聚焦产品全生命周期推进。",
      quotes: [
        {
          text: "产品经理必须转变为全栈建设者，能够整合设计、技术与商业，推动全面的价值创造。",
          author: "领英"
        },
        {
          text: "在人工智能时代，产品经理将比以往任何时候都更重要——他们是连接技术与人类需求的关键桥梁。",
          author: "吴恩达"
        }
      ]
    },
    tech: {
      title: "技术全景",
      subtitle: "赋能下一代 AI 应用的工具与框架。",
      methodologyTitle: "方法论",
      methodologySubtitle: "指导产品执行与创新的框架体系。",
      digitModel: {
        title: "DIGIT 模型",
        subtitle: "数字化执行落地方法模型：目标导向的工作流与工具集持续迭代模型",
        desc: "连接战略定义与执行落地的综合框架，通过工作流与工具集的持续迭代实现价值交付。",
        labels: {
          definition: "Definition",
          definitionZh: "目标定义",
          indicator: "Indicator",
          indicatorZh: "关键指标",
          workflow: "Grid",
          workflowZh: "工作流矩阵",
          tools: "Tools",
          toolsZh: "工具集",
          iteration: "Iteration",
          iterationZh: "持续迭代"
        }
      },
      pvipModel: {
        title: "PVIP 迭代法",
        subtitle: "痛点 · 价值 · 迭代 · 优先级",
        desc: "一个简洁且平衡的循环流程，通过持续评估痛点与优先级，确保产品迭代始终围绕核心价值展开。",
        labels: {
          pain: "痛点",
          value: "价值",
          iteration: "迭代",
          priority: "优先级"
        }
      },
      leadModel: {
        title: "LEAD 模型",
        subtitle: "布局 · 演化 · 受众 · 数字化",
        desc: "LEAD模型是一个经典的四象限坐标系架构，通过成本与确定性两个维度，将数字化策略划分为顶层设计、流程演化、目标用户和数字技术四个阶段。",
        labels: {
          layout: "Layout",
          layoutZh: "顶层设计",
          evolve: "Evolve",
          evolveZh: "流程演化",
          audience: "Audience",
          audienceZh: "目标用户",
          digitalize: "Digitalize",
          digitalizeZh: "数字技术",
          yAxisTop: "确定性高",
          yAxisBottom: "确定性低",
          xAxisLeft: "成本低",
          xAxisRight: "成本高",
          q1Sub: "0-1",
          q2Sub: "1-10",
          q3Sub: "0-100",
          q4Sub: "10-100",
          q1Keywords: ["产品路线", "组织准备"],
          q2Keywords: ["实验模", "工作编排"],
          q3Keywords: ["终端客户", "内部用户"],
          q4Keywords: ["AI", "数字化系统"]
        }
      },
      valueModel: {
        title: "VALUE 模型",
        subtitle: "产品价值量化模型",
        desc: "一个采用阶梯状彩色金字塔结构的价值量化模型，从需求数到商业价值层层递进。",
        labels: {
          l5: "VALUE",
          l5Desc: "商业价值层",
          l4: "Asset",
          l4Desc: "潜在商业层",
          l3: "Level of Use",
          l3Desc: "使用质量层",
          l2: "Usage",
          l2Desc: "用户覆盖层",
          l1: "Effort",
          l1Desc: "需求数"
        }
      },
      devTitle: "AI 效能工具",
      devTools: [
        { name: "Cursor", category: "AI 编辑器", description: "构建软件更快的 AI 优先代码编辑器。" },
        { name: "Moltbot", category: "AI 智能体", description: "用于执行复杂任务的高级自主智能体。" },
        { name: "NotebookLM", category: "知识助手", description: "基于您文档的个性化 AI 研究助手。" },
        { name: "Manus", category: "自动化", description: "简化工作流程的 AI 驱动工具。" }
      ],
      aiTitle: "全球 AI 全景",
      ragTitle: "RAG 技术栈",
      dataTitle: "大数据与分析",
      dataStack: [
        { name: "Python", category: "核心", description: "数据科学与机器学习的主要语言。" },
        { name: "SQL", category: "查询", description: "关系数据库管理的标准语言。" },
        { name: "Pandas", category: "处理", description: "强大的数据分析与操作库。" },
        { name: "Matplotlib", category: "可视化", description: "用于数据可视化的综合绘图库。" },
        { name: "Google Analytics", category: "分析", description: "网站流量与用户行为追踪。" },
        { name: "数据埋点", category: "遥测", description: "自定义事件追踪实施。" }
      ],
      products: [
        {
          name: "ChatGPT (OpenAI)",
          category: "大语言模型领袖",
          description: "对话式 AI 的先驱，树立了推理和创造力的标准。"
        },
        {
          name: "Claude (Anthropic)",
          category: "安全与伦理 AI",
          description: "以其巨大的上下文窗口和对复杂任务的细致理解而闻名。"
        },
        {
          name: "Midjourney",
          category: "生成式艺术",
          description: "在文本生成图像方面拥有无与伦比的艺术质量，重新定义了数字创意。"
        },
        {
          name: "Gemini (Google)",
          category: "原生多模态",
          description: "实时无缝地跨文本、图像视频和音频进行推理。"
        }
      ],
      tools: [
        {
          title: "编排",
          name: "LangChain",
          desc: "用于开发由语言模型驱动的应用程序的框架。"
        },
        {
          title: "向量数据库",
          name: "Pinecone / Weaviate",
          desc: "AI 的长期记忆，支持语义搜索和上下文检索。"
        },
        {
          title: "向量运维",
          name: "Milvus / Attu",
          desc: "具有可视化管理的云原生向量数据库，用于可扩展的相似性搜索。"
        },
        {
          title: "嵌入",
          name: "OpenAI / Cohere",
          desc: "将文本转换为向量以捕捉语义含义。"
        }
      ]
    },
    insights: {
      title: "精选洞察",
      description: "塑造我产品思维的书籍与哲学。",
      categories: {
        humanities: {
          title: "人文",
          books: [
            {
              title: "异类",
              author: "马尔科姆·格拉德威尔",
              thought: "成功很少是一个人的旅程。它是隐藏优势、时机和一万小时练习的积累。",
              tag: "社会学"
            },
            {
              title: "人月神话",
              author: "弗雷德·布鲁克斯",
              thought: "向延期的软件项目增加人力只会使其更加延期。软件工程与管理的经典教训。",
              tag: "工程"
            },
            {
              title: "枪炮、病菌与钢铁",
              author: "贾雷德·戴蒙德",
              thought: "理解环境因素如何塑造人类社会命运的基本框架。",
              tag: "宏观历史"
            },
            {
              title: "人类简史",
              author: "尤瓦尔·赫拉利",
              thought: "我们统治世界是因为我们是唯一能相信纯粹存在于想象中的事物的动物，如神、国家、金钱和人权。",
              tag: "历史"
            },
            {
              title: "黑客与画家",
              author: "保罗·格雷厄姆",
              thought: "黑客与画家有很多共同点。事实上，在所有不同类型的人中，黑客和画家是最相似的。",
              tag: "哲学"
            }
          ]
        },
        product: {
          title: "产品",
          books: [
             {
              title: "真需求",
              author: "梁宁",
              thought: "产品思维就是理解人类不断变化的情绪和深层欲望。",
              tag: "产品"
            },
            {
              title: "参与感",
              author: "黎万强",
              thought: "构建品牌就是构建一场运动。让用户参与到产品开发过程中，创造口碑。",
              tag: "增长"
            },
            {
              title: "产品方法论",
              author: "俞军",
              thought: "产品经理是产品的 CEO。他们必须理解交易成本和效用以创造价值。",
              tag: "方法论"
            },
            {
              title: "增长黑客",
              author: "肖恩·埃利斯",
              thought: "增长不是一次性的黑客行为，而是一个系统的实验和数据驱动决策过程。",
              tag: "增长"
            },
            {
              title: "敏捷管理",
              author: "杰夫·萨瑟兰",
              thought: "事半功倍的艺术。迭代开发是适应变化的关键。",
              tag: "管理"
            }
          ]
        }
      }
    },
    commercial: {
      title: "商业服务",
      description: "专业服务助力您的业务增长。",
      services: [
        {
          title: "产品设计与咨询",
          desc: "从创意到 MVP 的端到端产品策略。我帮助初创团队验证假设并构建可扩展的架构。",
          features: ["市场调研", "用户旅程地图", "原型设计", "技术栈选型"]
        },
        {
          title: "文案策划与创意写作",
          desc: "AI 时代的引人入胜的故事讲述。我精心制作能够揭开复杂技术面纱并吸引全球受众的内容。",
          features: ["品牌语调", "创意写作", "自媒体写作", "视频剪辑"]
        }
      ]
    },
    auth: {
      loginTitle: "欢迎回来",
      registerTitle: "加入未来",
      email: "邮箱地址",
      password: "密码",
      submitLogin: "登录",
      submitRegister: "创建账户",
      noAccount: "还没有账号？",
      hasAccount: "已有账号？",
      linkRegister: "点击注册",
      linkLogin: "点击登录",
      error: "发生错误，请重试。"
    },
    footer: {
      title: "联系",
      copyright: "© 2026 FuturePM. 保留所有权利。"
    }
  }
};

// Create a default context value to prevent crashes when provider is missing
const defaultT = (key: string) => {
    const keys = key.split('.');
    let value: any = translations['en'];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
};

const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => console.warn('LanguageProvider is missing'),
  t: defaultT
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  // Context will now always be defined due to defaultContext
  return context;
};