import { useEffect, useState, useCallback } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Divider, Stack, Container, Typography } from '@mui/material';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { IBlogPost, IBlogPostComment } from '../../../@types/blog';
// components
import Markdown from '../../../components/markdown';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { SkeletonPostDetails } from '../../../components/skeleton';
// sections
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostCommentList,
  BlogPostCommentForm,
} from '../../../sections/@dashboard/blog';
import axiosInstance2 from 'src/utils/axios2';
import BlogPostCategories from 'src/sections/@dashboard/blog/BlogPostCategories';
import { RecentPosts } from 'src/sections/home';

// ----------------------------------------------------------------------

BlogPostPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function BlogPostPage() {
  const {
    query: { slug },
  } = useRouter();

  const [post, setPost] = useState<IBlogPost | null>(null);

  const [comments, setComments] = useState<IBlogPostComment[] | null>(null);

  const [loadingPost, setLoadingPost] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/article', {
        params: { slug },
      });

      setPost(response.data.post);
      setComments(response.data.comments);
      setLoadingPost(false);
    } catch (error) {
      console.error(error);
      setLoadingPost(false);
      setErrorMsg(error.message);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      getPost();
    }
  }, [getPost, slug]);

  return (
    <>
      <Head>
        <title>{`Blog: ${post?.title || ''} | ESAN`}</title>
      </Head>

      <Container>
        <CustomBreadcrumbs
          heading="Post Details"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Blog',
              href: PATH_DASHBOARD.blog.root,
            },
            {
              name: post?.title,
            },
          ]}
        />

        {post && (
          <Stack
            sx={{
              borderRadius: 2,
              boxShadow: (theme) => ({
                md: theme.customShadows.card,
              }),
            }}
          >
            <BlogPostHero post={post} />

            <Typography
              variant="h6"
              sx={{
                py: 5,
                px: { md: 5 },
              }}
            >
              {post.meta_description}
            </Typography>

            <Markdown
              children={post.article_content}
              sx={{
                px: { md: 5 },
              }}
            />

            <Stack
              spacing={3}
              sx={{
                py: 5,
                px: { md: 5 },
              }}
            >
              <Divider />
              {post.tags && <BlogPostTags tags={post.tags} />}
              {post.categories && <BlogPostCategories categories={post.categories} />}
              <Divider />
            </Stack>

            {comments && !!comments.length && (
              <>
                <Stack
                  sx={{
                    px: { md: 5 },
                  }}
                >
                  <Stack direction="row" sx={{ mb: 3 }}>
                    <Typography variant="h4">Comments</Typography>

                    <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                      ({comments.length})
                    </Typography>
                  </Stack>

                  <BlogPostCommentForm />

                  <Divider sx={{ mt: 5, mb: 2 }} />
                </Stack>
                <Stack
                  sx={{
                    px: { md: 5 },
                  }}
                >
                  <BlogPostCommentList comments={comments} />
                </Stack>
              </>
            )}
          </Stack>
        )}

        {errorMsg && !loadingPost && <Typography variant="h6">404 {errorMsg}</Typography>}

        {loadingPost && <SkeletonPostDetails />}

        <RecentPosts />
      </Container>
    </>
  );
}
