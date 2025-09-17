import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import type { SearchModalProps } from '@/types';

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			const timeoutId = setTimeout(() => {
				inputRef.current?.focus();
			}, 100);

			return () => clearTimeout(timeoutId);
		}
	}, [isOpen]);

	const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (searchQuery.trim()) {
			console.log('Searching for:', searchQuery);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchQuery(e.target.value);
	};

	const handleClose = (): void => {
		setSearchQuery('');
		onClose();
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-[color:var(--primary)] z-50 flex flex-col animate-in fade-in duration-300"
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="search-modal-title">
			<header className="flex justify-end p-6">
				<button
					onClick={handleClose}
					className="text-white hover:text-orange-200 transition-colors p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
					aria-label="Close search modal"
					type="button">
					<X size={32} />
				</button>
			</header>

			<main className="flex-1 flex flex-col justify-start px-6 sm:px-12 md:px-16 lg:px-24 pb-24">
				<h1
					id="search-modal-title"
					className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[family-name:var(--font-pd)] mb-8 sm:mb-12 font-serif leading-none">
					Search
				</h1>

				<form onSubmit={handleSearchSubmit} className="w-full max-w-4xl">
					<div className="relative group">
						<Search
							className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors"
							size={28}
							aria-hidden="true"
						/>
						<input
							ref={inputRef}
							type="text"
							value={searchQuery}
							onChange={handleInputChange}
							placeholder="What are you looking for?"
							className="w-full bg-transparent border-b-2 border-white/30 focus:border-white text-white text-xl sm:text-2xl md:text-3xl py-6 pl-12 pr-4 outline-none placeholder-white/50 transition-all duration-300"
							aria-label="Search input"
						/>
					</div>
				</form>
			</main>
		</div>
	);
};

export default SearchModal;
