import { useState, useEffect } from 'react';
import { getAllRecipes } from '@/api/recipeServices';
import { Recipe } from '@/types/recipes';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRecipes = async (params?: any) => {
    setLoading(true);
    try {
      const data = await getAllRecipes(params);
      setRecipes(data);
      setFilteredRecipes(data);
      return data;
    } catch (error) {
      console.error('Error loading recipes:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadInitialRecipes = async () => {
    setLoading(true);
    try {
      const data = await getAllRecipes();
      setRecipes(data);
      setFilteredRecipes(data);
      return data;
    } catch (error) {
      console.error('Error loading initial recipes:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadInitialRecipes();
  }, []);

  return {
    recipes,
    filteredRecipes,
    loading,
    loadRecipes,
    loadInitialRecipes,
    setFilteredRecipes
  };
};