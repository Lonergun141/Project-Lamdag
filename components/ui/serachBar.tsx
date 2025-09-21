import { Search } from "lucide-react";

const SearchBar = ({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
}) => (
	<div className="relative max-w-lg w-full">
		<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[color:var(--primary)]" />
		<input
			type="text"
			placeholder="Search categories..."
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
			className="w-full pl-10 pr-4 py-3 border-b border-gray-300 focus:border-[color:var(--primary)] focus:outline-none transition-colors duration-200 font-[family-name:var(--font-crimson)] text-sm"
		/>
	</div>
);

export default SearchBar;