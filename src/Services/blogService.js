import api from "../Services/api";

// ✅ ADD Blog
export const addBlog = async (blogData) => {
    const formData = new FormData();
    Object.entries(blogData).forEach(([key, value]) => {
        if (key === "image" && value && value[0]) {
            formData.append("image", value[0]);
        } else {
            formData.append(key, value);
        }
    });
    const { data } = await api.post("/blogs/add", formData);
    return data;
}

// ✅ GET All Blogs
export const getBlogs = async () => {
    const { data } = await api.get("/blogs/all");
    return data;
}

// like Blog
export const likeBlog = async (blogId, userId) => {
    const { data } = await api.post(`/blogs/like/:id`, { blogId, userId });
    return data;
}

// update Blog
export const updateBlog = async (id, blogData) => {
    const formData = new FormData();
    Object.entries(blogData).forEach(([key, value]) => {
        if (key === "image" && value && value[0]) {
            formData.append("image", value[0]);
        } else {
            formData.append(key, value);
        }
    });
    const { data } = await api.put(`/blogs/update/${id}`, formData);
    return data;
}


// ✅ DELETE Blog
export const deleteBlog = async (id) => {
    const { data } = await api.delete(`/blogs/delete/${id}`);
    return data;
}