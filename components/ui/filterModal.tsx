// components/ui/FilterModal.tsx
import { useState, useEffect } from 'react';
import { X, Filter } from 'lucide-react';
import { FilterKey, FilterOptions } from '@/types/recipes';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    category: string;
    area: string;
    ingredient: string;
  };
  onApplyFilters: (filters: { category: string; area: string; ingredient: string }) => void;
  filterOptions: FilterOptions;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  filterOptions
}) => {
  const [localFilters, setLocalFilters] = useState({
    category: '',
    area: '',
    ingredient: '',
  });

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, filters]);

  const handleLocalFilterChange = (key: FilterKey, value: string) => {
    if (key === 'clear') {
      setLocalFilters({
        category: '',
        area: '',
        ingredient: '',
      });
      return;
    }

    setLocalFilters(prev => ({
      ...prev,
      [key]: prev[key as keyof typeof prev] === value ? '' : value,
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleCancel = () => {
    setLocalFilters(filters);
    onClose();
  };

  if (!isOpen) return null;

  const hasChanges = JSON.stringify(localFilters) !== JSON.stringify(filters);
  const filterCount = [localFilters.category, localFilters.area, localFilters.ingredient].filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50">

      <div 
        className="absolute inset-0 bg-black/50"
        onClick={handleCancel}
      />
      

      <div className="relative w-full h-full bg-white flex flex-col">
        

        <div className="border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-[color:var(--primary)]" />
            <h1 className="text-xl font-semibold text-gray-900 font-[family-name:var(--font-pd)]">
              Filter Recipes
            </h1>
            {filterCount > 0 && (
              <span className="bg-[color:var(--primary)] text-white text-sm px-2 py-1 font-medium">
                {filterCount}
              </span>
            )}
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

  
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-10">
            
            {/* Categories */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 font-[family-name:var(--font-pd)]">
                  Categories
                </h2>
                {localFilters.category && (
                  <button
                    onClick={() => handleLocalFilterChange('category', localFilters.category)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filterOptions.categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleLocalFilterChange('category', category)}
                    className={`p-3 text-sm text-left border transition-colors font-[family-name:var(--font-crimson)] ${
                      localFilters.category === category
                        ? 'border-[color:var(--primary)] bg-[color:var(--primary)]/5 text-[color:var(--primary)]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Areas */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 font-[family-name:var(--font-pd)]">
                  Cuisines & Areas
                </h2>
                {localFilters.area && (
                  <button
                    onClick={() => handleLocalFilterChange('area', localFilters.area)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filterOptions.areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => handleLocalFilterChange('area', area)}
                    className={`p-3 text-sm text-left border transition-colors font-[family-name:var(--font-crimson)] ${
                      localFilters.area === area
                        ? 'border-[color:var(--primary)] bg-[color:var(--primary)]/5 text-[color:var(--primary)]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 font-[family-name:var(--font-pd)]">
                  Main Ingredients
                </h2>
                {localFilters.ingredient && (
                  <button
                    onClick={() => handleLocalFilterChange('ingredient', localFilters.ingredient)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filterOptions.ingredients.map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => handleLocalFilterChange('ingredient', ingredient)}
                    className={`p-3 text-sm text-left border transition-colors font-[family-name:var(--font-crimson)] capitalize ${
                      localFilters.ingredient === ingredient
                        ? 'border-[color:var(--primary)] bg-[color:var(--primary)]/5 text-[color:var(--primary)]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {ingredient.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={() => handleLocalFilterChange('clear', '')}
              className="text-gray-600 hover:text-gray-800 font-[family-name:var(--font-crimson)]"
              disabled={filterCount === 0}
            >
              Clear All
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-[family-name:var(--font-crimson)]"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyFilters}
                disabled={!hasChanges}
                className={`px-6 py-2 font-[family-name:var(--font-crimson)] ${
                  hasChanges
                    ? 'bg-[color:var(--primary)] hover:bg-[#f59e0b] text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;