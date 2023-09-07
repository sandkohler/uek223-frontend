import React from 'react';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../../types/models/BlogPost.model';
import BlogPostService from '../../../Services/BlogPostService';

const BlogPostPage = () => {
  const [blogPost, setBlogPost] = useState<BlogPost[]>([]);

  useEffect(() => {
    BlogPostService.getAllBlogPosts().then((data) => {
      setBlogPost(data.data);
    });
  }, []);

  return (
    <div>
      <p>
        BlogPostPage
      </p>
    </div>
  );
};

export default BlogPostPage;
