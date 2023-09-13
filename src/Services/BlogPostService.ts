import api from '../config/Api';
import { BlogPost } from '../types/models/BlogPost.model';

const BlogPostService = {
    getBlogPost: async (id: string): Promise<BlogPost> => {
        const { data } = await api.get<BlogPost>(`/blogs/${id}`);
        return data;
    },

    getAllBlogPosts: () => {
        return api.get('/blogs/');
    },

    addBlogPost: (blogPost: BlogPost) => {
        return api.post('/blogs/', blogPost).then((res) => {
            return res.data;
        }).catch(error => { console.log(error + "Can't add BlogPost") });
    },

    deleteBlogPostFromUser: (id: string) => {
        return api.delete(`/blogs/${id}`);
    },

    updateBlogPostFromUser: (blogPost: BlogPost) => {
        return api.put(`/blogs/${blogPost.id}`, blogPost);
    },

    deleteBlogPost: (id: string) => {
        return api.delete(`/blogs/${id}`);
    },

    updateBlogPost: (blogPost: BlogPost) => {
        return api.put(`/blogs/${blogPost.id}`, blogPost);
    },

};

export default BlogPostService;