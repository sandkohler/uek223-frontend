import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../../../types/models/BlogPost.model';
import BlogPostService from '../../../Services/BlogPostService';

const BlogPostTable = () => {
  const navigate = useNavigate();
  const [blopPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    BlogPostService.getAllBlogPosts().then((data) => {
      setBlogPosts(data.data);
    });
  }, []);

  const handleAdd = () => {
    navigate('../blogpostedit/');
  };

  const handleEdit = (id: string) => {
    navigate('../blogpostedit/' + id);
  };

  const handleDelete = (id: string) => {
    BlogPostService.deleteBlogPost(id);
  };

  return (
    <div>
      <p>BlogPostTable</p>
    </div>
  );
};

export default BlogPostTable;
