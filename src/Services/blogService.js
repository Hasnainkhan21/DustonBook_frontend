import api from "./api";

// Build FormData — reused for both add and update
const buildBlogFormData = (blogData) => {
    const formData = new FormData();
    Object.entries(blogData).forEach(([key, value]) => {
        if (key === "image") {
            if (value?.[0]) formData.append("image", value[0]);
        } else if (Array.isArray(value)) {
            value.forEach((item) => formData.append(key, item));
        } else {
            formData.append(key, value);
        }
    });
    return formData;
};

export const addBlog = async (blogData) => {
    const { data } = await api.post("/blogs/add", buildBlogFormData(blogData));
    return data;
};

export const getBlogs = async () => {
    const { data } = await api.get("/blogs/all");
    return data;
};

export const likeBlog = async (blogId) => {
    const { data } = await api.put(`/blogs/like/${blogId}`);
    return data;
};

export const updateBlog = async (id, blogData) => {
    const { data } = await api.put(`/blogs/update/${id}`, buildBlogFormData(blogData));
    return data;
};

export const deleteBlog = async (id) => {
    const { data } = await api.delete(`/blogs/delete/${id}`);
    return data;
};