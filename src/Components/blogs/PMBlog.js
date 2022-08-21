import { Container } from '@material-ui/core';
import React from 'react';
import GridWithFeaturedPost from './GridWithFeaturedPost';
import PopularAndRecentBlogPosts from './PopularAndRecentBlogPosts';

const PMBlog = () => {
    return (
        <Container style={{ marginTop: '5vh' }}>
            <PopularAndRecentBlogPosts />
            <GridWithFeaturedPost />
        </Container>
    )
}

export default PMBlog;