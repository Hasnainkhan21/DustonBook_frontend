import { useNavigate } from "react-router-dom";
import { BOOK_CATEGORIES } from "./bookCategories";

const CategoriesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8 px-4">
      <h2 className="text-xl font-semibold mb-4">
        Browse by Category
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {BOOK_CATEGORIES.map((cat) => {
          const Icon = cat.icon;

          return (
            <button
              key={cat.slug}
              onClick={() => navigate(`/books?category=${cat.slug}`)}
              className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl hover:shadow-lg transition"
            >
              <Icon className="text-2xl text-[#BF092F]" />
              <span className="text-sm">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesSection;
