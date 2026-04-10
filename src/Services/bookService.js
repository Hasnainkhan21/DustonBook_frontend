import api from "./api";

// Build FormData — reused for both add and update
const buildBookFormData = (bookData) => {
  const formData = new FormData();
  Object.entries(bookData).forEach(([key, value]) => {
    if (key === "coverImage") {
      if (value?.[0]) formData.append("coverImage", value[0]);
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

export const addBook = async (bookData) => {
  const { data } = await api.post("/books/add", buildBookFormData(bookData));
  return data;
};

export const getBooks = async ({ search = "", category = "all" } = {}) => {
  const { data } = await api.get("/books/get", { params: { search, category } });
  return data;
};

export const updateBook = async (id, bookData) => {
  const { data } = await api.put(`/books/update/${id}`, buildBookFormData(bookData));
  return data;
};

export const deleteBook = async (id) => {
  const { data } = await api.delete(`/books/delete/${id}`);
  return data;
};
