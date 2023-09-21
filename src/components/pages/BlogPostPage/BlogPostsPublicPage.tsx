import React from 'react';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../../types/models/BlogPost.model';
import BlogPostService from '../../../Services/BlogPostService';
import {Button, Card, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {CardContent} from "@mui/joy";

const BlogPostsPublicPage = () => {
    const [blopPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage= 3;
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        BlogPostService.getAllBlogPosts().then((data) => {
            const sortedPosts = data.data.sort((a: any, b: any) => {
                if (sortOrder === "asc") {
                    return a[sortBy] < b[sortBy] ? -1 : 1;
                } else {
                    return a[sortBy] > b[sortBy] ? -1 : 1;
                }
            });

            const slicedPosts = sortedPosts.slice(startIndex, endIndex);
            setBlogPosts(slicedPosts);
            console.log(slicedPosts);
        }).catch(error => { console.log(error + "Can't sort BlogPosts") });
    }, [currentPage, postsPerPage, sortBy, sortOrder]);

    const handleSortChange = (field: string) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };



    /* useEffect(() => {
        BlogPostService.getAllBlogPosts().then((data) => {
            setBlogPosts(data.data);
            console.log(data.data)
        });
    }, []); */

    const handleClick = (blogPostId: string) => {
        navigate('../blog/' + blogPostId)
    }

    return (
        <div>
            <div>
                Sortieren nach:
                <button onClick={() => handleSortChange("createdAt")}>
                    Erstellungsdatum
                </button>
                <button onClick={() => handleSortChange("title")}>
                    Titel
                </button>
            </div>
            {blopPosts.map((blogPost) => (
                <div key={blogPost.id}>
                    <Card sx={{ minWidth: 170, maxWidth: 340 }}>
                        <CardContent>
                            <Typography>
                                Title: {blogPost.title}
                            </Typography>
                            <Typography>
                                Text: {blogPost.text}
                            </Typography>
                            <Typography>
                                By: {blogPost.user.firstName} {blogPost.user.lastName}
                            </Typography>
                            <Typography>
                                Category: {blogPost.categories.map(item => item.name)}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => handleClick(blogPost.id)}
                                size='small'
                                style={{ maxWidth: "117px" }}
                            >
                                GET SINGLE
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            ))}

            {/* Buttons for Pagination */}
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Vorherige Seite
                </button>
                <p>Seite {currentPage}</p>
                <button onClick={nextPage} disabled={blopPosts.length < postsPerPage}>
                    Nächste Seite
                </button>
            </div>

        </div>
    );
};

export default BlogPostsPublicPage;
