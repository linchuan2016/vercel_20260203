import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'motion/react';

export function ValueModelDiagram() {
  const { t, language } = useLanguage();
  const valueModel = t('tech.valueModel') || {};
  const labels = valueModel.labels || {};

  // Data structure
  // Top (L5) to Bottom (L1)
  // Widths: 20%, 35%, 50%, 75%, 100% (Adjusted for smoother visual steps)
  const tiers = [
    { 
      level: 'L5', 
      label: labels.l5 || 'VALUE', 
      text: labels.l5Desc || '商业价值层', 
      color: '#007BFF', 
      textColor: 'text-white', 
      width: 'w-[20%]',
      shadow: 'shadow-blue-200'
    },
    { 
      level: 'L4', 
      label: labels.l4 || 'Asset', 
      text: labels.l4Desc || '潜在商业层', 
      color: '#4499FF', 
      textColor: 'text-white', 
      width: 'w-[35%]',
      shadow: 'shadow-blue-200'
    },
    { 
      level: 'L3', 
      label: labels.l3 || 'Level of Use', 
      text: labels.l3Desc || '使用质量层', 
      color: '#80BDFF', 
      textColor: 'text-white', // Changed to white for better contrast on mid-blue
      width: 'w-[50%]',
      shadow: 'shadow-blue-100'
    },
    { 
      level: 'L2', 
      label: labels.l2 || 'Usage', 
      text: labels.l2Desc || '用户覆盖层', 
      color: '#C6E4FF', 
      textColor: 'text-[#004085]', // Dark blue text for contrast
      width: 'w-[75%]',
      shadow: 'shadow-blue-50'
    },
    { 
      level: 'L1', 
      label: labels.l1 || 'Effort', 
      text: labels.l1Desc || '需求数', 
      color: '#EBF5FF', 
      textColor: 'text-[#004085]', // Dark blue text
      width: 'w-[100%]',
      shadow: 'shadow-gray-50'
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-10 relative overflow-hidden flex flex-col font-sans">
      
      {/* Title - Reduced Size */}
      <div className="mb-8 md:mb-10 pl-2 border-l-4 border-[#007BFF]">
         <h3 className="text-lg md:text-2xl font-bold text-black tracking-tight leading-none">
            {language === 'zh' ? '产品价值量化模型：VALUE' : 'Product Value Quantification Model: VALUE'}
         </h3>
      </div>

      <div className="flex flex-row w-full gap-4 md:gap-12 items-end">
        
        {/* Left Labels Column - Compact */}
        <div className="flex flex-col justify-between py-1 h-[260px] md:h-[320px] w-1/3 md:w-1/4">
           {tiers.map((tier) => (
              <div key={tier.level} className="flex flex-col justify-center h-10 md:h-12 border-b border-dashed border-gray-100 last:border-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs md:text-sm font-bold text-gray-400 font-mono">{tier.level}</span>
                    <span className="text-sm md:text-base font-bold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">{tier.label}</span>
                  </div>
              </div>
           ))}
        </div>

        {/* Right Pyramid Column - Stepped Pyramid */}
        <div className="flex-1 flex flex-col justify-between py-1 h-[260px] md:h-[320px] w-full items-center">
            {tiers.map((tier, index) => (
                <div key={tier.level} className="w-full flex justify-center items-center h-10 md:h-12">
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                        className={`h-full flex items-center justify-center ${tier.width}`}
                    >
                         <div 
                            className={`h-full w-full rounded-[3px] flex items-center justify-center shadow-sm ${tier.shadow} hover:brightness-105 transition-all cursor-default`}
                            style={{ backgroundColor: tier.color }}
                         >
                             <span className={`flex items-center justify-center h-full font-semibold text-xs md:text-sm tracking-wide ${tier.textColor}`}>
                                {tier.text}
                             </span>
                         </div>
                    </motion.div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}
