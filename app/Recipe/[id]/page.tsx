'use client';
import { useState, useEffect } from 'react';
import { getMealById } from '@/api/recipeServices';
import { Recipe } from '@/types/recipes';
import { useParams } from 'next/navigation';

const RecipePage = () => {
	const params = useParams();
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await getMealById(params.id as string);

				if (response) {
					setRecipe(response);
				} else {
					setError('Recipe not found');
				}
			} catch (error) {
				console.error('Error fetching recipe:', error);
				setError('Failed to load recipe');
			} finally {
				setLoading(false);
			}
		};

		if (params.id) {
			fetchRecipe();
		}
	}, [params.id]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-white">
				<div className="text-center">
					<div className="w-20 h-20 border-2 border-[color:var(--primary)] border-t-[color:var(--primary)] rounded-full animate-spin mx-auto mb-8"></div>
					<div className="text-gray-900 text-xl font-light tracking-wide animate-pulse">
						Loading Recipe
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-red-50">
				<div className="text-center max-w-md px-6">
					<div className="text-red-600 text-6xl font-thin mb-6">×</div>
					<h1 className="text-gray-900 text-2xl font-light mb-4">Error</h1>
					<p className="text-red-700">{error}</p>
				</div>
			</div>
		);
	}

	if (!recipe) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center max-w-md px-6">
					<div className="text-gray-400 text-6xl font-thin mb-6">?</div>
					<h1 className="text-gray-900 text-2xl font-light mb-4">Not Found</h1>
					<p className="text-gray-600">Recipe does not exist</p>
				</div>
			</div>
		);
	}

	const ingredients = [];
	for (let i = 1; i <= 20; i++) {
		const ingredient = recipe[`strIngredient${i}`];
		const measure = recipe[`strMeasure${i}`];
		if (ingredient && ingredient.trim()) {
			ingredients.push({
				ingredient: ingredient.trim(),
				measure: measure?.trim() || '',
				full: `${measure?.trim() || ''} ${ingredient.trim()}`.trim(),
			});
		}
	}

	const instructions = recipe.strInstructions
		.split(/\r\n|\n|\r/)
		.filter((step) => step.trim().length > 0)
		.map((step) => step.trim());

	const tags = recipe.strTags
		? recipe.strTags
				.split(',')
				.map((tag) => tag.trim())
				.filter(Boolean)
		: [];
	const videoId = recipe.strYoutube?.split('v=')[1]?.split('&')[0];

	return (
		<div className="min-h-screen bg-white text-black">
			<div className="relative h-screen overflow-hidden">
				{recipe.strMealThumb && (
					<>
						<img
							src={recipe.strMealThumb}
							alt={recipe.strMeal}
							onLoad={() => setImageLoaded(true)}
							className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
								imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
							}`}
						/>

						<div className="absolute inset-0 bg-gradient-to-t from-white via-black/10 to-transparent"></div>
					</>
				)}

				<div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
					<div className="max-w-4xl">
						<div className="flex flex-wrap gap-3 mb-6">
							{recipe.strCategory && (
								<span className="px-4 text-white py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-light tracking-wide">
									{recipe.strCategory}
								</span>
							)}
							{recipe.strArea && (
								<span className="px-4 text-white py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-light tracking-wide">
									{recipe.strArea}
								</span>
							)}
						</div>

						<h1 className="text-4xl text-white  font-[family-name:var(--font-crimson)]  md:text-6xl lg:text-8xl font-thin leading-tight mb-6 tracking-tight">
							{recipe.strMeal}
						</h1>

						{tags.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-8">
								{tags.map((tag) => (
									<span
										key={tag}
										className="inline-block bg-[color:var(--primary)] hover:bg-gray-600 text-white text-sm font-medium px-3 py-1 rounded-full cursor-pointer transition-colors">
										{tag}
									</span>
								))}
							</div>
						)}

						<div className="flex flex-wrap gap-8 text-lg font-[family-name:var(--font-crimson)]  text-gray-600 ">
							<div>{ingredients.length} ingredients</div>
							<div>{instructions.length} steps</div>
						</div>
					</div>
				</div>
			</div>

			<section className="py-20 px-6 md:px-12 lg:px-16">
				<div className="max-w-6xl mx-auto">
					<div>
						<h1 className="font-[family-name:var(--font-crimson)]  text-4xl text-gray-900 mb-8">
							Ingredients
						</h1>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 border border-gray-200">
						{ingredients.map((item, index) => (
							<div key={index} className="group">
								<div className="border-r border-b border-gray-200 p-6 h-full hover:bg-gray-50 transition-colors duration-300">
									<div className="text-gray-400 text-xs font-light mb-2 tracking-wide">
										{String(index + 1).padStart(2, '0')}
									</div>
									<div className="text-gray-900 font-light font-[family-name:var(--font-crimson)]">
										{item.measure && (
											<span className="text-gray-600 mr-2">{item.measure}</span>
										)}
										<span>{item.ingredient}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 px-6 md:px-12 lg:px-16 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<div>
						<h1 className="font-[family-name:var(--font-crimson)]  text-4xl text-gray-900 mb-8">
							Instructions
						</h1>
					</div>
					<div className="space-y-0">
						{instructions.map((instruction, index) => (
							<div key={index} className="border-b border-gray-200 last:border-b-0">
								<div className="py-8 flex gap-8 items-start hover:bg-white transition-colors duration-300 px-4 -mx-4">
									<div className="flex-shrink-0 w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center text-sm font-light">
										{index + 1}
									</div>
									<p className="text-gray-800 leading-relaxed font-light font-[family-name:var(--font-crimson)] text-lg pt-2">
										{instruction}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{videoId && (
				<section className="py-20 px-6 md:px-12 lg:px-16">
					<div className="max-w-6xl mx-auto">
						<div>
							<h1 className="font-[family-name:var(--font-crimson)]  text-4xl text-gray-900 mb-8">
								Youtube Tutorial
							</h1>
						</div>
						<div className="aspect-video bg-gray-100 border border-gray-200 overflow-hidden">
							<iframe
								className="w-full h-full"
								src={`https://www.youtube.com/embed/${videoId}?color=white&modestbranding=1`}
								title={`${recipe.strMeal} Tutorial`}
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							/>
						</div>
					</div>
				</section>
			)}
		</div>
	);
};

export default RecipePage;
