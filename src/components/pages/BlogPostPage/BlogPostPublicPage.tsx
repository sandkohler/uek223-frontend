import React from 'react';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../../types/models/BlogPost.model';
import BlogPostService from '../../../Services/BlogPostService';
import Card from '@mui/joy/Card/Card';
import CardContent from '@mui/joy/CardContent/CardContent';

const BlogPostPublicPage = () => {
    const [blopPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        BlogPostService.getAllBlogPosts().then((data) => {
            setBlogPosts(data.data);
        });
    }, []);

    return (
        <>
            {blopPosts.map((blogPost) => (
                <div key={blogPost.id}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            {blogPost.title} {blogPost.text}
                        </CardContent>
                    </Card>
                </div>
            ))}
        </>
    );
};

export default BlogPostPublicPage;
