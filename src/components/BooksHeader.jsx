import { BOOK_CATEGORIES } from "../components/bookCategories";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";

const BooksHeader = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  clearFilters,
}) => {
  return (
    <header className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
      {/* Search */}
      <div className="flex items-center bg-white rounded-xl md:rounded-full px-4 py-2.5 md:py-2 border shadow-sm w-full md:w-[420px] transition-shadow duration-200 focus-within:shadow-md">
        <FaSearch className="text-[#BF092F] mr-3 shrink-0" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search books..."
          className="w-full outline-none bg-transparent text-sm md:text-base"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="relative w-full md:w-auto">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-auto appearance-none border border-gray-200 bg-white px-4 py-2.5 md:py-2 rounded-xl md:rounded-lg pr-10 text-sm md:text-base outline-none hover:border-yellow-400 transition-colors cursor-pointer shadow-sm"
        >
          <option value="all">All categories</option>
          {BOOK_CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
          <FaFilter className="text-[#BF092F] text-xs" />
        </div>
      </div>

      <div className="flex items-center justify-end md:justify-start">
        <button
          onClick={clearFilters}
          className="text-xs md:text-sm font-medium text-yellow-600 hover:text-yellow-700 underline underline-offset-4"
        >
          Reset Filters
        </button>
      </div>
    </header>
  );
};

export default BooksHeader;
