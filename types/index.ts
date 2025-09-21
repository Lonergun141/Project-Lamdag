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


export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startIndex: number;
  endIndex: number;
  totalItems: number;
}

export interface Filters {
  category: string;
  area: string;
  ingredient: string;
}

export interface FilterParams {
  search?: string;
  category?: string;
  area?: string;
  ingredient?: string;
}
