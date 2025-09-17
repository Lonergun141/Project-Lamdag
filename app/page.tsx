import FeaturedRecipe from '@/components/ui/featuredRecipe';

export default function Home() {
	return (
		<main>
			<div className='px-6 py-12 text-start  '>
				<h1 className='text-8xl text-[color:var(--primary)] font-bold font-[family-name:var(--font-pd)]'>Featured Recipes</h1>
				<h2 className='text-6xl text-[color:var(--foreground)] font-[family-name:var(--font-pd)]'>Handpicked culinary masterpieces</h2>
			</div>
			<FeaturedRecipe />
		</main>
	);
}
