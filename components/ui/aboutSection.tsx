'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Users, Award, ChefHat, Heart, Utensils } from 'lucide-react';

const FeatureCard = ({ 
	icon: Icon, 
	title, 
	description, 
	isHovered, 
	onHover, 
	onLeave 
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	isHovered: boolean;
	onHover: () => void;
	onLeave: () => void;
}) => (
	<div
		className="bg-white border border-gray-200 hover:border-[color:var(--primary)] transition-all duration-300 p-6 group cursor-pointer"
		onMouseEnter={onHover}
		onMouseLeave={onLeave}>
		<div className="flex items-start gap-4">
			<div className={`p-3 bg-gray-100 group-hover:bg-[color:var(--primary)] transition-colors duration-300 ${isHovered ? 'bg-[color:var(--primary)]' : ''}`}>
				<Icon className={`w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300 ${isHovered ? 'text-white' : ''}`} />
			</div>
			<div className="flex-1">
				<h3 className="text-lg font-semibold text-gray-900 mb-2 font-[family-name:var(--font-pd)] group-hover:text-[color:var(--primary)] transition-colors duration-300">
					{title}
				</h3>
				<p className="text-gray-600 leading-relaxed font-[family-name:var(--font-crimson)] text-sm">
					{description}
				</p>
			</div>
		</div>
	</div>
);

const StatsCard = ({ number, label }: { number: string; label: string }) => (
	<div className="text-center">
		<div className="text-3xl font-bold text-[color:var(--primary)] mb-2 font-[family-name:var(--font-pd)]">
			{number}
		</div>
		<div className="text-gray-600 font-[family-name:var(--font-crimson)] text-sm">
			{label}
		</div>
	</div>
);

const LearnMoreSection = () => {
	const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

	const features = [
		{
			id: 'api',
			icon: BookOpen,
			title: 'TheMealDB API Integration',
			description: 'Powered by TheMealDB - a comprehensive, free, and open recipe database that provides reliable access to thousands of recipes with consistent data structure.'
		},
		{
			id: 'reliable',
			icon: Award,
			title: 'Reliable Data Source',
			description: 'TheMealDB offers stable, well-maintained recipe data with high-quality images, detailed ingredients, and step-by-step cooking instructions.'
		},
		{
			id: 'comprehensive',
			icon: ChefHat,
			title: 'Comprehensive Coverage',
			description: 'Access recipes from multiple cuisines worldwide, complete with meal categories, cooking techniques, and authentic cultural dishes.'
		},
		{
			id: 'structured',
			icon: Utensils,
			title: 'Structured Recipe Format',
			description: 'Every recipe follows a consistent JSON format with ingredients, measurements, instructions, and high-resolution meal images for the best user experience.'
		},
		{
			id: 'free',
			icon: Heart,
			title: 'Free & Open Access',
			description: 'TheMealDB provides free API access without rate limits for educational and personal projects, making quality recipe data accessible to everyone.'
		},
		{
			id: 'community',
			icon: Users,
			title: 'Community-Driven',
			description: 'Built and maintained by a dedicated community of developers and food enthusiasts, ensuring continuous updates and improvements.'
		}
	];

	const stats = [
		{ number: '1,000+', label: 'Recipes from TheMealDB' },
		{ number: '25+', label: 'International Cuisines' },
		{ number: '100%', label: 'Free API Access' },
		{ number: '24/7', label: 'API Availability' }
	];

	return (
		<section className="py-16 bg-gray-50" aria-label="Learn More About Our Platform">
			<div className="max-w-7xl mx-auto px-4">
		
				<header className="text-center mb-16">
					<h2 className="text-4xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-pd)]">
						Powered by TheMealDB API
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto font-[family-name:var(--font-crimson)]">
						Discover why we chose TheMealDB as our trusted recipe data source - a reliable, comprehensive, and free API that delivers exceptional cooking content.
					</p>
				</header>

		
				<div className="bg-white border border-gray-200 p-8 mb-16">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<StatsCard key={index} number={stat.number} label={stat.label} />
						))}
					</div>
				</div>

				
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
					{features.map((feature) => (
						<FeatureCard
							key={feature.id}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
							isHovered={hoveredFeature === feature.id}
							onHover={() => setHoveredFeature(feature.id)}
							onLeave={() => setHoveredFeature(null)}
						/>
					))}
				</div>

		
				<div className="bg-white border border-gray-200 p-12 text-center">
					<h3 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-pd)]">
						Experience the Power of TheMealDB
					</h3>
					<p className="text-gray-600 mb-8 max-w-2xl mx-auto font-[family-name:var(--font-crimson)]">
						Built on TheMealDB's robust API, our platform delivers consistent, high-quality recipe data with reliable performance. 
						Start exploring authentic recipes from around the world with structured ingredients and clear instructions.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<button className="bg-[color:var(--primary)] hover:bg-[#f59e0b] text-white px-8 py-3 font-medium transition-colors duration-200 font-[family-name:var(--font-crimson)] flex items-center gap-2">
							Explore Recipes
							<ArrowRight className="w-5 h-5" />
						</button>
						<a 
							href="https://www.themealdb.com/api.php" 
							target="_blank" 
							rel="noopener noreferrer"
							className="border border-gray-300 hover:border-[color:var(--primary)] text-gray-700 hover:text-[color:var(--primary)] px-8 py-3 font-medium transition-colors duration-200 font-[family-name:var(--font-crimson)] inline-block">
							Learn About TheMealDB API
						</a>
					</div>
				</div>

	
				<div className="mt-16 grid md:grid-cols-2 gap-12">
					<div>
						<h4 className="text-xl font-semibold text-gray-900 mb-4 font-[family-name:var(--font-pd)]">
							Why TheMealDB API?
						</h4>
						<p className="text-gray-600 leading-relaxed mb-4 font-[family-name:var(--font-crimson)]">
							TheMealDB provides one of the most comprehensive and reliable recipe APIs available, offering consistent data structure 
							and high-quality content that makes it perfect for recipe applications.
						</p>
						<ul className="space-y-2 text-gray-600 font-[family-name:var(--font-crimson)]">
							<li>• Consistent JSON structure for all recipes</li>
							<li>• High-resolution meal images included</li>
							<li>• Detailed ingredient lists and measurements</li>
							<li>• Multiple search and filter options</li>
						</ul>
					</div>

					<div>
						<h4 className="text-xl font-semibold text-gray-900 mb-4 font-[family-name:var(--font-pd)]">
							Technical Advantages
						</h4>
						<p className="text-gray-600 leading-relaxed mb-4 font-[family-name:var(--font-crimson)]">
							Built for developers and applications, TheMealDB API offers excellent performance, reliability, 
							and documentation that makes integration seamless and maintenance effortless.
						</p>
						<ul className="space-y-2 text-gray-600 font-[family-name:var(--font-crimson)]">
							<li>• RESTful API design principles</li>
							<li>• No rate limiting for free tier</li>
							<li>• Excellent uptime and performance</li>
							<li>• Active community support</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LearnMoreSection;