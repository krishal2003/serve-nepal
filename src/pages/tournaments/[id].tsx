/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/extensions */
/* eslint-disable import/no-named-as-default */
// next
// eslint-disable-next-line import/no-named-as-default

import Head from 'next/head';
// @mui
import { Box, CardMedia, Container, Tab, Tabs } from '@mui/material';
// layouts
// sections
import MainLayout from 'src/layouts/main/MainLayout';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_PAGE } from 'src/routes/paths';
import { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import Overview from 'src/sections/touraments-tab/Overview';
import Participants from 'src/sections/touraments-tab/Participants';
import LiveStreaming from 'src/sections/touraments-tab/LiveStreaming';

import ComingSoonPage from '../coming-soon';
import { ITournamentCard } from 'src/@types/user';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
import TournamentFAQ from 'src/sections/tournaments/TournamentFAQ';

// ----------------------------------------------------------------------

Tournament.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function Tournament() {
  const [tournamentList, setTournamentList] = useState<ITournamentCard[]>([]);

  const getTournamentList = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/tournaments/');
      setTournamentList(response.data.tournaments);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getTournamentList();
  }, [getTournamentList]);


  // eslint-disable-next-line @typescript-eslint/no-shadow

  const [currentTab, setCurrentTab] = useState('overview');

  const TABS = [
    {
      value: 'overview',
      label: 'Overview',
      icon: <Iconify icon="material-symbols:overview" />,
      component: <Overview />,
    },
    {
      value: 'prizes',
      label: 'Prizes',
      icon: <Iconify icon="fa-solid:gifts" />,
      component: <ComingSoonPage />,
    },
    {
      value: 'participants',
      label: 'Participants',
      icon: <Iconify icon="mdi:people-group" />,
      component: <Participants />,
    },
    {
      value: 'live_streaming',
      label: 'Live Streaming',
      icon: <Iconify icon="ic:baseline-live-tv" />,
      component: <LiveStreaming />,
    },
    {
      value: 'upcoming matches',
      label: 'Upcoming Matches',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <ComingSoonPage />,
    },
    {
      value: 'past_matches',
      label: 'Past Matches',
      icon: <Iconify icon="ph:game-controller-fill" />,
      component: <ComingSoonPage />,
    },
    {
      value: 'brackets',
      label: 'Brackets',
      icon: <Iconify icon="material-symbols:team-dashboard-sharp" />,
      component: <ComingSoonPage />,
    },
    {
      value: 'faq',
      label: 'FAQ',
      icon: <Iconify icon="mdi:faq" />,
      component: <TournamentFAQ />,
    },
    // {
    //   value: 'sponsor',
    //   label: 'Sponsor',
    //   icon: <Iconify icon="ph:handshake-fill" />,
    //   component: <TournamentSponsor />,
    // },
  ];

 

  return (
    <div>
      {tournamentList &&
        tournamentList.map((tournaments) => (
          <>
            <Head>
              <title> {tournaments.tournament_name} | ESAN</title>
            </Head>

            <Container sx={{ pt: 1, pb: 10, position: 'relative' }}>
              <CustomBreadcrumbs
                heading={tournaments.tournament_name}
                links={[
                  { name: 'Home', href: '/' },
                  { name: 'Tournaments', href: PATH_PAGE.tournaments },
                  { name: tournaments.tournament_name },
                ]}
              />
              <CardMedia
                component="img"
                alt="loading"
                height="300"
                src={BASE_IMAGE_PATH + tournaments.tournament_banner}
                sx={{ objectFit: 'cover', objectPosition: 'center', pb: 3 }}
              />

              <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
                {TABS.map((tab) => (
                  <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                ))}
              </Tabs>

              {TABS.map(
                (tab) => tab.value === currentTab && <Box key={tab.value}>{tab.component}</Box>
              )}
              
            </Container>
          </>
        ))}
    </div>
  );
}
