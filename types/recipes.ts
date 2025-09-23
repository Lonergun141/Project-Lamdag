export interface Recipe {
	idMeal: string;
	strMeal: string;
	strMealThumb: string;
	strCategory: string;
	strArea: string;
	strInstructions: string;
	strTags: string;
	strYoutube: string;
	[key: string]: any;
}

export interface FilterOptions {
	categories: string[];
	areas: string[];
	ingredients: string[];
}

export interface Categories {
	idCategory: string;
	strCategory: string;
	strCategoryThumb: string;
	strCategoryDescription: string;
}

export interface UseCarouselReturn {
	categories: Categories[];
	duplicatedCategories: Categories[];
	currentIndex: number;
	isLoading: boolean;
	error: string | null;
	nextSlide: () => void;
	goToSlide: (index: number) => void;
}

export type FilterKey = 'category' | 'area' | 'ingredient' | 'clear';