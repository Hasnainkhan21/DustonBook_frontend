import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";
import WhatsAppButton from "../components/WhatsAppButton";
const BooksHeader = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  clearFilters,
}) => {
  const categories = [
    "all",
    "Literature",
    "Philosophy",
    "Politics",
    "Literary Critics",
    "Afghan Politics",
    "Khudai Khidmatgar Literature",
    "Bacha Khan Literature",
    "Other books",
  ];

  return (
    <header className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-6">

      <div className="flex flex-1 md:flex-none items-center gap-3 w-full md:w-[680px]">
        <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-200 px-3 py-2 w-full md:w-[420px]">
          <FaSearch className="text-[#BF092F] mr-3" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full text-sm md:text-base outline-none placeholder:text-gray-400 bg-transparent"
            aria-label="Search books"
          />
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm("")}
              className="ml-2 text-gray-500 hover:text-gray-700 p-1 rounded-full transition"
              aria-label="Clear search"
            >
              <FaTimes/>
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-gradient-to-br from-white via-white to-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-sm shadow-sm pr-8 focus:outline-none focus:ring-2 focus:ring-[#FCB53B]"
              aria-label="Filter by category"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All categories" : c}
                </option>
              ))}
            </select>

            <FaFilter className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#BF092F]" />
          </div>

          <WhatsAppButton />

          <button
            onClick={clearFilters}
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#A72703] bg-[#FFF8F6] hover:bg-[#FFF2EE] px-3 py-2 rounded-lg border border-[#F6C5A8] transition shadow-sm"
            aria-label="Reset filters"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Mobile reset / filter indicator */}
      <div className="flex items-center gap-2 md:hidden mt-2 w-full justify-between">
        <div
          className={`text-xs px-2 py-1 rounded-full border ${
            selectedCategory !== "all"
              ? "bg-[#FFF7ED] border-[#F4C27D] text-[#A75A2A]"
              : "bg-transparent border-transparent text-gray-400"
          }`}
        >
          {selectedCategory === "all" ? "All categories" : selectedCategory}
        </div>

        <button
          onClick={clearFilters}
          className="text-xs text-[#A72703] font-semibold px-3 py-1 rounded hover:bg-[#FFF2EE] transition"
        >
          Clear
        </button>
      </div>
    </header>
  );
};

export default BooksHeader;
