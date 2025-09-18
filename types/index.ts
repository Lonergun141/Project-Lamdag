export interface TooltipState {
  search: boolean;
  menu: boolean;
}

export interface TooltipButtonProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  showTooltip: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  className?: string;
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  items?: MenuItem[];
}

