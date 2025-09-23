'use client';

import { useState, useEffect } from 'react';
import { X, Filter, Search } from 'lucide-react';
import RecipeCard from '@/components/ui/recipeCard';
import LoadingGrid from '@/components/ui/loaders';
import Pagination from '@/components/ui/pagination';
import FilterModal from '@/components/ui/filterModal';
import { useRecipes } from '@/hooks/useRecipe';
import { useFilterOptions } from '@/hooks/useFilterOptions';
import { usePagination } from '@/hooks/usePagination';
import { useDebounce } from '@/hooks/useDebounce';
import { Filters, FilterParams } from '@/types';

const Recipes = () => {
	const [searchInput, setSearchInput] = useState('');
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [filters, setFilters] = useState<Filters>({
		category: '',
		area: '',
		ingredient: '',
	});

	const debouncedSearchTerm = useDebounce(searchInput, 500);

	const { filterOptions } = useFilterOptions();
	const { filteredRecipes, loading, loadRecipes, loadInitialRecipes } = useRecipes();

	const {
		currentData: paginatedRecipes,
		currentPage,
		totalPages,
		hasNextPage,
		hasPreviousPage,
		goToPage,
		startIndex,
		endIndex,
		totalItems,
	} = usePagination({
		data: filteredRecipes,
		itemsPerPage: 20,
	});

	const getFilterDisplayName = (type: 'category' | 'area' | 'ingredient', value: string) => {
		switch (type) {
			case 'category':
				const category = filterOptions.categories.find(
					(cat) => cat.toLowerCase() === value.toLowerCase()
				);
				return category || value;
			case 'area':
				const area = filterOptions.areas.find(
					(area) => area.toLowerCase() === value.toLowerCase()
				);
				return area || value;
			case 'ingredient':
				const ingredient = filterOptions.ingredients.find(
					(ing) => ing.toLowerCase().replace(/\s+/g, '_') === value.toLowerCase()
				);
				return ingredient || value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
			default:
				return value;
		}
	};

	const applyFiltersAndSearch = async () => {
		const filterParams: FilterParams = {};

		if (debouncedSearchTerm.trim()) {
			filterParams.search = debouncedSearchTerm.trim();
		} else {
			if (filters.category) {
				filterParams.category = filters.category;
			} else if (filters.area) {
				filterParams.area = filters.area;
			} else if (filters.ingredient) {
				filterParams.ingredient = filters.ingredient.toLowerCase().replace(/\s+/g, '_');
			}
		}

		await loadRecipes(filterParams);
	};

	const handleApplyFilters = async (newFilters: {
		category: string;
		area: string;
		ingredient: string;
	}) => {
		setFilters(newFilters);
	};

	const handleRemoveFilter = (key: 'category' | 'area' | 'ingredient') => {
		setFilters((prev) => ({
			...prev,
			[key]: '',
		}));
	};

	const handleClearAllFilters = async () => {
		setFilters({ category: '', area: '', ingredient: '' });
		setSearchInput('');
	};

	useEffect(() => {
		applyFiltersAndSearch();
	}, [debouncedSearchTerm]);

	useEffect(() => {
		if (filters.category || filters.area || filters.ingredient) {
			applyFiltersAndSearch();
		} else if (!debouncedSearchTerm.trim()) {
			loadInitialRecipes();
		}
	}, [filters]);

	const hasActiveFilters = filters.category || filters.area || filters.ingredient;
	const hasActiveSearch = debouncedSearchTerm.trim();

	return (
		<div className="py-30 mx-25">
			<div className="mb-16">
				<h1 className="font-[family-name:var(--font-pd)] text-6xl font-bold text-gray-900 mb-6">
					Explore All Recipes
				</h1>
				<p className="font-[family-name:var(--font-crimson)] text-xl text-gray-600 max-w-3xl leading-relaxed">
					Indulge in the world of culinary delights with Lamdag Recipes, your go-to destination
					for mouthwatering recipes that will tantalize your taste buds.
				</p>
			</div>

			<div className="flex flex-col sm:flex-row gap-6 mb-12">
				<div className="relative flex-1 max-w-2xl">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
					<input
						type="text"
						placeholder="Search recipes, ingredients, or cuisines..."
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						className="w-full pl-12 pr-6 py-4 border-b border-gray-300 focus:border-[color:var(--primary)] focus:outline-none text-gray-900 placeholder-gray-500 font-[family-name:var(--font-crimson)] transition-colors duration-200"
					/>
					{searchInput !== debouncedSearchTerm && (
						<div className="absolute right-4 top-1/2 -translate-y-1/2">
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[color:var(--primary)]"></div>
						</div>
					)}
				</div>

				<button
					onClick={() => setShowFilterModal(true)}
					className="flex items-center gap-3 bg-[color:var(--primary)] hover:bg-[#f59e0b] text-white px-8 py-4 font-medium font-[family-name:var(--font-crimson)] transition-colors duration-200 whitespace-nowrap">
					<Filter className="w-5 h-5" />
					Filters
					{hasActiveFilters && (
						<span className="bg-white text-[color:var(--primary)] px-2 py-1 text-xs font-bold">
							{[filters.category, filters.area, filters.ingredient].filter(Boolean).length}
						</span>
					)}
				</button>
			</div>

			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={goToPage}
					hasNextPage={hasNextPage}
					hasPreviousPage={hasPreviousPage}
					startIndex={startIndex}
					endIndex={endIndex}
					totalItems={totalItems}
				/>
			)}

			{(hasActiveFilters || hasActiveSearch) && (
				<div className="flex flex-wrap gap-3 mb-8">
					<span className="text-sm text-gray-600 font-[family-name:var(--font-crimson)]">
						Active filters:
					</span>

					{hasActiveSearch && (
						<span className="bg-[color:var(--primary)]/10 text-[color:var(--primary)] px-3 py-1 text-sm font-[family-name:var(--font-crimson)] flex items-center gap-2">
							Search: &quot;{debouncedSearchTerm}&quot;
							<button onClick={() => setSearchInput('')}>
								<X className="w-3 h-3" />
							</button>
						</span>
					)}

					{filters.category && (
						<span className="bg-[color:var(--primary)]/10 text-[color:var(--primary)] px-3 py-1 text-sm font-[family-name:var(--font-crimson)] flex items-center gap-2">
							Category: {getFilterDisplayName('category', filters.category)}
							<button onClick={() => handleRemoveFilter('category')}>
								<X className="w-3 h-3" />
							</button>
						</span>
					)}
					{filters.area && (
						<span className="bg-[color:var(--primary)]/10 text-[color:var(--primary)] px-3 py-1 text-sm font-[family-name:var(--font-crimson)] flex items-center gap-2">
							Area: {getFilterDisplayName('area', filters.area)}
							<button onClick={() => handleRemoveFilter('area')}>
								<X className="w-3 h-3" />
							</button>
						</span>
					)}
					{filters.ingredient && (
						<span className="bg-[color:var(--primary)]/10 text-[color:var(--primary)] px-3 py-1 text-sm font-[family-name:var(--font-crimson)] flex items-center gap-2">
							Ingredient: {getFilterDisplayName('ingredient', filters.ingredient)}
							<button onClick={() => handleRemoveFilter('ingredient')}>
								<X className="w-3 h-3" />
							</button>
						</span>
					)}

					{(hasActiveFilters || hasActiveSearch) && (
						<button
							onClick={handleClearAllFilters}
							className="text-sm text-[color:var(--primary)] hover:text-red-800 font-[family-name:var(--font-crimson)] underline">
							Clear all
						</button>
					)}
				</div>
			)}

			{!loading && (
				<div className="mb-8">
					<p className="text-gray-600 font-[family-name:var(--font-crimson)]">
						{hasActiveSearch || hasActiveFilters
							? `${filteredRecipes.length} recipes found`
							: `${filteredRecipes.length} total recipes`}
					</p>
				</div>
			)}

			{loading ? (
				<LoadingGrid />
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{paginatedRecipes.map((recipe) => (
							<RecipeCard key={recipe.idMeal} recipe={recipe} />
						))}
					</div>

					{totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={goToPage}
							hasNextPage={hasNextPage}
							hasPreviousPage={hasPreviousPage}
							startIndex={startIndex}
							endIndex={endIndex}
							totalItems={totalItems}
						/>
					)}
				</>
			)}

			{!loading && filteredRecipes.length === 0 && (
				<div className="text-center py-16">
					<div className="text-gray-400 mb-4">
						<Search className="w-16 h-16 mx-auto" />
					</div>
					<h3 className="text-xl font-semibold text-gray-900 mb-2 font-[family-name:var(--font-pd)]">
						No recipes found
					</h3>
					<p className="text-gray-600 font-[family-name:var(--font-crimson)] mb-4">
						{hasActiveSearch || hasActiveFilters
							? "Try adjusting your search terms or filters to find what you're looking for."
							: 'No recipes available at the moment.'}
					</p>
					{(hasActiveSearch || hasActiveFilters) && (
						<button
							onClick={handleClearAllFilters}
							className="text-[color:var(--primary)] hover:text-[#f59e0b] font-[family-name:var(--font-crimson)] underline">
							Clear all filters and search
						</button>
					)}
				</div>
			)}

			<FilterModal
				isOpen={showFilterModal}
				onClose={() => setShowFilterModal(false)}
				filters={filters}
				onApplyFilters={handleApplyFilters}
				filterOptions={filterOptions}
			/>
		</div>
	);
};

export default Recipes;
