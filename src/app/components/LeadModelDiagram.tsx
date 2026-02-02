import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'motion/react';

export function LeadModelDiagram() {
  const { t, language } = useLanguage();
  const leadModel = t('tech.leadModel') || {};
  const labels = leadModel.labels || {};
  
  // Helper to safely get keywords
  const getKeywords = (key: string) => labels[key] || [];

  const AxisLabel = ({ text, isHorizontal }: { text: string, isHorizontal?: boolean }) => {
    if (!text) return null;
    const parts = text.split(' ');
    // Default fallback
    if (parts.length < 2) return <span className="font-bold text-black">{text}</span>;

    // Logic: 
    // EN: "High Certainty" -> "High" (Blue), "Certainty" (Black)
    // ZH: "确定性 高" -> "确定性" (Black), "高" (Blue)
    
    if (language === 'zh') {
        return (
            <span className="font-bold text-sm whitespace-nowrap">
                <span className="text-black">{parts[0]}</span><span className="text-blue-600">{parts[1]}</span>
            </span>
        );
    } else {
         return (
            <span className="font-bold text-sm whitespace-nowrap">
                <span className="text-blue-600">{parts[0]}</span> <span className="text-black">{parts[1]}</span>
            </span>
        );
    }
  };

  return (
    <div className="w-full aspect-square md:aspect-[4/3] bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-12 relative overflow-hidden flex flex-col justify-center items-center font-sans">
      
      {/* Title */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
         <h3 className="text-xl md:text-2xl font-bold text-black tracking-tight">
            {language === 'zh' ? '数字化策略：LEAD模型' : 'Digital Strategy: LEAD Model'}
         </h3>
      </div>

      {/* Main Grid Container */}
      <div className="relative w-full max-w-2xl aspect-square grid grid-cols-2 grid-rows-2">
      
        {/* AXES - Absolute centered */}
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
            {/* Vertical Line */}
            <div className="h-[90%] w-0.5 bg-black relative flex flex-col justify-between items-center">
                {/* Top Arrow */}
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-black absolute -top-1"></div>
                 {/* Bottom Arrow */}
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-black absolute -bottom-1"></div>
                
                {/* Labels */}
                <div className="absolute -top-8">
                   <AxisLabel text={labels.yAxisTop} />
                </div>
                <div className="absolute -bottom-8">
                   <AxisLabel text={labels.yAxisBottom} />
                </div>
            </div>

            {/* Horizontal Line */}
            <div className="w-[90%] h-0.5 bg-black absolute flex flex-row justify-between items-center">
                {/* Left Arrow */}
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-black absolute -left-1"></div>
                {/* Right Arrow */}
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-black absolute -right-1"></div>

                 {/* Labels */}
                <div className="absolute -left-16 md:-left-20">
                   <AxisLabel text={labels.xAxisLeft} />
                </div>
                <div className="absolute -right-16 md:-right-20">
                   <AxisLabel text={labels.xAxisRight} />
                </div>
            </div>
        </div>

        {/* Quadrant 1: Top Left (Layout) */}
        <div className="relative p-2 md:p-4 flex flex-col items-center justify-center border-r border-b border-transparent">
            {/* Badge */}
            <div className="absolute top-0 left-0 md:top-4 md:left-4 bg-[#0052CC] text-white font-bold px-3 py-1 text-xs md:text-sm">
                {labels.q1Sub}
            </div>
            
            <div className="flex items-center gap-2 md:gap-6 mb-4 md:mb-8">
                {/* Side Text */}
                <span className="text-gray-700 font-medium text-xs md:text-base">{labels.layout}</span>
                {/* Circle */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-20 h-20 md:w-32 md:h-32 bg-[#E0F7FA] rounded-full flex items-center justify-center shadow-sm z-10"
                >
                    <span className="font-bold text-black text-xs md:text-lg text-center px-2">{labels.layoutZh}</span>
                </motion.div>
            </div>
            
            {/* Bottom Keywords */}
            <div className="flex gap-4 md:gap-8 text-xs md:text-sm text-gray-800 font-medium">
                <span>{getKeywords('q1Keywords')[0]}</span>
                <span>{getKeywords('q1Keywords')[1]}</span>
            </div>
        </div>

        {/* Quadrant 2: Top Right (Evolve) */}
        <div className="relative p-2 md:p-4 flex flex-col items-center justify-center border-l border-b border-transparent">
             {/* Badge */}
            <div className="absolute top-0 right-0 md:top-4 md:right-4 bg-[#0052CC] text-white font-bold px-3 py-1 text-xs md:text-sm">
                {labels.q2Sub}
            </div>

            <div className="flex items-center gap-2 md:gap-6 mb-4 md:mb-8">
                {/* Circle */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="w-20 h-20 md:w-32 md:h-32 bg-[#E8F5E9] rounded-full flex items-center justify-center shadow-sm z-10"
                >
                    <span className="font-bold text-black text-xs md:text-lg text-center px-2">{labels.evolveZh}</span>
                </motion.div>
                 {/* Side Text */}
                <span className="text-gray-700 font-medium text-xs md:text-base">{labels.evolve}</span>
            </div>

             {/* Bottom Keywords */}
            <div className="flex gap-4 md:gap-8 text-xs md:text-sm text-gray-800 font-medium">
                <span>{getKeywords('q2Keywords')[0]}</span>
                <span>{getKeywords('q2Keywords')[1]}</span>
            </div>
        </div>

        {/* Quadrant 3: Bottom Left (Audience) */}
        <div className="relative p-2 md:p-4 flex flex-col items-center justify-center border-r border-t border-transparent">
             {/* Badge */}
            <div className="absolute bottom-0 left-0 md:bottom-4 md:left-4 bg-[#0052CC] text-white font-bold px-3 py-1 text-xs md:text-sm">
                {labels.q3Sub}
            </div>

             <div className="flex items-center gap-2 md:gap-6 mb-4 md:mb-8 mt-4">
                {/* Side Text */}
                <span className="text-gray-700 font-medium text-xs md:text-base">{labels.audience}</span>
                {/* Circle */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="w-20 h-20 md:w-32 md:h-32 bg-[#FCE4EC] rounded-full flex items-center justify-center shadow-sm z-10"
                >
                    <span className="font-bold text-black text-xs md:text-lg text-center px-2">{labels.audienceZh}</span>
                </motion.div>
            </div>

            {/* Bottom Keywords */}
            <div className="flex gap-4 md:gap-8 text-xs md:text-sm text-gray-800 font-medium">
                <span>{getKeywords('q3Keywords')[0]}</span>
                <span>{getKeywords('q3Keywords')[1]}</span>
            </div>
        </div>

        {/* Quadrant 4: Bottom Right (Digitalize) */}
        <div className="relative p-2 md:p-4 flex flex-col items-center justify-center border-l border-t border-transparent">
             {/* Badge */}
            <div className="absolute bottom-0 right-0 md:bottom-4 md:right-4 bg-[#0052CC] text-white font-bold px-3 py-1 text-xs md:text-sm">
                {labels.q4Sub}
            </div>

             <div className="flex items-center gap-2 md:gap-6 mb-4 md:mb-8 mt-4">
                {/* Circle */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="w-20 h-20 md:w-32 md:h-32 bg-[#FFF3E0] rounded-full flex items-center justify-center shadow-sm z-10"
                >
                    <span className="font-bold text-black text-xs md:text-lg text-center px-2">{labels.digitalizeZh}</span>
                </motion.div>
                 {/* Side Text */}
                <span className="text-gray-700 font-medium text-xs md:text-base">{labels.digitalize}</span>
            </div>

            {/* Bottom Keywords */}
            <div className="flex gap-4 md:gap-8 text-xs md:text-sm text-gray-800 font-medium">
                <span>{getKeywords('q4Keywords')[0]}</span>
                <span>{getKeywords('q4Keywords')[1]}</span>
            </div>
        </div>

      </div>
    </div>
  );
}
