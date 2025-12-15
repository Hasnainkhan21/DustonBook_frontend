import React, { useEffect } from "react";

const BookModal = ({ book, open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-gray-100">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          <div className="md:w-2/3 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="book-modal-title" className="text-2xl font-bold text-gray-900">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                <div className="mt-3 text-xs text-gray-500">
                  <span className="inline-block mr-2 px-2 py-1 rounded bg-indigo-50 text-indigo-700">
                    {book.category || "Uncategorized"}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                className="text-gray-500 cursor-pointer hover:text-gray-700 p-2 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-gray-500">Price</div>
                <div className="font-semibold text-gray-900">Rs {Number(book.price).toFixed(2)}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Stock</div>
                <div className="font-semibold text-gray-900">{(book.stock=== 0)? <p className="text-red-400"> Out of stock </p>: book.stock }</div>
              </div>
            </div>

            <div className="mt-5 text-sm text-gray-700 leading-relaxed">
              {book.description || "No description available."}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
