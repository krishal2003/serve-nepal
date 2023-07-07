// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
// import Label from '../../../components/label';
// import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

export enum UserRole {
  Admin = 'Admin',
  Player = 'Player',
  BlogWriter = 'Blog Writer',
  Organizer = 'Organizer',
  Organization = 'Organization',
}

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  testimonial: icon('ic_testimonials'),
  faq: icon('ic_faq'),
  ourTeam: icon('ic_ourTeam'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },

      {
        title: 'Organizational Chart',
        path: PATH_DASHBOARD.organization.chart.list,
        icon: ICONS.blog,
        roles: [UserRole.Organization],
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Management',
    items: [
      {
        title: 'blogs',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'Your Posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'Create', path: PATH_DASHBOARD.blog.new },
        ],
        roles: [UserRole.Admin, UserRole.BlogWriter],
      },
      {
        title: 'users',
        path: PATH_DASHBOARD.user.list,
        icon: ICONS.user,
        roles: [UserRole.Admin],
        caption: 'admin only',
      },
      {
        title: 'testimonials',
        path: PATH_DASHBOARD.testimonial.list,
        icon: ICONS.testimonial,
        roles: [UserRole.Admin],
        caption: 'admin only',
      },
      {
        title: 'FAQ',
        path: PATH_DASHBOARD.faq.list,
        icon: ICONS.faq,
        roles: [UserRole.Admin],
        caption: 'admin only',
      },
      {
        title: 'Our Team',
        path: PATH_DASHBOARD.ourTeam.list,
        icon: ICONS.ourTeam,
        roles: [UserRole.Admin],
        caption: 'admin only',
      },
      {
        title: 'Recruit Players',
        path: PATH_DASHBOARD.organization.freePlayer.list,
        icon: ICONS.blog,
        roles: [UserRole.Organization],
      },
      {
        title: 'events',
        path: PATH_DASHBOARD.event.root,
        icon: ICONS.blog,
        children: [
          { title: 'Your Events', path: PATH_DASHBOARD.event.events },
          { title: 'Create', path: PATH_DASHBOARD.event.new },
        ],
        roles: [UserRole.Organizer],
      },
      {
        title: 'My Teams',
        path: PATH_DASHBOARD.organization.team.list,
        icon: ICONS.blog,
        children: [
          { title: 'Create', path: PATH_DASHBOARD.organization.team.new },
          { title: 'View Teams', path: PATH_DASHBOARD.organization.team.list },
        ],
        roles: [UserRole.Organization],
      },
    ],
  },
];

export default navConfig;
