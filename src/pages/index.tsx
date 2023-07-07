// next
import Head from 'next/head';
// @mui
import { Box, Container, Grid, Typography } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// components
import ScrollProgress from '../components/scroll-progress';
// sections
import { HomeHero, HomeMinimal, RecentPosts } from '../sections/home';
import { ContactForm } from 'src/sections/contact';
import Shop from './shop';
import ShopHome from './components/shopHome';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Dmerce </title>
      </Head>

      <ScrollProgress />

      <HomeHero />
      
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <ShopHome/>
        <RecentPosts />
        
        <HomeMinimal />
        <Container>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            Reach out. We&rsquo;re here for you.{' '}
          </Typography>

          <Box sx={{ pb: 7 }}>
            <Grid container spacing={5} sx={{ my: 3 }} justifyContent="center">
              <Grid item xs={12} md={6}>
                <ContactForm />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
