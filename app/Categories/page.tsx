'use client';

import { useState } from 'react';
import { ArrowRight, Search, AlertCircle } from 'lucide-react';
import { useCarousel } from '@/hooks/useCarousel';
import CategoryCard from '@/components/ui/categoryCard';
import SearchBar from '@/components/ui/serachBar';

const LoadingGrid = () => (
	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		{Array.from({ length: 8 }).map((_, index) => (
			<div key={index} className="bg-white border border-gray-200 overflow-hidden">
				<div className="h-48 bg-gray-200 animate-pulse" />
				<div className="p-6 space-y-3">
					<div className="h-6 bg-gray-200 animate-pulse" />
					<div className="space-y-2">
						<div className="h-4 bg-gray-200 animate-pulse" />
						<div className="h-4 bg-gray-200 animate-pulse w-3/4" />
					</div>
					<div className="h-4 bg-gray-200 animate-pulse w-1/2" />
				</div>
			</div>
		))}
	</div>
);

const EmptyState = ({ searchTerm }: { searchTerm: string }) => (
	<div className="flex flex-col items-center justify-center py-16">
		<AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
		<h3 className="text-lg font-semibold text-gray-900 mb-2 font-[family-name:var(--font-pd)]">
			No categories found
		</h3>
		<p className="text-gray-600 text-center font-[family-name:var(--font-crimson)]">
			{searchTerm
				? `No categories match "${searchTerm}". Try adjusting your search.`
				: 'No categories are available at the moment.'}
		</p>
	</div>
);

const CategoriesPage = () => {
	const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState('');

	const { categories, isLoading, error } = useCarousel();

	const filteredCategories = categories
		.filter(
			(category) =>
				category.strCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
				category.strCategoryDescription.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.sort((a, b) => {
			return b.strCategoryDescription.length - a.strCategoryDescription.length;
		});

	if (error) {
		return (
			<div className="pt-30 mx-25">
				<div className="flex items-center gap-3 text-red-600 py-16">
					<AlertCircle className="w-6 h-6" />
					<span className="font-medium font-[family-name:var(--font-crimson)]">{error}</span>
				</div>
			</div>
		);
	}

	return (
		<div className="pt-30 mx-25">
			<div className="mb-12">
				<h1 className="font-[family-name:var(--font-pd)] text-6xl font-bold text-gray-900 mb-4">
					Categories
				</h1>
				<p className="text-gray-700 font-[family-name:var(--font-crimson)] text-lg leading-relaxed max-w-3xl">
					Discover delicious meals organized by category. From savory mains to sweet desserts,
					explore recipes that match your cravings and cooking style.
				</p>
			</div>
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
				<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			</div>

			{!isLoading && (
				<div className="mb-6">
					<p className="text-sm text-gray-600 font-[family-name:var(--font-crimson)]">
						{searchTerm
							? `${filteredCategories.length} categories found for "${searchTerm}"`
							: `${filteredCategories.length} categories available`}
					</p>
				</div>
			)}

			{isLoading ? (
				<LoadingGrid />
			) : filteredCategories.length === 0 ? (
				<EmptyState searchTerm={searchTerm} />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
					{filteredCategories.map((category) => (
						<CategoryCard
							key={category.idCategory}
							category={category}
							isHovered={hoveredCategory === category.idCategory}
							onHover={() => setHoveredCategory(category.idCategory)}
							onLeave={() => setHoveredCategory(null)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default CategoriesPage;
