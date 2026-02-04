import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'motion/react';

export function LeadModelDiagram() {
  const { t, language } = useLanguage();
  const leadModel = t('tech.leadModel') || {};
  const labels = leadModel.labels || {};
  
  // Helper to safely get keywords
  const getKeywords = (key: string) => labels[key] || [];

  return (
    <div className="w-full bg-white rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl relative">
      {/* Header Section */}
      <div className="mb-8 relative z-10">
        <h3 className="text-[#007BFF] text-2xl md:text-3xl font-bold mb-2 tracking-tight">
          {language === 'zh' ? '数字化策略：LEAD 模型' : 'Digitalization Strategy: LEAD Model'}
        </h3>
      </div>

      {/* Main Diagram Container */}
      <div className="relative w-full max-w-3xl mx-auto" style={{ aspectRatio: '1' }}>
        
        {/* Coordinate System (Axes) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Horizontal Axis */}
          <div className="absolute w-full h-[2px] bg-black top-1/2 -translate-y-1/2">
            {/* Left Arrow */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-r-[10px] border-r-black border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
            {/* Right Arrow */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[10px] border-l-black border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
          </div>
          {/* Vertical Axis */}
          <div className="absolute h-full w-[2px] bg-black left-1/2 -translate-x-1/2">
            {/* Top Arrow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-b-[10px] border-b-black border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent"></div>
            {/* Bottom Arrow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-[10px] border-t-black border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent"></div>
          </div>
        </div>

        {/* Axis Labels */}
        <div className="absolute top-2 left-1/2 ml-3 text-[#007BFF] font-semibold text-sm md:text-base pointer-events-none">
          {labels.yAxisTop}
        </div>
        <div className="absolute bottom-2 left-1/2 ml-3 text-[#007BFF] font-semibold text-sm md:text-base pointer-events-none">
          {labels.yAxisBottom}
        </div>
        <div className="absolute left-2 top-1/2 -mt-8 text-[#007BFF] font-semibold text-sm md:text-base pointer-events-none">
          {labels.xAxisLeft}
        </div>
        <div className="absolute right-2 top-1/2 -mt-8 text-[#007BFF] font-semibold text-sm md:text-base pointer-events-none text-right">
          {labels.xAxisRight}
        </div>

        {/* Quadrant 1: Top-Left (Layout / 0-1) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`absolute ${language === 'zh' ? 'left-[15%]' : 'left-[10%]'} top-[8%] flex flex-col items-center`}
        >
          {/* Badge */}
          <div className="bg-[#007BFF] text-white px-3 py-1 rounded-lg mb-6 shadow-sm">
            <span className="font-bold text-sm">0-1</span>
          </div>
          {/* Circle */}
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#E3F7FF] flex items-center justify-center shadow-md relative">
            <span className="text-black font-bold text-base md:text-lg text-center px-2">{labels.layoutZh}</span>
            {/* English Label */}
            <span className="absolute -left-16 md:-left-20 top-1/2 -translate-y-1/2 text-black font-normal text-xs md:text-sm whitespace-nowrap">
              {labels.layout}
            </span>
          </div>
          {/* Keywords */}
          <div className="flex gap-2 mt-3">
            <span className="bg-white/90 px-2 py-1 rounded text-xs text-gray-700 border border-gray-200">
              {getKeywords('q1Keywords')[0]}
            </span>
            <span className="bg-white/90 px-2 py-1 rounded text-xs text-gray-700 border border-gray-200">
              {getKeywords('q1Keywords')[1]}
            </span>
          </div>
        </motion.div>

        {/* Quadrant 2: Top-Right (Evolve / 1-10) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`absolute ${language === 'zh' ? 'right-[15%]' : 'right-[10%]'} top-[8%] flex flex-col items-center`}
        >
          {/* Badge */}
          <div className="bg-[#007BFF] text-white px-3 py-1 rounded-lg mb-6 shadow-sm">
            <span className="font-bold text-sm">1-10</span>
          </div>
          {/* Circle */}
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#E8F9EE] flex items-center justify-center shadow-md relative">
            <span className="text-black font-bold text-base md:text-lg text-center px-2">{labels.evolveZh}</span>
            {/* English Label */}
            <span className="absolute -right-16 md:-right-20 top-1/2 -translate-y-1/2 text-black font-normal text-xs md:text-sm whitespace-nowrap">
              {labels.evolve}
            </span>
          </div>
          {/* Keywords */}
          <div className="flex gap-2 mt-3">
            <span className="bg-white/90 px-2 py-1 rounded text-xs text-gray-700 border border-gray-200">
              {getKeywords('q2Keywords')[0]}
            </span>
            <span className="bg-white/90 px-2 py-1 rounded text-xs text-gray-700 border border-gray-200">
              {getKeywords('q2Keywords')[1]}
            </span>
          </div>
        </motion.div>

        {/* Quadrant 3: Bottom-Left (Audience / 0-100) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="absolute left-[15%] bottom-[8%] flex flex-col items-center"
        >
          {/* Circle */}
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#FFEBFA] flex items-center justify-center shadow-md relative mb-3">
            <span className="text-black font-bold text-base md:text-lg text-center px-2">{labels.audienceZh}</span>
            {/* English Label */}
            <span className="absolute -left-16 md:-left-20 top-1/2 -translate-y-1/2 text-black font-normal text-xs md:text-sm whitespace-nowrap">
              {labels.audience}
            </span>
          </div>
          {/* Keywords */}
          <div className="flex gap-2 mb-6">
            <span className="bg-white/90 px-2 py-1 rounded text-xs text-gray-700 border border-gray-200">
              {getKeywords('q3Keywords')[0]}
            </span>
            <span className="bg-white/90 px-2 py-1 rounded text-xs text-gray-700 border border-gray-200">
              {getKeywords('q3Keywords')[1]}
            </span>
          </div>
          {/* Badge */}
          <div className="bg-[#007BFF] text-white px-3 py-1 rounded-lg shadow-sm">
            <span className="font-bold text-sm">0-100</span>
          </div>
        </motion.div>

        {/* Quadrant 4: Bottom-Right (Digitalize / 10-100) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className={`absolute ${language === 'zh' ? 'right-[17%]' : 'right-[17%]'} bottom-[8%] flex flex-col items-center`}
        >
          {/* Circle */}
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#FFF7E6] flex items-center justify-center shadow-md relative mb-3">
            <span className="text-black font-bold text-base md:text-lg text-center px-2">{labels.digitalizeZh}</span>
            {/* English Label */}
            <span className="absolute -right-16 md:-right-20 top-1/2 -translate-y-1/2 text-black font-normal text-xs md:text-sm whitespace-nowrap">
              {labels.digitalize}
            </span>
          </div>
          {/* Keywords */}
          <div className="flex gap-2 mb-6">
            <span className="bg-white/90 px-2 py-1 rounded text-xs text-gray-700 border border-gray-200">
              {getKeywords('q4Keywords')[0]}
            </span>
            <span className="bg-white/90 px-2 py-1 rounded text-xs text-gray-700 border border-gray-200">
              {getKeywords('q4Keywords')[1]}
            </span>
          </div>
          {/* Badge */}
          <div className="bg-[#007BFF] text-white px-3 py-1 rounded-lg shadow-sm">
            <span className="font-bold text-sm">10-100</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}