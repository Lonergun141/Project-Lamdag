'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import { Categories } from '@/types/recipes';
import { fetchCategories } from '@/api/recipeServices';
import { 
  createInfiniteArray, 
  shouldResetInfiniteScroll, 
  getInfiniteScrollIndex,
  CAROUSEL_CONFIG 
} from '@/utils/carousel';
import { UseCarouselReturn } from '@/types/recipes';


export const useCarousel = (): UseCarouselReturn => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [duplicatedCategories, setDuplicatedCategories] = useState<Categories[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchCategories();
        
        if (!isMounted) return;

        if (data?.length) {
          setCategories(data);
          setDuplicatedCategories(createInfiniteArray(data));

          setCurrentIndex(data.length);
        } else {
          setError('No categories found');
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load categories');
          console.error('Error loading categories:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);


  useEffect(() => {
    if (!categories.length || isLoading) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, CAROUSEL_CONFIG.AUTO_PLAY_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [categories.length, isLoading]);

 
  useEffect(() => {
    if (shouldResetInfiniteScroll(currentIndex, categories.length)) {
      const timeoutId = setTimeout(() => {
        setCurrentIndex(categories.length);
      }, CAROUSEL_CONFIG.TRANSITION_DURATION);

      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, categories.length]);


  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => prev + 1);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(getInfiniteScrollIndex(index, categories.length));
  }, [categories.length]);

  
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    categories,
    duplicatedCategories,
    currentIndex,
    isLoading,
    error,
    nextSlide,
    goToSlide,
  };
};