import { useEffect, useState, useCallback } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import {
  Stack,
  Container,
  Typography,
  CardContent,
  Card,
  CardHeader,
  Grid,
  Divider,
} from '@mui/material';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// routes
// components
import Markdown from '../../../components/markdown';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { SkeletonPostDetails } from '../../../components/skeleton';
// sections
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { EventFaqsList, EventHero } from 'src/sections/@dashboard/events';
import { EventData } from 'src/@types/events';
import Image from 'src/components/image/Image';
import TournamentBelowHero from 'src/sections/tournaments/Tournaments';

// ----------------------------------------------------------------------

EventPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function EventPage() {
  const {
    query: { slug },
  } = useRouter();

  const [event, setEvent] = useState<EventData['event'] | null>(null);
  const [faqs, setFaqs] = useState<EventData['faqs']>([]);
  const [sponsors, setSponsors] = useState<EventData['sponsors']>([]);

  const [loadingEvent, setLoadingEvent] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const getEvent = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/event-detail', {
        params: { slug },
      });

      setEvent(response.data.event);
      setFaqs(response.data.faqs);
      setSponsors(response.data.sponsors);
      setLoadingEvent(false);
    } catch (error) {
      console.error(error);
      setLoadingEvent(false);
      setErrorMsg(error.message);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      getEvent();
    }
  }, [getEvent, slug]);

  return (
    <>
      <Head>
        <title>{`Event: ${event?.event_name || ''} | ESAN`}</title>
      </Head>

      <Container sx={{ mb: 3 }} maxWidth="xl">
        <CustomBreadcrumbs
          heading="Event Details"
          links={[
            {
              name: event?.event_name,
            },
          ]}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {event && (
              <Stack
                sx={{
                  borderRadius: 2,
                  boxShadow: (theme) => ({
                    md: theme.customShadows.card,
                  }),
                }}
                spacing={3}
              >
                <EventHero event={event} />
                <Markdown
                  children={event.event_description}
                  sx={{
                    px: { md: 5 },
                  }}
                />
              </Stack>
            )}
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid item container spacing={2} xs={12}>
              <Grid item xs={12}>
                <Typography variant="h3">Sponsors</Typography>
              </Grid>
              {sponsors &&
                sponsors.map((sponsor) => (
                  <Grid item xs={6} md={6}>
                    <Image
                      alt="loading"
                      ratio="1/1"
                      src={BASE_IMAGE_PATH + sponsor.sponsor_banner}
                      sx={{ objectFit: 'cover', objectPosition: 'center', borderRadius: 2 }}
                    />
                    <CardHeader
                      title={sponsor.sponsor_name}
                      subheader={sponsor.sponsorship_category}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>

        {errorMsg && !loadingEvent && <Typography variant="h6">404 {errorMsg}</Typography>}

        {loadingEvent && <SkeletonPostDetails />}
        <TournamentBelowHero />
        <Divider sx={{ my: 2 }} />
        <Typography variant="h3">FAQS</Typography>
        <Card>
          <CardContent>
            <EventFaqsList faqs={faqs} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
