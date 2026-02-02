import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

export function PvipModelDiagram() {
  const { t } = useLanguage();
  const pvipModel = t('tech.pvipModel') || {};
  const labels = pvipModel.labels || {};

  return (
    <div className="w-full bg-white rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl relative">
       {/* Header Section */}
       <div className="mb-12 relative z-10">
        <h3 className="text-[#007BFF] text-3xl font-bold mb-2 tracking-tight">
          {pvipModel.title || "PVIP迭代法"}
        </h3>
        <p className="text-black text-sm md:text-base font-normal opacity-80 max-w-lg">
          {pvipModel.desc || "A product iteration framework balancing Pain, Value, Iteration, and Priority."}
        </p>
      </div>

      {/* Diagram Container */}
      <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
        
        {/* SVG Connecting Arrows (Background Layer) */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" stroke="#4A4A4A" strokeWidth="2">
            {/* Top-Right Arc */}
            <path d="M 230 60 A 130 130 0 0 1 340 170" markerEnd="url(#arrowhead)" />
            {/* Right-Bottom Arc */}
            <path d="M 340 230 A 130 130 0 0 1 230 340" markerEnd="url(#arrowhead)" />
            {/* Bottom-Left Arc */}
            <path d="M 170 340 A 130 130 0 0 1 60 230" markerEnd="url(#arrowhead)" />
            {/* Left-Top Arc */}
            <path d="M 60 170 A 130 130 0 0 1 170 60" markerEnd="url(#arrowhead)" />

            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#4A4A4A" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* --- Circles (Nodes) --- */}
        
        {/* Top: Pain Point (Blue) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 md:w-32 md:h-32 bg-[#BEE7FF] rounded-full flex flex-col items-center justify-center shadow-md z-10">
          <span className="text-black font-bold text-lg md:text-xl">{labels.pain || "痛点"}</span>
          <span className="text-black/60 text-xs mt-1 font-medium">Pain Point</span>
        </div>

        {/* Right: Value (Green) */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-28 h-28 md:w-32 md:h-32 bg-[#C2FFD8] rounded-full flex flex-col items-center justify-center shadow-md z-10">
          <span className="text-black font-bold text-lg md:text-xl">{labels.value || "价值"}</span>
          <span className="text-black/60 text-xs mt-1 font-medium">Value</span>
        </div>

        {/* Bottom: Iteration (Blue) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-28 md:w-32 md:h-32 bg-[#BEE7FF] rounded-full flex flex-col items-center justify-center shadow-md z-10">
          <span className="text-black font-bold text-lg md:text-xl">{labels.iteration || "迭代"}</span>
          <span className="text-black/60 text-xs mt-1 font-medium">Iteration</span>
        </div>

        {/* Left: Priority (Green) */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-28 h-28 md:w-32 md:h-32 bg-[#C2FFD8] rounded-full flex flex-col items-center justify-center shadow-md z-10">
          <span className="text-black font-bold text-lg md:text-xl">{labels.priority || "优先级"}</span>
          <span className="text-black/60 text-xs mt-1 font-medium">Priority</span>
        </div>

      </div>
    </div>
  );
}
