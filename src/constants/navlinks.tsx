import {ROUTES} from '@/router/routes';

export const navlinks = [
  {
    label: 'Home',
    url: ROUTES.home,
    icon: <img src="/images/home.svg" alt="" width={20} height={20} />,
  },
  {
    label: 'Settings',
    url: ROUTES.settings,
    icon: <img src="/images/setting.svg" alt="" width={20} height={20} />,
  },
  {
    label: 'Insights',
    url: 'insights',
    icon: (
      <img src="/images/chart-inactive.svg" alt="" width={20} height={20} />
    ),
    comingSoon: true,
  },
  {
    label: 'Offers',
    url: 'offers',
    icon: <img src="/images/gift-inactive.svg" alt="" width={20} height={20} />,
    comingSoon: true,
  },
];
