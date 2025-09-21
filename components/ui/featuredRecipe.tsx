'use client';

import Image from 'next/image';
import { fetchRandomRecipe } from '@/api/recipeServices';
import { useState, useEffect } from 'react';
import { Recipe } from '@/types/recipes';
import Link from 'next/link';

const FeaturedRecipe = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	useEffect(() => {
		const getRecipes = async () => {
			const data = await fetchRandomRecipe();
			if (data) {
				const uniqueRecipes = data.filter((recipe, index, self) => 
					index === self.findIndex(r => r.idMeal === recipe.idMeal)
				);
				setRecipes(uniqueRecipes);
			}
		};
		getRecipes();
	}, []);

	return (
		<section className="py-8">
			<div>
				{recipes.map((recipe, index) => (
					<div
						key={`${recipe.idMeal}-${index}`} 
						className="bg-white border border-gray-200 overflow-hidden group hover:shadow-xl transition-shadow duration-300">
						<div className="flex flex-col lg:flex-row">
							<div className="lg:w-1/2 aspect-[4/3] lg:aspect-auto overflow-hidden">
								<img
									src={recipe.strMealThumb || '/placeholder.svg'}
									alt={recipe.strMeal}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>

							<div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
								<div className="flex items-center gap-3 mb-4">
									<div className="px-3 py-1 bg-[color:var(--primary)]/10 rounded">
										<span className="text-[color:var(--primary)] font-[family-name:var(--font-crimson)] text-sm uppercase tracking-wide">
											{recipe.strCategory}
										</span>
									</div>

									<span className="text-gray-600 text-sm font-[family-name:var(--font-crimson)]">
										{recipe.strArea}
									</span>
								</div>

								<h3 className="font-[family-name:var(--font-crimson)] text-3xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
									{recipe.strMeal}
								</h3>

								<p className="text-gray-700 font-[family-name:var(--font-pd)] text-base leading-relaxed mb-8 line-clamp-4">
									{recipe.strInstructions?.slice(0, 200) +
										(recipe.strInstructions?.length > 200 ? '...........' : '')}
								</p>

								<div className="flex justify-end">
									<Link
										href={`/recipe/${recipe.idMeal}`}
										className="text-[color:var(--primary)] font-[family-name:var(--font-pd)] text-sm hover:text-orange-600 transition-colors duration-200 inline-flex items-center group/link">
										View Meal
										<svg
											className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</Link>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeaturedRecipe;