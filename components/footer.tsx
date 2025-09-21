'use client';

const NewsTicker = () => {
	const newsItems = [
		'New Recipe Alert: Authentic Japanese Ramen Bowl Added',
		'Trending Now: Mediterranean Summer Salads Collection',
		"Chef's Pick: Traditional Italian Pasta Masterclass",
		'Featured: Spicy Thai Curry Recipes from Bangkok',
		'Just Added: French Pastry Techniques Guide',
		'Popular: Healthy Breakfast Bowl Ideas',
		'Explore: Middle Eastern Mezze Platters',
	];

	return (
		<div className="bg-white overflow-hidden py-3 border-y border-gray-200 relative">
			<div className="flex animate-scroll">
				{[...newsItems, ...newsItems].map((item, index) => (
					<div key={index} className="flex items-center gap-12 whitespace-nowrap">
						<span className="text-gray-900 ml-4 font-[family-name:var(--font-crimson)] text-8xl">
							{item}
						</span>
						<div className="w-2 h-2 bg-[color:var(--primary)] rounded-full flex-shrink-0" />
					</div>
				))}
			</div>
		</div>
	);
};

const SocietyLink = ({
	href,
	children,
	external = false,
}: {
	href: string;
	children: React.ReactNode;
	external?: boolean;
}) => (
	<a
		href={href}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		className="text-white hover:text-[#f59e0b] transition-colors duration-300 font-[family-name:var(--font-pd)] text-lg">
		{children}
	</a>
);

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<>

			<footer className="bg-[color:var(--primary)]">
				<NewsTicker />

				<div className="pt-20 pb-8">
					<div className="max-w-6xl mx-auto px-6">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
							<div className="space-y-8">
								<div>
									<h1 className="text-5xl lg:text-6xl text-white mb-6 font-[family-name:var(--font-pacifico)] leading-tight">
										Lamdag Recipes
									</h1>
									<p className="text-white/90 text-lg leading-relaxed font-[family-name:var(--font-crimson)] max-w-2xl">
										We curate authentic recipes that connect cultures and bring global
										flavors to your kitchen. From traditional dishes to modern
										interpretations, we craft culinary experiences that inspire and
										nourish.
									</p>
								</div>

								<div className="space-y-4">
									<div>
										<SocietyLink href="/Recipes">Recipes</SocietyLink>
									</div>
									<div>
										<SocietyLink href="/Categories">Categories</SocietyLink>
									</div>
									<div>
										<SocietyLink href="/About">About</SocietyLink>
									</div>
								</div>
							</div>

							<div className="bg-white p-8 lg:p-12 h-fit">
								<div className="space-y-6">
									<h2 className="text-2xl text-gray-900 mb-6 font-[family-name:var(--font-pd)] font-semibold">
										Newsletter
									</h2>
									<p className="text-gray-700 leading-relaxed font-[family-name:var(--font-crimson)]">
										Stay updated with our latest recipes, cooking tips, and culinary
										discoveries from around the world.
									</p>
									<div className="space-y-4">
										<input
											type="email"
											placeholder="Enter your email address"
											className="w-full border-b-2 border-gray-300 focus:border-[color:var(--primary)] pb-2 text-gray-900 placeholder-gray-500 focus:outline-none transition-colors duration-300 font-[family-name:var(--font-crimson)] text-sm bg-transparent"
										/>
										<button className="bg-[color:var(--primary)] hover:bg-[#f59e0b] text-white px-6 py-3 text-sm font-medium transition-colors duration-300 font-[family-name:var(--font-crimson)]">
											Subscribe
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className="border-t border-white/20 pt-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
							<div className="flex flex-col lg:flex-row gap-6">
								<a
									href="/privacy"
									className="text-white/80 hover:text-[#f59e0b] transition-colors duration-300 font-[family-name:var(--font-crimson)] text-sm underline">
									Privacy Policy
								</a>
								<a
									href="https://www.themealdb.com/api.php"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white/80 hover:text-[#f59e0b] transition-colors duration-300 font-[family-name:var(--font-crimson)] text-sm underline">
									Powered by TheMealDB
								</a>
							</div>

							<div className="text-white/80 font-[family-name:var(--font-crimson)] text-sm">
								© LAMDAG RECIPES {currentYear}
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
