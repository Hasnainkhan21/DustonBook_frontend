import api from "../Services/api";

// ✅ ADD Blog
export const addBlog = async (blogData) => {
    const formData = new FormData();
    Object.entries(blogData).forEach(([key, value]) => {
        if (key === "image") {
            if (value && value[0]) formData.append("image", value[0]);
        } else if (Array.isArray(value)) {
            value.forEach(item => formData.append(key, item));
        } else {
            formData.append(key, value);
        }
    });
    const { data } = await api.post("/blogs/add", formData);
    return data;
}

// ✅ GET All Blogs
export const getBlogs = async () => {
    const { data } = await api.get(`/blogs/all?t=${new Date().getTime()}`);
    return data;
}

export const likeBlog = async (blogId) => {
    try {
        const response = await api.put(`/blogs/like/${blogId}`);
        return response.data;
    } catch (error) {
        console.error("Error liking blog:", error);
        throw error;
    }
};

// update Blog
export const updateBlog = async (id, blogData) => {
    const formData = new FormData();
    Object.entries(blogData).forEach(([key, value]) => {
        if (key === "image") {
            if (value && value[0]) formData.append("image", value[0]);
        } else if (Array.isArray(value)) {
            value.forEach(item => formData.append(key, item));
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