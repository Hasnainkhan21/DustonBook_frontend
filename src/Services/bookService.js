import api from "./api";

// ✅ ADD Book
export const addBook = async (bookData) => {
  const formData = new FormData();
  Object.entries(bookData).forEach(([key, value]) => {
    if (key === "coverImage" && value && value[0]) {
      formData.append("coverImage", value[0]);
    } else {
      formData.append(key, value);
    }
  });
  const { data } = await api.post("/books/add", formData);
  return data;
};

// ✅ GET All Books
export const getBooks = async () => {
  const { data } = await api.get("/books/get");
  return data;
};

// ✅ UPDATE Book
export const updateBook = async (id, bookData) => {
  const formData = new FormData();
  Object.entries(bookData).forEach(([key, value]) => {
    if (key === "coverImage" && value && value[0]) {
      formData.append("coverImage", value[0]);
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
