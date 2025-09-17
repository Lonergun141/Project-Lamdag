'use client';

import React, { useState, useEffect } from 'react';
import { Search, Menu } from 'lucide-react';
import TooltipButton from './tooltipButton';
import SearchModal from './searchModal';
import MenuModal from './menuModal';
import type { TooltipState } from '@/types';

const FloatingActions: React.FC = () => {
  const [tooltips, setTooltips] = useState<TooltipState>({
    search: false,
    menu: false
  });
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);


  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        if (isSearchModalOpen) {
          setIsSearchModalOpen(false);
        }
        if (isMenuModalOpen) {
          setIsMenuModalOpen(false);
        }
      }
    };

    if (isSearchModalOpen || isMenuModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isSearchModalOpen, isMenuModalOpen]);

  const handleTooltip = (type: keyof TooltipState, show: boolean): void => {
    setTooltips(prev => ({ ...prev, [type]: show }));
  };

  const handleSearchClick = (): void => {
    setIsSearchModalOpen(true);
    setTooltips(prev => ({ ...prev, search: false }));
  };

  const handleMenuClick = (): void => {
    setIsMenuModalOpen(true);
    setTooltips(prev => ({ ...prev, menu: false }));
  };

  const closeSearchModal = (): void => {
    setIsSearchModalOpen(false);
  };

  const closeMenuModal = (): void => {
    setIsMenuModalOpen(false);
  };

  return (
    <>

      <div className="fixed top-12 right-12 flex gap-4 z-50">
        <TooltipButton
          icon={Search}
          label="Search"
          showTooltip={tooltips.search}
          onMouseEnter={() => handleTooltip('search', true)}
          onMouseLeave={() => handleTooltip('search', false)}
          onClick={handleSearchClick}
        />
        
        <TooltipButton
          icon={Menu}
          label="Menu"
          showTooltip={tooltips.menu}
          onMouseEnter={() => handleTooltip('menu', true)}
          onMouseLeave={() => handleTooltip('menu', false)}
          onClick={handleMenuClick}
        />
      </div>

     
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={closeSearchModal} 
      />

    
      <MenuModal 
        isOpen={isMenuModalOpen} 
        onClose={closeMenuModal} 
      />
    </>
  );
};

export default FloatingActions;
