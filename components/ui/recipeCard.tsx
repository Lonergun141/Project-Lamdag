'use client';
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import type { Recipe } from '@/types/recipes';
import { getMealThumbnail } from '@/api/recipeServices';
import Link from 'next/link';
import React from 'react';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className="group relative bg-white overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div className="relative h-64 overflow-hidden">
				<img
					src={getMealThumbnail(recipe.strMealThumb, 'medium')}
					alt={recipe.strMeal}
					className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
					onError={(e) => {
						const target = e.target as HTMLImageElement;
						target.src = recipe.strMealThumb;
					}}
				/>

				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

				<div className="absolute flex flex-row gap-3 top-4 left-4">
					<span className="bg-[color:var(--primary)] text-white px-3 py-1 text-xs font-medium font-[family-name:var(--font-crimson)] uppercase tracking-wide">
						{recipe.strCategory}
					</span>
					<div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs text-gray-800 font-[family-name:var(--font-crimson)]">
						<MapPin className="w-3 h-3" />
						{recipe.strArea}
					</div>
				</div>
			</div>

			<div className="p-2">
				<h3 className="font-[family-name:var(--font-crimson)] text-xl text-gray-900 mb-3 group-hover:text-[color:var(--primary)] transition-colors duration-300 leading-tight">
					{recipe.strMeal}
				</h3>
				<Link href={`/Recipe/${recipe.idMeal}`}>
					<p className="text-gray-600 text-sm leading-relaxed mb-4 font-[family-name:var(--font-crimson)] line-clamp-3">
						{recipe.strInstructions
							? `${recipe.strInstructions.slice(0, 120)}...`
							: 'Delicious recipe with amazing flavors and simple cooking techniques.'}
					</p>
				</Link>
				<Link href={`/Recipe/${recipe.idMeal}`}>
					<button className="w-full cursor-pointer bg-gray-50 hover:bg-[color:var(--primary)] text-gray-700 hover:text-white py-3 text-sm font-medium font-[family-name:var(--font-crimson)] transition-all duration-300 transform group-hover:translate-y-0 translate-y-1">
						View Recipe
					</button>
				</Link>
			</div>

			<div className="absolute top-0 left-0 w-0 h-0 border-l-[20px] border-l-[color:var(--primary)] border-b-[20px] border-b-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
		</div>
	);
};

export default RecipeCard;
