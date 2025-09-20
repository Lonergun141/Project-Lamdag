import FeaturedRecipe from '@/components/ui/featuredRecipe';
import CategoryCarousel from '@/components/ui/categoryCarousel';
import Link from 'next/link';

export default function Home() {
	return (
		<main>
			<section className="relative overflow-hidden">
				<div className="relative w-full h-screen overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-b from-black/4W0 via-transparent to-black/90 z-10"></div>
					<div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 z-10"></div>

					<video
						autoPlay
						loop
						muted
						playsInline
						className="absolute inset-0 w-full h-full object-cover scale-110 animate-slow-zoom">
						<source src="/hero-section.mp4" type="video/mp4" />
					</video>

					<div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
					<div className="absolute top-40 right-20 w-1 h-1 bg-white/20 rounded-full animate-float-delayed"></div>
					<div className="absolute bottom-32 left-20 w-3 h-3 bg-white/10 rounded-full animate-float-slow"></div>

					<div className="relative z-20 flex flex-col justify-center items-center h-full px-6 text-center">
						<div className="mb-8 opacity-0 animate-fade-in-up">
							<span className="px-6 py-2 text-sm font-medium text-white/90 border border-white/20 rounded-full backdrop-blur-sm bg-white/10 tracking-wider">
								CULINARY EXCELLENCE
							</span>
						</div>

						<div className="mb-8 space-y-4">
							<h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-none font-[family-name:var(--font-pd)]">
								<span
									className="block opacity-0 animate-fade-in-up"
									style={{ animationDelay: '0.2s' }}>
									Lamdag
								</span>
								<span
									className="block opacity-0 animate-fade-in-up bg-[color:var(--primary)]  bg-clip-text text-transparent"
									style={{ animationDelay: '0.4s' }}>
									Recipes
								</span>
							</h1>
						</div>

						<div
							className="max-w-4xl mb-12 opacity-0 animate-fade-in-up"
							style={{ animationDelay: '0.6s' }}>
							<p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed font-[family-name:var(--font-pd)]">
								Indulge in the world of culinary delights with exquisite recipes that will
								<span className="font-[family-name:var(--font-crimson)] text-[color:var(--primary)]">
									{' '}
									tantalize your taste buds
								</span>
							</p>
						</div>

						<div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
							<Link
								href="/recipes"
								className="group relative inline-flex items-center px-12 py-6 text-xl font-medium text-white transition-all duration-500 overflow-hidden rounded-full border-2 border-white/30 hover:border-[#ff7736] backdrop-blur-sm bg-white/10 hover:bg-[#ff7736]/20">
								<span className="absolute inset-0 bg-gradient-to-r from-[#ff7736]/20 to-[#ff7736]/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
								<span className="absolute inset-0 bg-[#ff7736]/5 scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full"></span>

								<span className="relative z-10 font-[family-name:var(--font-pd)] tracking-wide">
									Explore All Recipes
								</span>
								<svg
									className="relative z-10 w-6 h-6 ml-3 transition-transform duration-500 group-hover:translate-x-2 group-hover:scale-110"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 7l5 5m0 0l-5 5m5-5H6"
									/>
								</svg>
							</Link>
						</div>
					</div>

					<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
						<div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-white/20"></div>
						<div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-white/20"></div>
						<div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-white/20"></div>
						<div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-white/20"></div>
					</div>
				</div>
			</section>

			<div className="relative px-6 py-16 overflow-hidden">
				<div className="max-w-6xl mx-auto text-center">
					<div className="relative space-y-8 mb-12">
						<div
							className="flex items-center justify-center space-x-4 opacity-0 animate-fade-in-up"
							style={{ animationDelay: '0.4s' }}>
							<div className="w-16 h-px bg-gradient-to-r from-transparent via-[color:var(--primary)]/60 to-[color:var(--primary)]"></div>
							<div className="w-3 h-3 bg-[color:var(--primary)] rounded-full animate-pulse"></div>
							<div className="w-16 h-px bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--primary)]/60 to-transparent"></div>
						</div>
					</div>

					<div className="relative max-w-4xl mx-auto">
						<h2
							className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[color:var(--foreground)]/80 font-light font-[family-name:var(--font-pd)] leading-relaxed opacity-0 animate-fade-in-up"
							style={{ animationDelay: '0.6s' }}>
							Handpicked
							<span className="font-medium text-[color:var(--foreground)] relative mx-2">
								culinary masterpieces
							</span>
						</h2>

						<p
							className="mt-8 text-lg md:text-xl text-[color:var(--foreground)]/60 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
							style={{ animationDelay: '1s' }}>
							Discover our featured recipes, curated to inspire your next culinary adventure
						</p>
					</div>

					<div className="absolute inset-0 pointer-events-none">
						<div
							className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-[color:var(--primary)]/5 to-transparent rounded-full animate-pulse"
							style={{ animationDelay: '1.2s', animationDuration: '4s' }}></div>

						<div
							className="absolute top-20 left-10 w-2 h-2 bg-[color:var(--primary)]/30 rounded-full animate-float"
							style={{ animationDelay: '2s' }}></div>
						<div
							className="absolute top-32 right-16 w-1 h-1 bg-[color:var(--primary)]/20 rounded-full animate-float"
							style={{ animationDelay: '2.5s' }}></div>
						<div
							className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-[color:var(--primary)]/25 rounded-full animate-float"
							style={{ animationDelay: '3s' }}></div>
						<div
							className="absolute bottom-32 right-10 w-2 h-2 bg-[color:var(--primary)]/20 rounded-full animate-float"
							style={{ animationDelay: '1.8s' }}></div>
					</div>
				</div>
			</div>
			<FeaturedRecipe />
			<div>
				<h3 className='text-center text-2xl font-[family-name:var(--font-pd)] text-[color:var(--primary)] mb-6 cursor-pointer hover:underline transition-all ease-in-out duration-75'>
					View More{' '}
					<Link
						href="/recipes"></Link>
				</h3>
			</div>
			<div className="relative px-6 py-16 overflow-hidden">
				<div className="max-w-6xl mx-auto text-center">
					<div className="relative space-y-8 mb-12">
						<div
							className="flex items-center justify-center space-x-4 opacity-0 animate-fade-in-up"
							style={{ animationDelay: '0.4s' }}>
							<div className="w-16 h-px bg-gradient-to-r from-transparent via-[color:var(--primary)]/60 to-[color:var(--primary)]"></div>
							<div className="w-3 h-3 bg-[color:var(--primary)] rounded-full animate-pulse"></div>
							<div className="w-16 h-px bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--primary)]/60 to-transparent"></div>
						</div>
					</div>

					<div className="relative max-w-4xl mx-auto">
						<h2
							className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[color:var(--foreground)]/80 font-light font-[family-name:var(--font-pd)] leading-relaxed opacity-0 animate-fade-in-up"
							style={{ animationDelay: '0.6s' }}>
							Explore cuisines
							<span className="font-medium text-[color:var(--foreground)] relative mx-2">
								from around the world
							</span>
						</h2>

						<p
							className="mt-8 text-lg md:text-xl text-[color:var(--foreground)]/60 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
							style={{ animationDelay: '1s' }}>
							Discover authentic flavors and traditional recipes that tell the story of
							cultures across the globe
						</p>
					</div>

					<div className="absolute inset-0 pointer-events-none">
						<div
							className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-[color:var(--primary)]/5 to-transparent rounded-full animate-pulse"
							style={{ animationDelay: '1.2s', animationDuration: '4s' }}></div>

						<div
							className="absolute top-20 left-10 w-2 h-2 bg-[color:var(--primary)]/30 rounded-full animate-float"
							style={{ animationDelay: '2s' }}></div>
						<div
							className="absolute top-32 right-16 w-1 h-1 bg-[color:var(--primary)]/20 rounded-full animate-float"
							style={{ animationDelay: '2.5s' }}></div>
						<div
							className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-[color:var(--primary)]/25 rounded-full animate-float"
							style={{ animationDelay: '3s' }}></div>
						<div
							className="absolute bottom-32 right-10 w-2 h-2 bg-[color:var(--primary)]/20 rounded-full animate-float"
							style={{ animationDelay: '1.8s' }}></div>
					</div>
				</div>
			</div>
			<CategoryCarousel />
		</main>
	);
}
