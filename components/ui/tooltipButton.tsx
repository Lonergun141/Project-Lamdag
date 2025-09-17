import React from 'react';
import type { TooltipButtonProps } from '@/types';

const TooltipButton: React.FC<TooltipButtonProps> = ({ 
  icon: Icon, 
  label, 
  showTooltip, 
  onMouseEnter, 
  onMouseLeave, 
  onClick,
  className = ""
}) => {
  return (
    <div className="relative">
      <button
        className={`bg-[color:var(--primary)]/20 backdrop-blur-sm rounded-full p-3 hover:shadow-xl transition-all duration-200 cursor-pointer hover:bg-white group focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] focus:ring-opacity-50 ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        aria-label={label}
        type="button"
      >
        <Icon
          className="text-[color:var(--primary)] group-hover:text-amber-600 transition-colors"
          size={24}
        />
      </button>

      {showTooltip && (
        <div 
          className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg animate-in fade-in zoom-in-95 duration-200"
          role="tooltip"
          aria-hidden="false"
        >
          {label}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
};

export default TooltipButton;
