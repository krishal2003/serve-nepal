/* eslint-disable import/extensions */
/* eslint-disable import/no-named-as-default */
// next
// eslint-disable-next-line import/no-named-as-default
// import TournamentsGameType from 'src/sections/tournaments/TournamentsGameType';
import Head from 'next/head';
// @mui
// layouts
// sections
import MainLayout from 'src/layouts/main/MainLayout';
import TournamentHero from 'src/sections/tournaments/TournamentsHero';
import TournamentBelowHero from 'src/sections/tournaments/Tournaments';

// ----------------------------------------------------------------------

Tournaments.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function Tournaments() {
  return (
    <>
      <Head>
        <title> Tournaments | ESAN</title>
      </Head>

      <TournamentHero />
      <TournamentBelowHero />
    </>
  );
}
