import { useState } from 'react';

interface UseTooltipReturn {
  showTooltip: (key: string) => void;
  hideTooltip: (key: string) => void;
  isTooltipVisible: (key: string) => boolean;
}

export const useTooltip = (): UseTooltipReturn => {
  const [tooltips, setTooltips] = useState<Record<string, boolean>>({});

  const showTooltip = (key: string): void => {
    setTooltips(prev => ({ ...prev, [key]: true }));
  };

  const hideTooltip = (key: string): void => {
    setTooltips(prev => ({ ...prev, [key]: false }));
  };

  const isTooltipVisible = (key: string): boolean => {
    return Boolean(tooltips[key]);
  };

  return {
    showTooltip,
    hideTooltip,
    isTooltipVisible
  };
};
