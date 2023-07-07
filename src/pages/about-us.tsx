// next
import Head from 'next/head';
// @mui
import { Divider } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// sections
import { AboutHero, AboutWhat, AboutTeam, AboutTestimonials } from '../sections/about';
import Image from 'next/image';

// ----------------------------------------------------------------------

AboutPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Head>
        <title> About us | ESAN</title>
      </Head>

      <AboutHero />
      <AboutWhat />

      <AboutTeam />

    </>
  );
}
