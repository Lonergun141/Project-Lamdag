import { useState, useEffect } from 'react';
import {
  getCategoriesList,
  getAreasList,
  getIngredientsList,
} from '@/api/recipeServices';
import { FilterOptions } from '@/types/recipes';

export const useFilterOptions = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    areas: [],
    ingredients: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [categories, areas, ingredients] = await Promise.all([
          getCategoriesList(),
          getAreasList(),
          getIngredientsList(),
        ]);

        setFilterOptions({
          categories,
          areas,
          ingredients,
        });
      } catch (error) {
        console.error('Error loading filter options:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFilterOptions();
  }, []);

  return { filterOptions, loading };
};