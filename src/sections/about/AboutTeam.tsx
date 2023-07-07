import { m } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Stack, Card, Button, Container, Typography, Grid } from '@mui/material';
// _mock_
import { _carouselsMembers } from '../../_mock/arrays';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import Carousel, { CarouselArrows } from '../../components/carousel';
import { MotionViewport, varFade } from '../../components/animate';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { ITeam } from 'src/@types/team';
import Link from 'next/link';

// ----------------------------------------------------------------------

export default function AboutTeam() {
  const carouselRef = useRef<Carousel>(null);

  const theme = useTheme();

  const carouselSettings = {
    infinite: false,
    arrows: false,
    slidesToShow: 4,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3 }}>
          Great team is the key
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
          }}
        >
          Dmerce will provide you support if you have any problems, our support team will reply
          within a day.
        </Typography>
      </m.div>

     <Box sx={{pt:5}}>

      <MemberCard />
     </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

function MemberCard() {
  return (
    <Box display="flex" gap={5} justifyContent="center">
      <Card sx={{ width: '320px', height: '400px' }}>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
          Krishal Basnet{' '}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
          Founder
        </Typography>

        <Box sx={{ px: 1 }}>
          <Image alt="krishal" src="/assets/krishal.jpg/" ratio="1/1" sx={{ borderRadius: 2 }} />
        </Box>
        {/* <SocialsDisplay/> */}
      </Card>
      <Card sx={{ width: '320px', height: '400px' }}>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
          Aayush Sharma{' '}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
          Founder
        </Typography>

        <Box sx={{ px: 1 }}>
          <Image alt="ayush" src="/assets/aayush.jpg/" ratio="1/1" sx={{ borderRadius: 2 }} />
        </Box>
        {/* <SocialsDisplay/> */}
      </Card>
    </Box>
  );
}
// export function SocialsDisplay() {
//   return (
//     <Stack direction="row" alignItems="center" justifyContent="center" gap={2} sx={{ p: 2 }}>
//       {facebook_link && (
//         <Link href={`${facebook_link}`} target="_blank" rel="noopener">
//           <Box
//             sx={{
//               color: '#1877F2',
//               '&:hover': {
//                 bgcolor: alpha('#1877F2', 0.08),
//               },
//             }}
//           >
//             <Iconify icon="eva:facebook-fill" />
//           </Box>
//         </Link>
//       )}
//       {instagram_link && (
//         <Link href={`${instagram_link}`} target="_blank" rel="noopener">
//           <Box
//             sx={{
//               color: '#E02D69',
//               '&:hover': {
//                 bgcolor: alpha('#E02D69', 0.08),
//               },
//             }}
//           >
//             <Iconify icon="ant-design:instagram-filled" />
//           </Box>
//         </Link>
//       )}
//       {twitter_link && (
//         <Link href={`${twitter_link}`} target="_blank" rel="noopener">
//           <Box
//             sx={{
//               color: '#00AAEC',
//               '&:hover': {
//                 bgcolor: alpha('#00AAEC', 0.08),
//               },
//             }}
//           >
//             <Iconify icon="eva:twitter-fill" />
//           </Box>
//         </Link>
//       )}
//       {discord_link && (
//         <Link href={`${discord_link}`} target="_blank" rel="noopener">
//           <Box
//             sx={{
//               color: '#5B67EA',
//               '&:hover': {
//                 bgcolor: alpha('#5B67EA', 0.08),
//               },
//             }}
//           >
//             <Iconify icon="ic:baseline-discord" />
//           </Box>
//         </Link>
//       )}
//       {twitch_link && (
//         <Link href={`${twitch_link}`} target="_blank" rel="noopener">
//           <Box
//             sx={{
//               color: '#A541F6',
//               '&:hover': {
//                 bgcolor: alpha('#A541F6', 0.08),
//               },
//             }}
//           >
//             <Iconify icon="mdi:twitch" />
//           </Box>
//         </Link>
//       )}
//       {linkedin_link && (
//         <Link href={`${linkedin_link}`} target="_blank" rel="noopener">
//           <Box
//             sx={{
//               color: '#007EBB',
//               '&:hover': {
//                 bgcolor: alpha('#007EBB', 0.08),
//               },
//             }}
//           >
//             <Iconify icon="eva:linkedin-fill" />
//           </Box>
//         </Link>
//       )}
//     </Stack>
//   );
// }
