interface MealSearchResult {
	meals: any[];
}

interface CategoryListResult {
	meals: Array<{
		strCategory: string;
	}>;
}

interface AreaListResult {
	meals: Array<{
		strArea: string;
	}>;
}

interface IngredientListResult {
	meals: Array<{
		strIngredient: string;
	}>;
}

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMealsByName = async (name: string) => {
	try {
		const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
		const data: MealSearchResult = await response.json();
		return data.meals || [];
	} catch (error) {
		console.error('Error searching meals by name:', error);
		return [];
	}
};

export const searchMealsByFirstLetter = async (letter: string) => {
	try {
		const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);
		const data: MealSearchResult = await response.json();
		return data.meals || [];
	} catch (error) {
		console.error('Error searching meals by letter:', error);
		return [];
	}
};

export const getMealById = async (id: string) => {
	try {
		const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
		const data: MealSearchResult = await response.json();
		return data.meals?.[0] || null;
	} catch (error) {
		console.error('Error fetching meal by ID:', error);
		return null;
	}
};

export const getRandomMeal = async () => {
	try {
		const response = await fetch(`${BASE_URL}/random.php`);
		const data: MealSearchResult = await response.json();
		return data.meals?.[0] || null;
	} catch (error) {
		console.error('Error fetching random meal:', error);
		return null;
	}
};

export const fetchRandomRecipe = async (count: number = 6) => {
	try {
		const promises = Array.from({ length: count }, () =>
			fetch(`${BASE_URL}/random.php`).then((res) => res.json())
		);
		const results = await Promise.all(promises);
		return results.map((result) => result.meals[0]);
	} catch (error) {
		console.error('Error fetching random recipes:', error);
		return [];
	}
};

export const fetchCategories = async () => {
	try {
		const response = await fetch(`${BASE_URL}/categories.php`);
		const data = await response.json();
		return data.categories || [];
	} catch (error) {
		console.error('Error fetching categories:', error);
		return [];
	}
};

export const getCategoriesList = async () => {
	try {
		const response = await fetch(`${BASE_URL}/list.php?c=list`);
		const data: CategoryListResult = await response.json();
		return data.meals?.map((item) => item.strCategory) || [];
	} catch (error) {
		console.error('Error fetching categories list:', error);
		return [];
	}
};

export const getAreasList = async () => {
	try {
		const response = await fetch(`${BASE_URL}/list.php?a=list`);
		const data: AreaListResult = await response.json();
		return data.meals?.map((item) => item.strArea) || [];
	} catch (error) {
		console.error('Error fetching areas list:', error);
		return [];
	}
};

export const getIngredientsList = async () => {
	try {
		const response = await fetch(`${BASE_URL}/list.php?i=list`);
		const data: IngredientListResult = await response.json();
		return data.meals?.map((item) => item.strIngredient) || [];
	} catch (error) {
		console.error('Error fetching ingredients list:', error);
		return [];
	}
};

export const filterByIngredient = async (ingredient: string) => {
	try {
		const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
		const data: MealSearchResult = await response.json();
		return data.meals || [];
	} catch (error) {
		console.error('Error filtering by ingredient:', error);
		return [];
	}
};

export const filterByCategory = async (category: string) => {
	try {
		const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
		const data: MealSearchResult = await response.json();
		return data.meals || [];
	} catch (error) {
		console.error('Error filtering by category:', error);
		return [];
	}
};

export const filterByArea = async (area: string) => {
	try {
		const response = await fetch(`${BASE_URL}/filter.php?a=${area}`);
		const data: MealSearchResult = await response.json();
		return data.meals || [];
	} catch (error) {
		console.error('Error filtering by area:', error);
		return [];
	}
};

export const getAllRecipes = async (filters?: {
	category?: string;
	area?: string;
	ingredient?: string;
	search?: string;
	letter?: string;
}) => {
	try {
		let meals: any[] = [];

		if (filters?.search) {
			meals = await searchMealsByName(filters.search);
		} else if (filters?.letter) {
			meals = await searchMealsByFirstLetter(filters.letter);
		} else if (filters?.category) {
			meals = await filterByCategory(filters.category);
		} else if (filters?.area) {
			meals = await filterByArea(filters.area);
		} else if (filters?.ingredient) {
			meals = await filterByIngredient(filters.ingredient);
		} else {
			const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
			const randomLetters = letters.sort(() => Math.random() - 0.5).slice(0, 5);

			const promises = randomLetters.map((letter) => searchMealsByFirstLetter(letter));
			const results = await Promise.all(promises);
			meals = results.flat().slice(0, 100);
		}

		return meals || [];
	} catch (error) {
		console.error('Error getting all recipes:', error);
		return [];
	}
};

export const getMealThumbnail = (url: string, size: 'small' | 'medium' | 'large' = 'medium') => {
	if (!url) return '';

	const baseUrl = url.replace(/\/(small|medium|large)$/, '');
	return `${baseUrl}/${size}`;
};

export const getMealPreview = (url: string) => {
	if (!url) return '';
	return `${url}/preview`;
};
