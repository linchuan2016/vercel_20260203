import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'motion/react';

export function ValueModelDiagram() {
  const { t } = useLanguage();
  const valueModel = t('tech.valueModel') || {};
  const labels = valueModel.labels || {};

  const layers = [
    { level: 'L5', label: labels.l5, desc: labels.l5Desc, color: 'bg-[#007AFF]', width: 'w-1/4' },
    { level: 'L4', label: labels.l4, desc: labels.l4Desc, color: 'bg-[#409CFF]', width: 'w-2/5' },
    { level: 'L3', label: labels.l3, desc: labels.l3Desc, color: 'bg-[#80BDFF]', width: 'w-1/2' },
    { level: 'L2', label: labels.l2, desc: labels.l2Desc, color: 'bg-[#B3D9FF]', width: 'w-3/4' },
    { level: 'L1', label: labels.l1, desc: labels.l1Desc, color: 'bg-[#F0F8FF]', width: 'w-full' },
  ];

  return (
    <div className="w-full aspect-square md:aspect-[4/3] bg-white rounded-xl shadow-sm border border-neutral-200 p-8 md:p-12 relative overflow-hidden flex flex-col">
      {/* Title */}
      <div className="absolute top-8 left-8">
        <h3 className="text-xl md:text-2xl font-bold text-black tracking-tight leading-tight">
            {valueModel.subtitle?.split('：')[0] || "产品价值量化模型：VALUE"}
        </h3>
      </div>

      <div className="flex-1 flex flex-col justify-end gap-3 md:gap-4 mt-16 md:mt-12">
        {layers.map((layer, index) => (
          <div key={layer.level} className="flex items-center w-full">
            {/* Left Side Label */}
            <div className="w-24 md:w-32 flex flex-col items-end pr-4 text-right">
                <span className="text-sm md:text-base text-gray-900 font-medium">
                  <span className="font-bold">{layer.label}</span>
                </span>
                <span className="text-xs text-gray-500 font-medium">{layer.level}</span>
            </div>

            {/* Pyramid Block Container */}
            <div className="flex-1 flex justify-center">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "100%", opacity: 1 }} // Initially animate to container width, but we restrict it with CSS classes below
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${layer.color} ${layer.width} h-10 md:h-12 rounded-sm flex items-center justify-center shadow-sm relative group`}
              >
                  {/* Text inside block */}
                  <span className={`text-xs md:text-sm font-medium whitespace-nowrap px-2 ${index === 4 ? 'text-gray-600' : 'text-white'}`}>
                    {layer.desc}
                  </span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
