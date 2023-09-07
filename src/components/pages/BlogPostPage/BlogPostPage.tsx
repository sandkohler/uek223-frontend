import React from 'react';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../../types/models/BlogPost.model';
import BlogPostService from '../../../Services/BlogPostService';
import BlogPostForm from '../../molecules/BlogPostForm/UserForm';
import { useNavigate, useParams } from 'react-router-dom';

const BlogPostPage = () => {
  const navigate = useNavigate();
  const { blogPostId } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost>({
    id: '',
    title: '',
    text: '',
    author: { id: '', firstName: '', lastName: '', email: '', roles: [] },
    category: [],
  });

  useEffect(() => {
    return () => {
      if (blogPostId) {
        BlogPostService.getBlogPost(blogPostId).then((res) => {
          return setBlogPost(res);
        });
      }
    };
  }, [blogPostId]);

  const submitActionHandler = (values: BlogPost) => {
    if (blogPostId !== undefined) {
      BlogPostService.updateBlogPost(values).then(() => {
        navigate('../blogposts');
      });
    } else {
      BlogPostService.addBlogPost(values).then(() => {
        navigate('/blogposts');
      });
    }
  };

  return <BlogPostForm blogPost={blogPost} submitActionHandler={submitActionHandler} />;

};

export default BlogPostPage;
