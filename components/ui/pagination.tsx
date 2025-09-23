import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '@/types';

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
	hasNextPage,
	hasPreviousPage,
	startIndex,
	endIndex,
	totalItems,
}) => {
	const generatePageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			const start = Math.max(1, currentPage - 2);
			const end = Math.min(totalPages, start + maxVisiblePages - 1);

			if (start > 1) {
				pages.push(1);
				if (start > 2) pages.push('...');
			}

			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			if (end < totalPages) {
				if (end < totalPages - 1) pages.push('...');
				pages.push(totalPages);
			}
		}

		return pages;
	};

	if (totalPages <= 1) return null;

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-gray-200">
			<div className="text-sm text-gray-600 font-[family-name:var(--font-crimson)]">
				Showing {startIndex} to {endIndex} of {totalItems} recipes
			</div>

			<div className="flex items-center gap-2">
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={!hasPreviousPage}
					className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-[color:var(--primary)] disabled:text-gray-400 disabled:cursor-not-allowed font-[family-name:var(--font-crimson)] transition-colors duration-200">
					<ChevronLeft className="w-4 h-4" />
					Previous
				</button>

				<div className="flex items-center gap-1">
					{generatePageNumbers().map((page, index) => (
						<button
							key={index}
							onClick={() => typeof page === 'number' && onPageChange(page)}
							disabled={page === '...'}
							className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
								page === currentPage
									? 'bg-[color:var(--primary)] text-white'
									: page === '...'
									? 'text-gray-400 cursor-default'
									: 'text-gray-600 hover:text-[color:var(--primary)] hover:bg-gray-100'
							}`}>
							{page}
						</button>
					))}
				</div>

				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={!hasNextPage}
					className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-[color:var(--primary)] disabled:text-gray-400 disabled:cursor-not-allowed font-[family-name:var(--font-crimson)] transition-colors duration-200">
					Next
					<ChevronRight className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
