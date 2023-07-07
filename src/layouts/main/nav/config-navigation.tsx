// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'Shop',
    path: PATH_PAGE.shop,
    icon: <Iconify icon="eva:archive-fill" />,
  },
  {
    title: 'About Us',
    path: PATH_PAGE.about,
    icon: <Iconify icon="eva:archive-fill" />,
  },

  {
    title: 'Resources',
    path: '#',
    icon: <Iconify icon="eva:archive-fill" />,
    children: [
      {
        subheader: 'Articles',
        items: [
          { title: 'Blogs', path: PATH_PAGE.page404 },
          { title: 'News', path: PATH_PAGE.page404 },
          { title: 'Announcements', path: PATH_PAGE.page404 },
          { title: 'Updates', path: PATH_PAGE.page404 },
        ],
      },
      {
        subheader: 'About',
        items: [
          { title: 'About Us', path: PATH_PAGE.about },
          { title: 'Contact Us', path: PATH_PAGE.contact },
        ],
      },
      {
        subheader: 'Policies',
        items: [
          { title: 'Privacy Policy', path: PATH_PAGE.privacy },
          { title: 'Cookie Policy', path: PATH_PAGE.cookie },
          { title: 'Terms and Condition', path: PATH_PAGE.terms },
        ],
      },
    ],
  },
];

export default navConfig;
