import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import type { MenuModalProps } from '@/types';

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleLinkClick = (): void => {
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-[color:var(--primary)] z-50 flex flex-col animate-in fade-in duration-300"
			onClick={handleBackdropClick}>
			<header className="flex justify-end p-6">
				<button
					onClick={onClose}
					className="text-white hover:text-orange-200 transition-colors p-2"
					type="button">
					<X size={32} />
				</button>
			</header>

			<main className="flex-1 flex flex-col justify-start px-6 sm:px-12 md:px-16 lg:px-24 pb-24">
				<h1 className="text-white text-6xl sm:text-7xl md:text-8xl font-[family-name:var(--font-pd)] mb-16 font-serif leading-none">
					Menu
				</h1>

				<nav className="menu-nav group space-y-0 text-center mx-100 ">
					<Link
						href="/Categories"
						onClick={handleLinkClick}
						className="menu-link block text-white text-2xl sm:text-3xl font-[family-name:var(--font-crimson)] border-b border-white/30 py-6 hover:text-white/80 transition-all duration-300 ease-out transform-gpu">
						Categories
					</Link>
					<Link
						href="/Recipes"
						onClick={handleLinkClick}
						className="menu-link block text-white text-2xl sm:text-3xl font-[family-name:var(--font-crimson)] border-b border-white/30 py-6 hover:text-white/80 transition-all duration-300 ease-out transform-gpu">
						Recipes
					</Link>
					<Link
						href="/Nationality"
						onClick={handleLinkClick}
						className="menu-link block text-white text-2xl sm:text-3xl font-[family-name:var(--font-crimson)] py-6 hover:text-white/80 transition-all duration-300 ease-out transform-gpu">
						Nationality
					</Link>
				</nav>
			</main>

		</div>
	);
};

export default MenuModal;