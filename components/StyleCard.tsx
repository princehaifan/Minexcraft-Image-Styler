import React from 'react';
import type { Style } from '../types';

interface StyleCardProps {
  style: Style;
  isSelected: boolean;
  onSelect: (style: Style) => void;
}

export const StyleCard: React.FC<StyleCardProps> = ({ style, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(style)}
      className={`relative rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 transform hover:scale-105 ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white' : 'ring-1 ring-gray-300'}`}
    >
      <img src={style.imageUrl} alt={style.name} className="w-full h-24 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-2 w-full">
        <h4 className="text-sm font-semibold text-white truncate mb-1">{style.name}</h4>
        <span className="inline-block bg-white/20 text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
          {style.category}
        </span>
      </div>
      {isSelected && (
        <div className="absolute inset-0 bg-indigo-600/60 flex items-center justify-center transition-opacity duration-200">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        </div>
      )}
    </div>
  );
};