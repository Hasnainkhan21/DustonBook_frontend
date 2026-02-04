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
    <header className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="flex items-center bg-white rounded-full px-3 py-2 border w-full md:w-[420px]">
        <FaSearch className="text-[#BF092F] mr-3" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search books..."
          className="w-full outline-none bg-transparent"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")}>
            <FaTimes />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded-lg pr-8"
        >
          <option value="all">All categories</option>
          {BOOK_CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
        <FaFilter className="absolute right-2 top-1/2 -translate-y-1/2 text-[#BF092F]" />
      </div>

      <button onClick={clearFilters} className="text-sm underline">
        Reset
      </button>
    </header>
  );
};

export default BooksHeader;
