import orderBy from 'lodash/orderBy';
import { useEffect, useCallback, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Grid, Container, Stack } from '@mui/material';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// utils
import axiosInstance2 from 'src/utils/axios2';
// routes
import { PATH_PAGE } from '../../routes/paths';
// @types
import { IBlogPost } from '../../@types/blog';
// components
import { SkeletonPostItem } from '../../components/skeleton';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

BlogPostsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([]);

  const [sortBy, setSortBy] = useState('latest');

  const sortedPosts = applySortBy(posts, sortBy);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/articles');
      setPosts(response.data.posts);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleChangeSortBy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <Head>
        <title> Blog: Posts | ESAN</title>
      </Head>

      <Container>
        <CustomBreadcrumbs
          heading="Blog"
          links={[
            {
              name: 'Home',
              href: '/',
            },
            {
              name: 'Blog',
              href: PATH_PAGE.blog.root,
            },
            {
              name: 'Posts',
            },
          ]}
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch />
          <BlogPostsSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />
        </Stack>

        <Grid container spacing={3} sx={{ mb: 2 }}>
          {(!posts.length ? [...Array(12)] : sortedPosts).map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <BlogPostCard post={post} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )}
        </Grid>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

const applySortBy = (posts: IBlogPost[], sortBy: string) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['created_at'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(posts, ['created_at'], ['asc']);
  }

  if (sortBy === 'featured') {
    return orderBy(posts, ['is_featured'], ['desc']);
  }
  return posts;
};
