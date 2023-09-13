import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../../../types/models/BlogPost.model';
import BlogPostService from '../../../Services/BlogPostService';
import { CardContent } from '@mui/joy';
import { Button, Card, CardActions } from '@mui/material';

const AdminTable = () => {
    const navigate = useNavigate();
    const [blopPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        BlogPostService.getAllBlogPosts().then((data) => {
            setBlogPosts(data.data);
        }).catch(error => { console.log(error + "Can't get all BlogPosts") });
    }, []);

    const handleAdd = () => {
        navigate('../blogadd/');
    };

    const handleEdit = (blogPostId: string) => {
        navigate('../adminedit/' + blogPostId);
    };

    const handleDelete = (blogPostId: string) => {
        BlogPostService.deleteBlogPost(blogPostId);
    };

    return (
        <>
            {blopPosts.map((blogPost) => (
                <div key={blogPost.id}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            {blogPost.title} {blogPost.text}
                            <CardActions>
                                <Button
                                    size='small'
                                    color='primary'
                                    variant='contained'
                                    onClick={() => handleEdit(blogPost.id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size='small'
                                    color='error'
                                    variant='contained'
                                    onClick={() => {
                                        handleDelete(blogPost.id)
                                    }}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </div>
            ))}
            <Button
                size='small'
                color='success'
                variant='contained'
                onClick={handleAdd}
            >
                Add
            </Button>
        </>
    );
};

export default AdminTable;
