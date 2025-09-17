import FeaturedRecipe from '@/components/ui/featuredRecipe';
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

			<div className="relative px-6 py-2 overflow-hidden">
				<div className="relative space-y-6 mb-8">
					<div className="overflow-hidden">
						<h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[color:var(--primary)] font-bold font-[family-name:var(--font-pd)] leading-none">
							<span
								className="inline-block transform translate-y-full animate-slide-up"
								style={{ animationDelay: '0.2s' }}>
								Featured
							</span>
							<br />
							<span
								className="inline-block transform translate-y-full animate-slide-up bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent"
								style={{ animationDelay: '0.4s' }}>
								Recipes
							</span>
						</h1>
					</div>

					<div
						className="flex items-center space-x-4 opacity-0 animate-fade-in-right"
						style={{ animationDelay: '0.6s' }}>
						<div className="w-16 h-px bg-gradient-to-r from-transparent to-orange-400"></div>
						<div className="w-2 h-2 bg-orange-400 rounded-full"></div>
						<div className="w-32 h-px bg-gradient-to-r from-orange-400 to-transparent"></div>
					</div>
				</div>

				<div className="relative max-w-4xl">
					<h2
						className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[color:var(--foreground)]/80 font-light font-[family-name:var(--font-pd)] leading-relaxed opacity-0 animate-fade-in-up"
						style={{ animationDelay: '0.8s' }}>
						Handpicked
						<span className="font-medium text-[color:var(--foreground)] relative">
							{' '}
							culinary masterpieces
							<svg
								className="absolute -bottom-2 left-0 w-full h-3 text-amber-400/30"
								viewBox="0 0 300 12"
								fill="none">
								<path
									d="M5 6C50 2, 100 10, 150 6C200 2, 250 10, 295 6"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									className="animate-draw-line"
								/>
							</svg>
						</span>
					</h2>
				</div>
			</div>
			<FeaturedRecipe />
		</main>
	);
}
