import { useEffect, useCallback, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Grid, Container } from '@mui/material';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// utils
import axiosInstance2 from 'src/utils/axios2';
// routes
import { PATH_PAGE } from '../../routes/paths';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { SkeletonPostItem } from 'src/components/skeleton';
import { EventsPostCard } from 'src/sections/@dashboard/events';
import { EventData } from 'mapbox-gl';

EventsPostPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function EventsPostPage() {
  const [events, setEvents] = useState<EventData['event'][]>([]);

  const getAllEvents = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/all-events');
      setEvents(response.data.events);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  return (
    <>
      <Head>
        <title> Events: | ESAN</title>
      </Head>

      <Container>
        <CustomBreadcrumbs
          heading="Events"
          links={[
            {
              name: 'Home',
              href: '/',
            },
            {
              name: 'Events',
              href: PATH_PAGE.blog.root,
            },
            {
              name: 'Event',
            },
          ]}
        />

        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <EventSearch />
          <EventSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />
        </Stack> */}

        <Grid container spacing={3} sx={{ mb: 2 }}>
          {(!events.length ? [...Array(12)] : events).map((event, index) =>
            event ? (
              <Grid key={event.id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <EventsPostCard event={event} index={index} isDashboard={false} />
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
