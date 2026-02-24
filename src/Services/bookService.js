import api from "./api";

// ✅ ADD Book
export const addBook = async (bookData) => {
  const formData = new FormData();
  Object.entries(bookData).forEach(([key, value]) => {
    if (key === "coverImage") {
      if (value && value[0]) {
        formData.append("coverImage", value[0]);
      }
    } else {
      formData.append(key, value);
    }
  });
  const { data } = await api.post("/books/add", formData);
  return data;
};

// ✅ GET All Books
export const getBooks = async ({ search = "", category = "all" } = {}) => {
  try {
    const { data } = await api.get("/books/get", {
      params: {
        search,
        category,
      },
    });
    return data;
  } catch (err) {
    console.error("getBooks error:", err);
    throw err;
  }
};

// ✅ UPDATE Book
export const updateBook = async (id, bookData) => {
  const formData = new FormData();
  Object.entries(bookData).forEach(([key, value]) => {
    if (key === "coverImage") {
      if (value && value[0]) {
        formData.append("coverImage", value[0]);
      }
    } else {
      formData.append(key, value);
    }
  });
  const { data } = await api.put(`/books/update/${id}`, formData);
  return data;
};

// ✅ DELETE Book
export const deleteBook = async (id) => {
  const { data } = await api.delete(`/books/delete/${id}`);
  return data;
};
