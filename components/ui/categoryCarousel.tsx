'use client';

import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useCarousel } from '@/hooks/useCarousel';
import { truncateText, getProgressIndex, CAROUSEL_CONFIG } from '@/utils/carousel';
import type { Categories } from '@/types/recipes';

const CategoryCard = ({
	category,
	isHovered,
	onHover,
	onLeave,
}: {
	category: Categories;
	isHovered: boolean;
	onHover: () => void;
	onLeave: () => void;
}) => (
	<div
		className="flex-shrink-0 w-[320px] mx-3 group cursor-pointer"
		onMouseEnter={onHover}
		onMouseLeave={onLeave}>
		<article className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 hover:border-gray-300">
			<div className="relative h-48 overflow-hidden">
				<img
					src={category.strCategoryThumb}
					alt={category.strCategory}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					loading="lazy"
				/>
			</div>

			<div className="p-6">
				<h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[color:var(--primary)] transition-colors duration-200 font-[family-name:var(--font-pd)]">
					{category.strCategory}
				</h4>
				<p className="text-gray-600 leading-relaxed mb-6 text-sm font-[family-name:var(--font-crimson)]">
					{truncateText(
						category.strCategoryDescription,
						CAROUSEL_CONFIG.DESCRIPTION_MAX_LENGTH
					)}
				</p>

				<button
					className="inline-flex items-center gap-2 text-[color:var(--primary)] hover:text-[#f59e0b] font-medium text-sm group/btn transition-colors duration-200 font-[family-name:var(--font-crimson)]"
					aria-label={`Explore ${category.strCategory} recipes`}>
					Explore Recipes
					<ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
				</button>
			</div>
		</article>
	</div>
);

const LoadingState = () => (
	<div className="flex justify-center items-center py-24">
		<div className="flex items-center gap-3">
			<div className="w-5 h-5 border-2 border-[color:var(--primary)] border-t-transparent animate-spin"></div>
			<span className="text-gray-600 font-[family-name:var(--font-crimson)]">Loading categories...</span>
		</div>
	</div>
);

const ErrorState = ({ error }: { error: string }) => (
	<div className="flex justify-center items-center py-24">
		<div className="flex items-center gap-3 text-red-600">
			<AlertCircle className="w-5 h-5" />
			<span className="font-[family-name:var(--font-crimson)]">{error}</span>
		</div>
	</div>
);

const CategoryCarousel = () => {
	const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

	const {
		categories,
		duplicatedCategories,
		currentIndex,
		isLoading,
		error,
		nextSlide,
		goToSlide,
	} = useCarousel();

	if (isLoading) {
		return <LoadingState />;
	}

	if (error) {
		return <ErrorState error={error} />;
	}

	if (!categories.length) {
		return (
			<div className="flex justify-center items-center py-24">
				<span className="text-gray-600">No categories available</span>
			</div>
		);
	}

	const progressIndex = getProgressIndex(currentIndex, categories.length);
	const shouldDisableTransition = currentIndex >= categories.length * 2;

	return (
		<section className="relative py-8 bg-gray-50" aria-label="Recipe Categories">
			<div className="max-w-7xl mx-auto px-4">
				
				<header className="flex justify-between items-center mb-8">
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-pd)]">Recipe Categories</h2>
						<p className="text-gray-600 font-[family-name:var(--font-crimson)]">Discover delicious recipes by category</p>
					</div>
					
					<div className="flex items-center gap-2">
						<button
							onClick={nextSlide}
							className="w-10 h-10 bg-white border border-gray-300 hover:border-[color:var(--primary)] flex items-center justify-center transition-colors duration-200 hover:bg-gray-50"
							aria-label="Next categories">
							<ChevronRight className="w-5 h-5 text-gray-600 hover:text-[color:var(--primary)]" />
						</button>
					</div>
				</header>

			
				<div className="overflow-hidden" role="region" aria-label="Category carousel">
					<div
						className={`flex transition-transform duration-500 ease-out ${
							shouldDisableTransition ? 'transition-none' : ''
						}`}
						style={{
							transform: `translateX(-${currentIndex * (CAROUSEL_CONFIG.CARD_WIDTH + 24)}px)`,
						}}>
						{duplicatedCategories.map((category, index) => (
							<CategoryCard
								key={`${category.idCategory}-${index}`}
								category={category}
								isHovered={hoveredCategory === category.idCategory}
								onHover={() => setHoveredCategory(category.idCategory)}
								onLeave={() => setHoveredCategory(null)}
							/>
						))}
					</div>
				</div>

			
				<nav
					className="flex justify-center items-center gap-2 mt-8"
					aria-label="Carousel navigation">
					{categories.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`transition-all duration-200 ${
								progressIndex === index
									? 'w-6 h-2 bg-[color:var(--primary)]'
									: 'w-2 h-2 bg-gray-300 hover:bg-[#f59e0b]'
							}`}
							aria-label={`Go to page ${index + 1}`}
							aria-current={progressIndex === index ? 'true' : 'false'}
						/>
					))}
				</nav>
			</div>
		</section>
	);
};

export default CategoryCarousel;