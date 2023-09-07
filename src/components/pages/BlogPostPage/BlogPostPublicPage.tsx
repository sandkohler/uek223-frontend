import React from 'react';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../../types/models/BlogPost.model';
import BlogPostService from '../../../Services/BlogPostService';

const BlogPostPublicPage = () => {
    const [blogPost, setBlogPost] = useState<BlogPost[]>([]);

    useEffect(() => {
        BlogPostService.getAllBlogPosts().then((data) => {
            setBlogPost(data.data);
        });
    }, []);

    return (
        <div>
            <p>
                BlogPostPublicPage
            </p>
        </div>
    );
};

export default BlogPostPublicPage;
