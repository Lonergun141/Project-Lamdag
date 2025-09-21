'use client';

import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useCarousel } from '@/hooks/useCarousel';
import type { Categories } from '@/types/recipes';
import { truncateText, getProgressIndex, CAROUSEL_CONFIG } from '@/utils/carousel';

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

export default CategoryCard;