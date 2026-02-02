import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

export function DigitModelDiagram() {
  const { t } = useLanguage();
  // Safe access to nested properties
  const digitModel = t('tech.digitModel') || {};
  const labels = digitModel.labels || {};

  return (
    <div className="w-full bg-white rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
      {/* Header Section */}
      <div className="mb-12">
        <h3 className="text-[#0085FF] text-3xl font-bold mb-2 tracking-tight">
          {digitModel.title || "DIGIT Model"}
        </h3>
        <p className="text-[#1A1A1A] text-lg font-medium opacity-80">
          {digitModel.subtitle || "Digital Implementation & Landing Model"}
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        
        {/* === STRATEGIC LAYER (TOP) === */}
        <div className="flex flex-col items-center relative z-10">
          
          {/* Definition Node */}
          <div className="w-64 h-20 bg-[#E1F5FE] rounded-lg border-2 border-[#1A1A1A] flex flex-col items-center justify-center mb-8 relative z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
            <span className="font-bold text-[#1A1A1A] text-lg">{labels.definition || "Definition"}</span>
            <span className="text-[#1A1A1A] text-sm opacity-70">{labels.definitionZh || "目标定义"}</span>
            
            {/* Connector Line Start */}
            <div className="absolute -bottom-8 left-1/2 w-[2px] h-8 bg-[#1A1A1A] -translate-x-1/2"></div>
          </div>

          {/* Branching Connector */}
          <div className="relative w-full max-w-2xl h-8 mb-2">
            {/* Horizontal Bar */}
            <div className="absolute top-0 left-[16%] right-[16%] h-[2px] bg-[#1A1A1A]"></div>
            
            {/* Vertical Drops */}
            <div className="absolute top-0 left-[16%] w-[2px] h-6 bg-[#1A1A1A]"></div> {/* Left */}
            <div className="absolute top-0 left-1/2 w-[2px] h-6 bg-[#1A1A1A] -translate-x-1/2"></div> {/* Center */}
            <div className="absolute top-0 right-[16%] w-[2px] h-6 bg-[#1A1A1A]"></div> {/* Right */}
            
            {/* Connection styles (rounded corners simulation could be added but sticking to clean lines for now as per simple CSS) */}
          </div>

          {/* Indicators Row */}
          <div className="grid grid-cols-3 gap-8 w-full max-w-3xl mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-[#E8F5E9] rounded border-2 border-[#1A1A1A] flex flex-col items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]">
                 <span className="font-bold text-[#1A1A1A] text-sm md:text-base">{labels.indicator || "Indicator"}</span>
                 <span className="text-[#1A1A1A] text-xs opacity-70">{labels.indicatorZh || "关键指标"}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Divider Line */}
        <div className="w-full h-[1.5px] bg-[#1A1A1A] opacity-20 mb-12"></div>

        {/* === OPERATIONAL LAYER (BOTTOM) === */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 relative">
          
          {/* Grid (Workflow) Box */}
          <div className="w-56 h-72 bg-[#EDE7F6] rounded-xl border-2 border-[#1A1A1A] flex flex-col items-center pt-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] relative z-10">
            <span className="font-bold text-[#1A1A1A] text-xl mb-1">{labels.workflow || "Grid"}</span>
            <span className="text-[#1A1A1A] text-sm opacity-60">{labels.workflowZh || "工作流"}</span>
            {/* Content lines simulation */}
            <div className="mt-8 space-y-3 w-2/3 opacity-30">
              <div className="h-2 bg-[#1A1A1A] rounded-full w-full"></div>
              <div className="h-2 bg-[#1A1A1A] rounded-full w-4/5"></div>
              <div className="h-2 bg-[#1A1A1A] rounded-full w-full"></div>
              <div className="h-2 bg-[#1A1A1A] rounded-full w-3/4"></div>
            </div>
          </div>

          {/* Center Iteration Circle Container */}
          <div className="relative w-48 h-48 mx-4 flex items-center justify-center shrink-0 z-20">
             
             {/* Arrows passing through/behind */}
             <div className="absolute inset-0 flex flex-col justify-center items-center gap-12 pointer-events-none">
                {/* Top Arrow (Right to Left) */}
                <div className="w-[140%] h-[2px] bg-[#1A1A1A] relative -translate-y-4">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 border-l-2 border-b-2 border-[#1A1A1A] rotate-45 transform origin-center"></div>
                </div>
                
                {/* Bottom Arrow (Left to Right) */}
                <div className="w-[140%] h-[2px] bg-[#1A1A1A] relative translate-y-4">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-r-2 border-t-2 border-[#1A1A1A] rotate-45 transform origin-center"></div>
                </div>
             </div>

             {/* The Circle */}
             <div className="w-40 h-40 bg-[#FFF9C4] rounded-full border-2 border-[#1A1A1A] flex flex-col items-center justify-center shadow-[0px_4px_10px_rgba(0,0,0,0.1)] relative">
                <span className="font-bold text-[#1A1A1A] text-lg">{labels.iteration || "Iteration"}</span>
                <span className="text-[#1A1A1A] text-xs opacity-70">{labels.iterationZh || "持续迭代"}</span>
                
                {/* Cycling Arrows Icon inside */}
                <svg className="w-16 h-16 text-[#1A1A1A] opacity-10 absolute animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeOpacity="0.2"/>
                  <path d="M12 6v6l4 2" />
                </svg>
             </div>
          </div>

          {/* Tools Box */}
          <div className="w-56 h-72 bg-[#EDE7F6] rounded-xl border-2 border-[#1A1A1A] flex flex-col items-center pt-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] relative z-10">
            <span className="font-bold text-[#1A1A1A] text-xl mb-1">{labels.tools || "Tools"}</span>
            <span className="text-[#1A1A1A] text-sm opacity-60">{labels.toolsZh || "工具集"}</span>
             {/* Tools Icons simulation */}
             <div className="mt-8 grid grid-cols-2 gap-3 opacity-30">
               <div className="w-8 h-8 rounded bg-[#1A1A1A]"></div>
               <div className="w-8 h-8 rounded bg-[#1A1A1A]"></div>
               <div className="w-8 h-8 rounded bg-[#1A1A1A]"></div>
               <div className="w-8 h-8 rounded bg-[#1A1A1A]"></div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
