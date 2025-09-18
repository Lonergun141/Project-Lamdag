'use client';

import { useState } from 'react';
import { ArrowRight, ChevronRight, AlertCircle } from 'lucide-react';
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
		className="flex-shrink-0 w-[360px] mx-2 group cursor-pointer"
		onMouseEnter={onHover}
		onMouseLeave={onLeave}>
		<article className="relative h-[520px] bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-[color:var(--primary)]/30 group-hover:-translate-y-2">
			<div className="absolute inset-0 bg-gradient-to-br from-[color:var(--primary)]/0 via-[color:var(--primary)]/0 to-[color:var(--primary)]/5 group-hover:from-[color:var(--primary)]/5 group-hover:via-[color:var(--primary)]/3 group-hover:to-[color:var(--primary)]/10 transition-all duration-500 z-10" />

			<div className="relative h-64 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-slate-900/0 via-slate-900/0 to-slate-900/20 z-20" />
				<img
					src={category.strCategoryThumb}
					alt={category.strCategory}
					className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
					loading="lazy"
				/>
			</div>

			<div className="relative z-10 p-8 h-56 flex flex-col justify-between">
				<div>
					<h4 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-crimson)] group-hover:text-[color:var(--primary)] transition-colors duration-300">
						{category.strCategory}
					</h4>
					<p className="text-slate-600 leading-relaxed mb-4 text-sm">
						{truncateText(
							category.strCategoryDescription,
							CAROUSEL_CONFIG.DESCRIPTION_MAX_LENGTH
						)}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<button
						className="inline-flex items-center gap-2 text-[color:var(--primary)] hover:text-[color:var(--primary)] font-semibold text-sm group/btn transition-all duration-300"
						aria-label={`Explore ${category.strCategory} recipes`}>
						Explore Recipes
						<ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
					</button>

					<div
						className={`w-2 h-2 rounded-full transition-all duration-300 ${
							isHovered ? 'bg-[color:var(--primary)] scale-125' : 'bg-slate-300'
						}`}
						aria-hidden="true"
					/>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
		</article>
	</div>
);

const LoadingState = () => (
	<div className="flex justify-center items-center py-32">
		<div className="flex items-center gap-3">
			<div className="w-6 h-6 border-2 border-[color:var(--primary)] border-t-transparent rounded-full animate-spin" />
			<span className="text-slate-600 font-medium">Loading categories...</span>
		</div>
	</div>
);

const ErrorState = ({ error }: { error: string }) => (
	<div className="flex justify-center items-center py-32">
		<div className="flex items-center gap-3 text-red-600">
			<AlertCircle className="w-6 h-6" />
			<span className="font-medium">{error}</span>
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
			<div className="flex justify-center items-center py-32">
				<span className="text-slate-600">No categories available</span>
			</div>
		);
	}

	const progressIndex = getProgressIndex(currentIndex, categories.length);
	const shouldDisableTransition = currentIndex >= categories.length * 2;

	return (
		<section className="relative py-4 overflow-hidden" aria-label="Recipe Categories">
			<div className="relative z-10 ml-8 mx-auto">
				<header className="flex justify-end items-end mb-14 mx-4">
					<button
						onClick={nextSlide}
						className="group relative w-16 h-16 bg-[color:var(--primary)]/10 hover:bg-[color:var(--primary)] rounded-full flex items-center justify-center transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[color:var(--primary)]/25 border border-[color:var(--primary)]/20 hover:border-[color:var(--primary)]"
						aria-label="Next categories">
						<ChevronRight className="w-7 h-7 text-[color:var(--primary)] group-hover:text-white group-hover:translate-x-1 transition-all duration-300 relative z-10" />
						<div className="absolute inset-0 rounded-full bg-gradient-to-r from-[color:var(--primary)]/0 to-[color:var(--primary)]/0 group-hover:from-[color:var(--primary)]/100 group-hover:to-[color:var(--primary)]/100 transition-all duration-500" />
					</button>
				</header>

				<div className="overflow-hidden py-4" role="region" aria-label="Category carousel">
					<div
						className={`flex transition-all duration-700 ease-out ${
							shouldDisableTransition ? 'transition-none' : ''
						}`}
						style={{
							transform: `translateX(-${currentIndex * CAROUSEL_CONFIG.CARD_WIDTH}px)`,
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
					className="flex justify-center items-center gap-3 mt-12"
					aria-label="Carousel navigation">
					{categories.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`transition-all duration-300 rounded-full ${
								progressIndex === index
									? 'w-8 h-2 bg-[color:var(--primary)]'
									: 'w-2 h-2 bg-slate-300 hover:bg-[color:var(--primary)]/40'
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
